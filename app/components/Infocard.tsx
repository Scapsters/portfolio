import { lexendPeta } from '@/typescript/css_constants'
import { useEffect, useRef } from 'react'

export default function Infocard() {
    const divRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
    const spanRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
    const translate = useRef('-80px')

    useEffect(() => {
        const updateStyles = (e: MouseEvent, value: string) => {
            const anchorIndex = divRefs.findIndex((ref) => ref.current === e.target)
            const anchor = divRefs[anchorIndex].current
            const spans = [spanRefs[anchorIndex], spanRefs[anchorIndex - 1]].map((ref) => ref?.current)
            const targetElements = [anchor, ...spans]
            for (const element of targetElements) {
                // translate y to value
                element?.style.setProperty('transform', `translateY(${value})`)
            }
        }

        const mouseEnterHandler = (e: MouseEvent) => updateStyles(e, '0px')
        const mouseExitHandler = (e: MouseEvent) => updateStyles(e, translate.current)

        divRefs.forEach((anchor) => {
            anchor.current?.addEventListener('mouseenter', mouseEnterHandler)
            anchor.current?.addEventListener('mouseleave', mouseExitHandler)
        })
    })

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current
            ?.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(80px)' }], {
                duration: 800,
                delay: 1000,
                easing: 'ease-in-out',
                fill: 'forwards',
            })
            .play()
    }, [ref])

    function makeSpan(index: number) {
        return (
            <span
                ref={spanRefs[index]}
                style={{ transform: `translateY(${translate.current})` }}
                className={`transition duration-400 border-l-2  h-28 border-[var(--dark-text)]`}
            ></span>
        )
    }

    function makeAnchor(index: number, href: string, text: string) {
        return (
            <div
                ref={divRefs[index]}
                style={{ transform: `translateY(${translate.current})` }}
                className={`transition duration-400 flex flex-col pl-5 pr-5 h-min hover:underline bg-background`}
            >
                {Array.from({ length: 4 }).map((_, index) => (
                    <a key={index + 'gh'} href={href} tabIndex={index == 3 ? 0 : -1}>
                        {text}
                    </a>
                ))}
            </div>
        )
    }

    const info = (
        <div className="p-4 text-xl flex" style={lexendPeta.style}>
            {makeAnchor(0, 'https://www.linkedin.com/in/scott-happy/', 'Linkedin')}
            {makeSpan(0)}
            {makeAnchor(1, 'https://github.com/Scapsters', 'Github')}
            {makeSpan(1)}
            {makeAnchor(2, 'mailto:scotty.happy@gmail.com', 'Gmail')}
        </div>
    )

    return (
        <div ref={ref} className="absolute transform translate-y-[-80px] z-2">
            <div className="w-240 absolute h-5 z-3 bg-[var(--background)]"></div>
            <div className="w-max absolute z-2">{info}</div>
        </div>
    )
}
