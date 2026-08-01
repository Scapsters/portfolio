import 'react-image-gallery/styles/css/image-gallery.css'
import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PortfolioData, Category } from '@/typescript/wheel_info'
import { CursorContext, ProjectContext } from '@/contexts'
import { all_items_with_gaps } from '../typescript/wheel_info'
import { Item } from '@/typescript/data'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { mod } from '@/typescript/math_helpers'
import Markdown from 'react-markdown'
import { createPortal } from 'react-dom'
import { ApplyForceFunction } from '@/page'

type ProjectCardProps = {
    current: Item | null | undefined
    previous: Item | null | undefined
    isPrevious: boolean
}

export const techStackButtonStyle =
    'flex items-center bg-white/40 hover:bg-black/10 cursor-pointer m-2 p-2 w-full text-left duration-200'
function TechStackButton({
    technology,
    onClick,
    removeArrow,
    textClassName,
}: Readonly<{ technology: string; onClick: () => void; removeArrow?: boolean; textClassName?: string }>) {
    return (
        <button key={technology + 'container'} className={techStackButtonStyle} onClick={onClick}>
            <p className={'grow ml-1 mr-1 w-max ' + textClassName} key={technology}>
                {technology} {removeArrow ? '' : '↗'}
            </p>
        </button>
    )
}

function ExternalLink({ href, children }: { href?: string; children: ReactNode }) {
    return (
        <a
            href={href}
            className="text-stone-200 hover:underline hover:bg-black/10 active:bg-black/30 bg-white/40 p-2 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}

export function ProjectCard({
    isPrevious,
    current,
    previous,
    applyForceToWheel,
}: ProjectCardProps & { applyForceToWheel: React.RefObject<ApplyForceFunction> }) {
    const selected = current

    const prjctx = useContext(ProjectContext)

    const handleItemClick = useCallback(
        (technology: string) => {
            if (prjctx.scrollSinceSelection) prjctx.scrollSinceSelection.current = false
            prjctx.setPreviousSelected(selected)

            let foundTool: Item | undefined
            let groupIndex = -1

            const categories = Object.keys(PortfolioData) as Category[]
            for (let i = 0; i < categories.length; i++) {
                const categoryName = categories[i]
                const category = PortfolioData[categoryName]
                if (Object.prototype.hasOwnProperty.call(category, technology)) {
                    foundTool = category[technology] as Item
                    groupIndex = i
                    break
                }
            }

            if (foundTool && groupIndex !== -1 && prjctx.groupVisibilities) {
                const index = all_items_with_gaps.findIndex((item) => item === foundTool.id)
                prjctx.setSelectedIndex(index)
                const newVisibilities = [...prjctx.groupVisibilities.current]
                newVisibilities[groupIndex] = { visible: true, timeSet: performance.now() }
                prjctx.groupVisibilities.current = newVisibilities
                prjctx.setSelected(foundTool)
            }
        },
        [prjctx, selected],
    )

    const currentCardRefs = useRef<(HTMLDivElement | null)[]>(new Array(7).fill(null))
    const previousCardRefs = useRef<(HTMLDivElement | null)[]>(new Array(7).fill(null))

    const [opacity, setOpacity] = useState(0) // 1st part of removing flash on load
    useEffect(() => {
        currentCardRefs.current.forEach((cardRef, index) => {
            cardRef?.getAnimations().forEach((anim) => anim.cancel())
            cardRef?.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 500,
                delay: index * 200 + 400,
                easing: 'ease-out',
                fill: 'both',
            })
            cardRef?.animate([{ transform: 'translate(-25%, 0%)' }, { transform: 'translate(0%, 0%)' }], {
                duration: 500,
                delay: index * 200 + 400,
                easing: 'ease-out',
                fill: 'both',
                composite: 'add',
            })
        })
        let cardsAnimated = 0
        previousCardRefs.current.toReversed().forEach((cardRef) => {
            const delay = cardsAnimated * 75 // The array is reversed, and we don't want to count empty elements. Only increase delay when the element at index exists
            if (cardRef) cardsAnimated++
            cardRef?.getAnimations().forEach((anim) => anim.cancel())
            cardRef?.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 300,
                delay,
                easing: 'ease-in-out',
                fill: 'both',
            })
            cardRef?.animate([{ transform: 'translate(0%, 0%)' }, { transform: 'translate(0%, 200px)' }], {
                duration: 300,
                delay,
                easing: 'ease-in-out',
                fill: 'both',
                composite: 'add',
            })
        })
        setOpacity(1) // Overridden by animation opacity, 2nd part of removing flash on load.
    }, [selected, isPrevious, currentCardRefs, previousCardRefs])

    const [imageScroll, setImageScroll] = useState(0)
    const [isAcceleratingWheel, setIsAcceleratingWheel] = useState(false)
    const wheelForceAnimationId = useRef({ id: 0 })
    useEffect(() => {
        if (!isAcceleratingWheel) {
            const currentAnimationId = wheelForceAnimationId.current.id
            if (currentAnimationId) {
                cancelAnimationFrame(currentAnimationId)
                wheelForceAnimationId.current.id = 0
            }
        } else {
            if (wheelForceAnimationId.current.id) return
            const applyForceToWheelFunction = applyForceToWheel.current
            if (applyForceToWheelFunction) {
                if (prjctx.scrollSinceSelection) prjctx.scrollSinceSelection.current = true
                wheelForceAnimationId.current = applyForceToWheelFunction()
            }
        }
    })
    const createCard = (
        selected: ProjectCardProps['current'],
        isPrevious: boolean,
        cardRefs: React.RefObject<(HTMLDivElement | null)[]>,
    ) => {
        return (
            <div
                style={{ opacity }}
                className={`
                    w-full h-0 flex items-center
                    ${isPrevious ? 'absolute top-0 left-0 pointer-events-none' : ''}
                `}
            >
                <div>
                    <div className="flex gap-20 items-center flex-row-reverse">
                        <div className="flex gap-8 flex-col">
                            <div ref={(el) => void (cardRefs.current[0] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="w-fit py-2" cacheKey={selected.id + '0'}>
                                        <div className="flex items-center gap-2 justify-between pr-4 flex-wrap pl-1">
                                            <p className="text-3xl pr-8">{selected.name}</p>
                                            <div className="flex gap-10">
                                                {selected.demo ? (
                                                    <div className="bg-blue-700 px-0.5">
                                                        <div className="translate-y-2">
                                                            <ExternalLink href={selected.demo}>View Live</ExternalLink>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                {selected.github ? (
                                                    <ExternalLink href={selected.github}>GitHub</ExternalLink>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="w-fit" cacheKey={'title0'}>
                                        {' '}
                                        {/* These nothing-selected cards are declared like this since all cards have to share a ref to prevent animations from being cut off */}
                                        Hi, I&apos;m Scott, a software engineer.
                                    </ProjectCardCard>
                                )}
                            </div>
                            <div ref={(el) => void (cardRefs.current[1] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="p-2" cacheKey={selected.id + '1'}>
                                        {selected.description.map((line) => (
                                            <div className="pb-2 text-sm 2xl:text-md" key={line}>
                                                <Markdown
                                                    components={{
                                                        a: ({ href, children }) => (
                                                            <a
                                                                href={href}
                                                                className="underline hover:bg-black/10 active:bg-black/30 transition-colors duration-200"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {children}
                                                            </a>
                                                        ),
                                                    }}
                                                >
                                                    {line}
                                                </Markdown>
                                            </div>
                                        ))}
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="-ml-15 w-200" cacheKey={'title1'}>
                                        This is my developer portfolio. Click on a section to view related projects,
                                        tools, and topics. You can also drag or scroll the wheel.
                                    </ProjectCardCard>
                                )}
                            </div>
                            <div ref={(el) => void (cardRefs.current[3] = el)}>
                                {!selected ? (
                                    <div ref={(el) => void (cardRefs.current[3] = el)} className="pl-80">
                                        <ProjectCardCard
                                            className="flex flex-col items-center w-fit"
                                            cacheKey={'title2'}
                                        >
                                            <p className="text-xl mb-1">Featured Items</p>
                                            <div className="relative overflow-hidden w-full">
                                                <div className="flex w-fit">
                                                    {['Scrapstack', 'Choob'].map((name, i) => (
                                                        <div key={i} className="mr-4">
                                                            <TechStackButton
                                                                key={name}
                                                                technology={name}
                                                                removeArrow
                                                                textClassName="text-center"
                                                                onClick={() => handleItemClick(name)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => setIsAcceleratingWheel((v) => !v)}
                                                        className={techStackButtonStyle}
                                                    >
                                                        {isAcceleratingWheel
                                                            ? 'Stop Accelerating the wheel'
                                                            : 'Accelerate the wheel'}
                                                    </button>
                                                </div>
                                            </div>
                                        </ProjectCardCard>
                                    </div>
                                ) : selected?.images ? (
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <div
                                            className={`relative w-130`}
                                            style={{
                                                height: selected.images.length * 6 + 'rem',
                                            }}
                                        >
                                            {selected.images.map((image, index) => {
                                                const stackPosition = mod(index + imageScroll, selected.images!.length)
                                                const isFront = stackPosition === selected.images!.length - 1
                                                return (
                                                    <div
                                                        key={image}
                                                        className={`absolute transition-transform duration-500 ease-in-out`}
                                                        style={{
                                                            transform: `
                                                        translateY(${stackPosition * 4}rem)
                                                        translateX(${((index: number) => {
                                                            if (index == 2) return 3
                                                            else if (index == 1) return 12
                                                            return 0
                                                        })(stackPosition)}rem
                                                    `,
                                                            zIndex: stackPosition,
                                                        }}
                                                    >
                                                        <Expandable jump={isFront ? 0 : stackPosition * 64 + 176}>
                                                            <ProjectCardCard className="" cacheKey={selected.id + '3-' + index}>
                                                                <img
                                                                    alt={image}
                                                                    className="h-50 w-auto"
                                                                    src={image}
                                                                ></img>
                                                            </ProjectCardCard>
                                                        </Expandable>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {selected.images.length > 1 ? (
                                            <div
                                                ref={(el) => void (cardRefs.current[4] = el)}
                                                className="w-full flex justify-center"
                                                style={{
                                                    transform: `translateY(${selected.images.length * 0.5 + 4}rem)`,
                                                }}
                                            >
                                                <ProjectCardCard className="flex p-0!" cacheKey={selected.id + '4'}>
                                                    <AiFillCaretLeft
                                                        size={16}
                                                        className="hover:text-white hover:cursor-pointer hover:pr-3 transition-all duration-150 w-14 h-14 p-2 py-3"
                                                        onClick={() => setImageScroll((prev) => prev + 1)}
                                                    />
                                                    <AiFillCaretRight
                                                        size={16}
                                                        className="hover:text-white hover:cursor-pointer hover:pl-3 transition-all duration-150 w-14 h-14 p-2 py-3"
                                                        onClick={() => setImageScroll((prev) => prev - 1)}
                                                    />
                                                </ProjectCardCard>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="mt-10">
                            <div ref={(el) => void (cardRefs.current[2] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="h-fit translate-x-4 2xl:translate-x-0 overflow-auto" cacheKey={selected.id + '2'}>
                                        <div className="pr-4">
                                            <p className="text-xl pl-2">{selected.date ? 'Tools' : 'Related'}</p>
                                            {selected.links.map((technology) => {
                                                let foundTool: Item | undefined
                                                for (const category of Object.values(PortfolioData)) {
                                                    if (Object.prototype.hasOwnProperty.call(category, technology)) {
                                                        foundTool = category[technology] as Item
                                                        break
                                                    }
                                                }

                                                if (foundTool) {
                                                    return (
                                                        <TechStackButton
                                                            key={technology}
                                                            technology={technology}
                                                            onClick={() => handleItemClick(technology)}
                                                        />
                                                    )
                                                }

                                                return (
                                                    <button
                                                        key={technology + ' container'}
                                                        className="flex items-center p-2 w-max duration-200"
                                                        tabIndex={-1}
                                                        disabled
                                                    >
                                                        <p className="grow ml-3 w-max" key={technology}>
                                                            {technology}
                                                        </p>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </ProjectCardCard>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {createCard(current, false, currentCardRefs)}
            {previous || current ? createCard(previous, true, previousCardRefs) : <></>}
        </>
    )
}

type Point = [number, number]
const transformKeys = ['rotateX', 'rotateY', 'translateX', 'translateY'] as const

// While an Expandable is open, cards inside it lerp their tilt to flat instead of following the cursor
const TiltPausedContext = React.createContext(false)
function ProjectCardCard({
    className,
    children,
    cacheKey,
}: {
    className?: string
    children: ReactNode
    cacheKey: string
}) {
    const ref = useRef<HTMLDivElement>(null)

    const { cursorPosition, currentTransforms } = useContext(CursorContext)
    const tiltPaused = useContext(TiltPausedContext)

    // tilt cards
    useEffect(() => {
        const distanceFromOrigin = (p1: Point): number => Math.sqrt(p1[0] ** 2 + p1[1] ** 2)
        const applyTransform = (p1: Point): Point => {
            return [p1[0] * bumpFunction(distanceFromOrigin(p1)), p1[1] * bumpFunction(distanceFromOrigin(p1))]
        }

        let raf: number
        let last = performance.now()
        const tick = (now: number) => {
            raf = requestAnimationFrame(tick)
            const dt = now - last
            last = now
            if (!ref.current || !cursorPosition) return

            // get cursor relative to element; a paused card lerps back to flat
            const transformedPoint = tiltPaused
                ? ([0, 0] as Point)
                : applyTransform(convertToRelative(cursorPosition.current, ref.current))
            const targets = {
                rotateX: transformedPoint[1],
                rotateY: transformedPoint[0] * -1,
                translateX: transformedPoint[0],
                translateY: transformedPoint[1],
            }

            // get next targets
            const ease = 1 - Math.exp(-dt / 200)
            const current = currentTransforms?.current[cacheKey] ?? [0, 0, 0, 0]
            const next = transformKeys.map((key, i) => {
                const stepped = current[i] + (targets[key] - current[i]) * ease
                return Math.abs(targets[key] - stepped) < 0.001 ? targets[key] : stepped
            }) as [number, number, number, number]
            if (currentTransforms?.current) currentTransforms.current[cacheKey] = next

            // do math to find final operations
            const a = (next[0] * Math.PI) / 180
            const b = (next[1] * Math.PI) / 180
            const m = [Math.cos(b), Math.sin(a) * Math.sin(b), 0, Math.cos(a)]
            ref.current.style.transform = `matrix(
                ${m[0]}, ${m[1]}, ${m[2]}, ${m[3]},
                ${m[0] * next[2] + m[2] * next[3]}, ${m[1] * next[2] + m[3] * next[3]}
            )`
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [cacheKey, cursorPosition, currentTransforms, tiltPaused])

    return (
        <div
            ref={ref}
            className={`${className ?? ''} bg-foreground text-stone-200 p-3`}
            style={{
                transformOrigin: 'center',
            }}
        >
            {children}
        </div>
    )
}

/**
 * @param param0 absolute point of cursor
 * @param target element
 * @returns distance from param0 to center of target
 */
function convertToRelative([cursorPageX, cursorPageY]: Point, target: HTMLDivElement): Point {
    const elementPosition = getElementViewportPosition(target)
    const x = cursorPageX - (elementPosition[0] + target.offsetWidth / 2)
    const y = cursorPageY - (elementPosition[1] + target.offsetHeight / 2)
    return [x, y]
}

/**
 * @param el element
 * @returns postion of element in viewport
 */
function getElementViewportPosition(el: HTMLElement): Point {
    let x = 0,
        y = 0
    let current: HTMLElement | null = el

    while (current) {
        x += current.offsetLeft
        y += current.offsetTop
        current = current.offsetParent as HTMLElement | null
    }

    return [x, y]
}

/**
 * Click-to-expand: the content first rises in place by `jump` px — still at its own z-index, so it
 * slides through its group with correct stacking — then hands off to a portaled copy at the apex,
 * which falls to the center of the screen while growing. With jump = 0 it skips the rise and just
 * grows straight to the center. The portal keeps ancestor transforms/z-indexes from trapping it.
 */
function Expandable({ children, jump }: { children: ReactNode; jump?: number }) {
    const baseRef = useRef<HTMLDivElement>(null)
    const cloneRef = useRef<HTMLDivElement>(null)
    const backdropRef = useRef<HTMLDivElement>(null)
    const riseAnim = useRef<Animation | null>(null)

    // baseRect mounts the portal (and hides the original); isExpanded picks the open/close animation.
    // For jumping cards it's measured at the apex of the rise, not the resting position.
    const [baseRect, setBaseRect] = useState<DOMRect | null>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (!baseRect) return
        const onKey = (e: KeyboardEvent) => void (e.key === 'Escape' && setIsExpanded(false))
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [baseRect])

    useEffect(() => {
        const clone = cloneRef.current
        if (!baseRect || !clone) return

        const scale = Math.min(
            (window.innerWidth * 0.72) / baseRect.width,
            (window.innerHeight * 0.72) / baseRect.height,
        )
        const dx = window.innerWidth / 2 - (baseRect.left + baseRect.width / 2)
        const dy = window.innerHeight / 2 - (baseRect.top + baseRect.height / 2)
        const expanded = `translate(${dx}px, ${dy}px) scale(${scale})`
        const collapsed = 'translate(0px, 0px) scale(1)'

        clone.getAnimations().forEach((anim) => anim.cancel())
        backdropRef.current?.getAnimations().forEach((anim) => anim.cancel())
        backdropRef.current?.animate([{ opacity: isExpanded ? 0 : 1 }, { opacity: isExpanded ? 1 : 0 }], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'both',
        })

        if (!isExpanded) {
            const anim = clone.animate([{ transform: expanded }, { transform: collapsed }], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'both',
            })
            anim.onfinish = () => {
                setBaseRect(null)
                if (riseAnim.current) {
                    riseAnim.current.onfinish = null // reversing replays the animation, and finishing it again would re-trigger the expand handoff
                    riseAnim.current.reverse() // drop the original back down into the stack
                    riseAnim.current = null
                }
            }
            return
        }

        clone.animate([{ transform: collapsed }, { transform: expanded }], {
            duration: 450,
            easing: jump ? 'cubic-bezier(0.5, 0, 0.3, 1)' : 'ease-out', // jumping cards fall from the apex, others just rise
            fill: 'both',
        })
    }, [baseRect, isExpanded, jump])

    const open = () => {
        const base = baseRef.current
        if (!base) return
        if (!jump) {
            setBaseRect(base.getBoundingClientRect())
            setIsExpanded(true)
            return
        }
        const anim = base.animate([{ transform: 'translateY(0px)' }, { transform: `translateY(${-jump}px)` }], {
            duration: 350,
            easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)', // decelerate up to the apex
            fill: 'both',
        })
        riseAnim.current = anim
        anim.onfinish = () => {
            setBaseRect(base.getBoundingClientRect()) // measured at the apex, so the clone takes over from there
            setIsExpanded(true)
        }
    }

    return (
        <TiltPausedContext.Provider value={baseRect !== null}>
            <div
                ref={baseRef}
                onClick={open}
                className="cursor-zoom-in"
                style={{ visibility: baseRect ? 'hidden' : undefined }}
            >
                {children}
            </div>
            {baseRect
                ? createPortal(
                      <div className="fixed inset-0 z-40 cursor-zoom-out" onClick={() => setIsExpanded(false)}>
                          <div ref={backdropRef} className="absolute inset-0 bg-stone-900/60 opacity-0" />
                          <div
                              ref={cloneRef}
                              className="absolute"
                              style={{
                                  top: baseRect.top,
                                  left: baseRect.left,
                                  width: baseRect.width,
                                  height: baseRect.height,
                              }}
                          >
                              {children}
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </TiltPausedContext.Provider>
    )
}

/**
 * Adapted from https://www.johndcook.com/blog/2022/06/23/bump-functions/
 * @param x number
 * @returns number mapped to "bump" function (infinitely differentiable, 0 when abs(x) > 1)
 */
function bumpFunction(x: number) {
    const f = (x: number) => Math.pow(x, 7)
    const g = (x: number) => (x > 0 ? 1 / f(1 / x) : 0)
    const h = (x: number) => g(x + 1) * g(1 - x)
    const scale = (x: number) => h(x / 800) * 0.1
    return scale(x)
}
