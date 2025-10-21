import 'react-image-gallery/styles/css/image-gallery.css'
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PortfolioData, Category } from '@/typescript/wheel_info'
import { CursorContext, ProjectContext } from '@/contexts'
import { all_items_with_gaps } from '../typescript/wheel_info'
import { Item } from '@/typescript/data'

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

function ExternalLink({ href, children }: { href: string, children: ReactNode }) {
    return <a href={href} className="text-stone-200 hover:underline hover:bg-white/20 active:bg-black/10 bg-white/40 p-2 transition-colors duration-200" target="_blank" rel="noopener noreferrer">{children}</a>
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

    const cardRef0 = useRef<HTMLDivElement>(null)
    const cardRef1 = useRef<HTMLDivElement>(null)
    const cardRef2 = useRef<HTMLDivElement>(null)
    const currentCardRefs = useMemo(() => [cardRef0, cardRef1, cardRef2], [])

    const cardRef3 = useRef<HTMLDivElement>(null)
    const cardRef4 = useRef<HTMLDivElement>(null)
    const cardRef5 = useRef<HTMLDivElement>(null)
    const previousCardRefs = useMemo(() => [cardRef3, cardRef4, cardRef5], [])

    useEffect(() => {
        currentCardRefs.forEach((cardRef, index) => {
            cardRef.current?.getAnimations().forEach((anim) => anim.cancel())
            cardRef.current?.animate(
                [
                    { transform: 'translate(-25%, 0%)', opacity: 0 },
                    { transform: 'translate(0%, 0%)', opacity: 1 },
                ],
                {
                    duration: 800,
                    delay: index * 300 + 800,
                    easing: 'ease-out',
                    fill: 'both',
                },
            )
        })
        setOpacity(1) // Change from 0 to not override the animation
        previousCardRefs.forEach((cardRef, index) => {
            cardRef.current?.getAnimations().forEach((anim) => anim.cancel())
            cardRef.current?.animate(
                [
                    { transform: 'translate(0%, 0%)', opacity: 1 },
                    { transform: 'translate(0%, 200px)', opacity: 0 },
                ],
                {
                    duration: 500,
                    delay: index * 150,
                    easing: 'cubic-bezier(0.42, 0, 1, 1)',
                    fill: 'both',
                },
            )
        })
    }, [selected, isPrevious, currentCardRefs, previousCardRefs])

    const createCard = (selected: ProjectCardProps["current"], isPrevious: boolean, cardRefs: React.RefObject<HTMLDivElement | null>[]) => {
        return (
            <div
                className={`
                    w-full h-0 opacity-${opacity} flex items-center
                    ${isPrevious ? "absolute top-0 left-0 pointer-events-none" : ""}
                `}
            >
                <div>
                    <div className="flex gap-20 items-center flex-row-reverse">
                        <div className="flex gap-20 flex-col">
                            <div ref={cardRefs[1]}>
                                {selected ? (
                                    <ProjectCardCard className="w-fit py-2">
                                        <div className="flex items-center gap-2 justify-between pr-4 flex-wrap pl-1">
                                            <p className="text-3xl pr-8">{selected.name}</p>
                                            <div className="flex gap-10">
                                                {selected.demo ? <ExternalLink href={selected.demo}>View Live</ExternalLink> : <></>}
                                                {selected.github ? <ExternalLink href={selected.github}>GitHub</ExternalLink> : <></>}
                                            </div>
                                        </div>
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="w-fit">
                                        Hello. I&apos;m Scott, a software engineer.
                                    </ProjectCardCard>
                                )}
                            </div>
                            <div ref={cardRefs[0]}>
                                {selected ? (
                                    <ProjectCardCard className="p-2">
                                        {selected.description.map(line => <p className="pb-2" key={line}>{line}</p>)}
                                    </ProjectCardCard>
                                ) : (
                                    <ProjectCardCard className="-translate-x-15">
                                        Projects and tools are viewable on the right. You can also drag the wheel.
                                    </ProjectCardCard>
                                )}
                            </div>
                        </div>
                        <div className="mt-10">
                            <div ref={cardRefs[2]}>
                                {selected ? (
                                    <ProjectCardCard className="h-fit overflow-auto">
                                        <div className="pr-4">
                                            <p className="text-xl pl-2">Tools</p>
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
function ProjectCardCard({ className, children }: { className?: string, children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    const softMFunction = (x: number): number => ((1 / (3 + (x / 100 - 1) ** 2)) + (1 / (3 + (x / 100 + 1) ** 2))) * x * .001
    const distanceFromOrigin = (p1: Point): number => Math.sqrt(p1[0] ** 2 + p1[1] ** 2)
    const applyTransform = (p1: Point): Point => {
        return [
            p1[0] * softMFunction(distanceFromOrigin(p1)),
            p1[1] * softMFunction(distanceFromOrigin(p1))
        ]
    }

    const relativeCursorPosition = useRelativeCursor(ref)
    const transformed = applyTransform(relativeCursorPosition)
    return (
        <div
            ref={ref}
            className={`${className ?? ""} bg-foreground text-stone-200 p-3`}
            style={{
                transform: `
                    rotateY(${Math.sin(1 / transformed[1]) * transformed[1]}deg) rotateX(${Math.sin(1 / transformed[0]) * transformed[0]}deg)
                    translateX(${transformed[0]}px) translateY(${transformed[1]}px)
                `,
                transformStyle: "preserve-3d",
                transformOrigin: "center",
            }}
        >
            {children}
        </div>
    )
}

function useRelativeCursor(target: React.RefObject<HTMLDivElement | null>) {

    const { cursorPosition } = useContext(CursorContext)
    const [relativeCursorPosition, setRelativeCursorPosition] = useState<Point>([950, 0])
    useEffect(() => {
        const handler = () => {
            if (target.current) setRelativeCursorPosition(convertToRelative(cursorPosition, target.current))
        }
        handler()
        document.addEventListener('pointermove', handler)
        return () => document.removeEventListener('pointermove', handler)
    }, [cursorPosition, target])

    return relativeCursorPosition
}

function convertToRelative(
    [cursorPageX, cursorPageY]: Point,
    target: HTMLDivElement
): Point {
    const elementPosition = getElementViewportPosition(target)
    const x = cursorPageX - (elementPosition.x + target.offsetWidth / 2)
    const y = cursorPageY - (elementPosition.y + target.offsetHeight / 2)
    return [x, y]
}

function getElementViewportPosition(el: HTMLElement) {
    let x = 0, y = 0
    let current: HTMLElement | null = el

    while (current) {
        x += current.offsetLeft
        y += current.offsetTop
        current = current.offsetParent as HTMLElement | null
    }

    return { x, y }
}