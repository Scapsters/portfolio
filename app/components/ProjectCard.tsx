import 'react-image-gallery/styles/css/image-gallery.css'
import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PortfolioData, Category } from '@/typescript/wheel_info'
import { CursorContext, ProjectContext } from '@/contexts'
import { all_items_with_gaps } from '../typescript/wheel_info'
import { Item } from '@/typescript/data'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { mod } from '@/typescript/math_helpers'

type ProjectCardProps = {
    current: Item | null | undefined
    previous: Item | null | undefined
    isPrevious: boolean
}

function TechStackButton({ technology, onClick }: Readonly<{ technology: string; onClick: () => void }>) {
    return (
        <button
            key={technology + 'container'}
            className="flex items-center bg-white/40 hover:bg-black/10 cursor-pointer m-2 p-2 w-full text-left duration-200"
            onClick={onClick}
        >
            <p className="grow ml-1 mr-1 w-max" key={technology}>
                {technology} ↗
            </p>
        </button>
    )
}

function ExternalLink({ href, children }: { href?: string, children: ReactNode }) {
    return <a href={href} className="text-stone-200 hover:underline hover:bg-black/10 active:bg-black/30 bg-white/40 p-2 transition-colors duration-200" target="_blank" rel="noopener noreferrer">{children}</a>
}

export function ProjectCard({ isPrevious, current, previous }: ProjectCardProps) {
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
        }, [prjctx, selected],
    )

    const [opacity, setOpacity] = useState(0) // Prevent flash on loading

    const currentCardRefs = useRef<(HTMLDivElement | null)[]>(new Array(7).fill(null))
    const previousCardRefs = useRef<(HTMLDivElement | null)[]>(new Array(7).fill(null))

    useEffect(() => {
        currentCardRefs.current.forEach((cardRef, index) => {
            cardRef?.getAnimations().forEach((anim) => anim.cancel())
            cardRef?.animate(
                [
                    { opacity: 0 },
                    { opacity: 1 },
                ],
                {
                    duration: 800,
                    delay: index * 300 + 800,
                    easing: 'ease-out',
                    fill: 'both',
                },
            )
            cardRef?.animate(
                [
                    { transform: 'translate(-25%, 0%)' },
                    { transform: 'translate(0%, 0%)' },
                ],
                {
                    duration: 800,
                    delay: index * 300 + 800,
                    easing: 'ease-out',
                    fill: 'both',
                    composite: 'add'
                },
            )
        })
        let cardsAnimated = 0
        previousCardRefs.current.toReversed().forEach((cardRef) => {
            const delay = cardsAnimated * 150
            if (cardRef) cardsAnimated++
            cardRef?.getAnimations().forEach((anim) => anim.cancel())
            cardRef?.animate(
                [
                    { opacity: 1 },
                    { opacity: 0 },
                ],
                {
                    duration: 500,
                    delay,
                    easing: 'cubic-bezier(0.42, 0, 1, 1)',
                    fill: 'both',
                },
            )
            cardRef?.animate(
                [
                    { transform: 'translate(0%, 0%)' },
                    { transform: 'translate(0%, 200px)'  },
                ],
                {
                    duration: 500,
                    delay,
                    easing: 'cubic-bezier(0.42, 0, 1, 1)',
                    fill: 'both',
                    composite: 'add'
                },
            )
        })
        setOpacity(1) // Change from 0 to not override the animation
    }, [selected, isPrevious, currentCardRefs, previousCardRefs])

    const [imageScroll, setImageScroll] = useState(0)
    const createCard = (selected: ProjectCardProps["current"], isPrevious: boolean, cardRefs: React.RefObject<(HTMLDivElement | null)[]>) => {
        return (
            <div
                className={`
                    w-full h-0 opacity-${opacity} flex items-center
                    ${isPrevious ? "absolute top-0 left-0 pointer-events-none" : ""}
                `}
            >
                <div>
                    <div className="flex gap-20 items-center flex-row-reverse">
                        <div className="flex gap-8 flex-col">
                            <div ref={el => void (cardRefs.current[0] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="w-fit py-2" cacheKey={selected.id + "0"}>
                                        <div className="flex items-center gap-2 justify-between pr-4 flex-wrap pl-1">
                                            <p className="text-3xl pr-8">{selected.name}</p>
                                            <div className="flex gap-10">
                                                {selected.demo 
                                                    ? <div className="bg-blue-700 px-1">
                                                        <div className="translate-y-2">
                                                            <ExternalLink href={selected.demo}>View Live</ExternalLink>
                                                        </div>
                                                    </div>
                                                    : <></>
                                                }
                                                {selected.github ? <ExternalLink href={selected.github}>GitHub</ExternalLink> : <></>}
                                            </div>
                                        </div>
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="w-fit" cacheKey={"title0"}>
                                        Hi, I&apos;m Scott, a software engineer.
                                    </ProjectCardCard>
                                )}
                            </div>
                            <div ref={el => void (cardRefs.current[1] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="p-2" cacheKey={selected.id + "1"}>
                                        {selected.description.map(line => <p className="pb-2" key={line}>{line}</p>)}
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="-translate-x-15 w-200" cacheKey={"title1"}>
                                        This is my developer portfolio. Click on a section to view related projects, tools, and topics. You can also drag the wheel.
                                    </ProjectCardCard>
                                )}
                            </div>
                            {selected?.images
                                ? <div className="w-full flex flex-col justify-center items-center">
                                <div
                                    className={`relative w-130`}
                                    ref={el => void (cardRefs.current[3] = el)}
                                    style={{
                                        height: selected.images.length * 6 + "rem"
                                    }}
                                >
                                    {selected.images.map((image, index) => (
                                        <div
                                            key={image}
                                            className={`absolute transition-transform duration-500 ease-in-out`}
                                            style={{
                                                transform: `
                                                    translateY(${mod(index + imageScroll, selected.images!.length) * 4}rem) 
                                                    translateX(${((index: number) => {
                                                        if (index == 2) return 3
                                                        else if (index == 1) return 12
                                                        return 0
                                                    })(mod(index + imageScroll, selected.images!.length))}rem
                                                `,
                                                zIndex: mod(index + imageScroll, selected.images!.length)
                                            }}
                                        >
                                            <ProjectCardCard className="" cacheKey={selected.id + "3"}>
                                                <img className="h-50 w-auto" src={image}></img>
                                            </ProjectCardCard>
                                        </div>
                                    ))}
                                    </div>
                                    {selected.images.length > 1
                                        ? <div
                                            ref={el => void (cardRefs.current[4] = el)} 
                                            className='w-full flex justify-center' 
                                            style={{ transform: `translateY(${selected.images.length * .5 + 4}rem)` }}
                                        >
                                            <ProjectCardCard className="flex p-0!" cacheKey={selected.id + "4"}>
                                                <AiFillCaretLeft size={16} className="hover:text-white hover:cursor-pointer hover:pr-3 transition-all duration-150 w-14 h-14 p-2 py-3" onClick={() => setImageScroll(prev => prev + 1)}/>
                                                <AiFillCaretRight size={16} className="hover:text-white hover:cursor-pointer hover:pl-3 transition-all duration-150 w-14 h-14 p-2 py-3" onClick={() => setImageScroll(prev => prev - 1)}/>
                                            </ProjectCardCard>
                                        </div>
                                        : <></>
                                    }
                                </div>
                                : <></>
                            }
                        </div>
                        <div className="mt-10">
                            <div ref={el => void (cardRefs.current[2] = el)}>
                                {selected ? (
                                    <ProjectCardCard className="h-fit overflow-auto" cacheKey={selected.id + "2"}>
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
                                ) : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <>
        {createCard(current, false, currentCardRefs)}
        {previous || current ? createCard(previous, true, previousCardRefs) : <></>}
    </>
}

type Point = [number, number]
function ProjectCardCard({ className, children, cacheKey }: { className?: string, children: ReactNode, cacheKey: string }) {
    const ref = useRef<HTMLDivElement>(null)

    // decide target
    const distanceFromOrigin = (p1: Point): number => Math.sqrt(p1[0] ** 2 + p1[1] ** 2)
    const applyTransform = (p1: Point): Point => {
        return [
            p1[0] * bumpFunction(distanceFromOrigin(p1)),
            p1[1] * bumpFunction(distanceFromOrigin(p1))
        ]
    }
    const relativeCursorPosition = useRelativeCursor(ref, cacheKey)
    const transformedPoint = applyTransform(relativeCursorPosition)
    // rotateX, rotateY, translateX, translateY
    const targetTransforms = [
        transformedPoint[1],
        transformedPoint[0] * -1,
        transformedPoint[0],
        transformedPoint[1]
    ]

    // get current
    const { currentTransforms: currentTransformsSet } = useContext(CursorContext)
    const currentTransforms = currentTransformsSet?.current[cacheKey] ?? [0, 0, 0, 0]
    
    // calculate, cache, and apply next
    const nextTransforms = currentTransforms.map((current, index) => {
        const target = targetTransforms[index]
        return current + (target - current) / 10
    }) as [number, number, number, number]
    if (currentTransformsSet?.current) currentTransformsSet.current[cacheKey] = nextTransforms
    return (
        <div
            ref={ref}
            className={`${className ?? ""} bg-foreground text-stone-200 p-3`}
            style={{
                transform: `
                    rotateX(${nextTransforms[0]}deg) rotateY(${nextTransforms[1]}deg)
                    translateX(${nextTransforms[2]}px) translateY(${nextTransforms[3]}px)
                `,
                transformStyle: "preserve-3d",
                transformOrigin: "center",
            }}
        >
            {children}
        </div>
    )
}

function useRelativeCursor(target: React.RefObject<HTMLDivElement | null>, cacheKey: string) {

    const { cursorPosition, relativeCursorPositions } = useContext(CursorContext)
    const [relativeCursorPosition, setRelativeCursorPosition] = useState<Point>(relativeCursorPositions?.current[cacheKey] ?? [950, 0])
    useEffect(() => {
        const handler = () => {
            if (!target.current) return
            const relativeCursorPosition = convertToRelative(cursorPosition, target.current)
            setRelativeCursorPosition(relativeCursorPosition)
            if (relativeCursorPositions) relativeCursorPositions.current[cacheKey] = relativeCursorPosition
        }
        handler()
        document.addEventListener('pointermove', handler)
        return () => document.removeEventListener('pointermove', handler)
    }, [cacheKey, cursorPosition, relativeCursorPositions, target])

    return relativeCursorPosition
}

function convertToRelative(
    [cursorPageX, cursorPageY]: Point,
    target: HTMLDivElement
): Point {
    const elementPosition = getElementViewportPosition(target)
    const x = cursorPageX - (elementPosition[0] + target.offsetWidth / 2)
    const y = cursorPageY - (elementPosition[1] + target.offsetHeight / 2)
    return [x, y]
}

function getElementViewportPosition(el: HTMLElement): Point {
    let x = 0, y = 0
    let current: HTMLElement | null = el

    while (current) {
        x += current.offsetLeft
        y += current.offsetTop
        current = current.offsetParent as HTMLElement | null
    }

    return [x, y]
}

//eslint-disable-next-line
function Expandable({ children }: { children: ReactNode }) {
    // Unfinished
    const imageRef = useRef<HTMLDivElement>(null)
    
    const [baseSize, setBaseSize] = useState<Point>([0, 0])
    const [baseLocation, setBaseLocation] = useState<Point>([0, 0])
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            setBaseLocation([...getElementViewportPosition(entries[0].target as HTMLElement)])
            setBaseSize([entries[0].borderBoxSize[0].inlineSize, entries[0].borderBoxSize[0].blockSize])
        })
        const ref = imageRef.current
        if (ref) observer.observe(ref)
        return () => { if (ref) observer.unobserve(ref) }
    }, [])

    console.log(baseSize)
    console.log(baseLocation)
    const [isExpanded, setIsExpanded] = useState(false)
    return (<>
        <div className="absolute top-0 w-screen h-screen bg-stone-800/5">

        </div>
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            ref={imageRef}
            className="h-50"
        >
            {children}
        </div>
    </>)
}

// Adapted from https://www.johndcook.com/blog/2022/06/23/bump-functions/
function bumpFunction(x: number) {
    const f = (x: number) => Math.pow(x, 7)
    const g = (x: number) => x > 0 ? (1 / f(1/x)) : 0
    const h = (x: number) => g(x + 1) * g(1 - x)
    const scale = (x: number) => h(x/800) * .1
    return scale(x)
}