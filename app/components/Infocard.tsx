import { lexendPeta } from '@/typescript/css_constants'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Infocard() {
    const anchorRefs = useRef<(HTMLDivElement | null)[]>(new Array(4).fill(null))
    const spanRefs = useRef<(HTMLSpanElement | null)[]>(new Array(7).fill(null))
    const translate = useRef('-80px')

    useEffect(() => {
        const shiftOnHover = (e: MouseEvent, value: string) => {
            const anchorIndex = anchorRefs.current.findIndex((ref) => ref === e.target)
            const anchor = anchorRefs.current[anchorIndex]
            const spans = [spanRefs.current[anchorIndex], spanRefs.current[anchorIndex - 1]]
            const targetElements = [anchor, ...spans]
            for (const element of targetElements) {
                element?.style.setProperty('transform', `translateY(${value})`)
            }
        }

        const mouseEnterHandler = (e: MouseEvent) => shiftOnHover(e, '0px')
        const mouseExitHandler = (e: MouseEvent) => shiftOnHover(e, translate.current)

        const stableDivRefs = anchorRefs.current
        stableDivRefs.forEach((div) => {
            div?.addEventListener('mouseenter', mouseEnterHandler)
            div?.addEventListener('mouseleave', mouseExitHandler)
        })
        return () => {
            stableDivRefs.forEach((div) => {
                div?.removeEventListener('mouseenter', mouseEnterHandler)
                div?.removeEventListener('mouseleave', mouseExitHandler)
            })
        }
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
        if (index > spanRefs.current.length) console.error('makeSpan given too high an index')
        return (
            <span
                ref={(el) => void (spanRefs.current[index] = el)}
                style={{ transform: `translateY(${translate.current})` }}
                className={`transition duration-400 mt-1 border-l-2 h-27 border-[var(--dark-text)]`}
            ></span>
        )
    }

    function makeAnchor(index: number, href: string, text: string, isInternalLink?: boolean) {
        if (index > anchorRefs.current.length) console.error('makeAnchor given too high an index')
        return (
            <div
                ref={(el) => void (anchorRefs.current[index] = el)}
                style={{ transform: `translateY(${translate.current})` }}
                className={`transition duration-400 flex flex-col pl-5 pr-5 h-min hover:underline`}
            >
                {Array.from({ length: 4 }).map((_, index) =>
                    isInternalLink ? (
                        <a key={index + 'gh'} href={href} tabIndex={index == 3 ? 0 : -1}>
                            {text}
                        </a>
                    ) : (
                        <Link key={index + 'gh'} href={href} tabIndex={index == 3 ? 0 : -1}>
                            {text}
                        </Link>
                    ),
                )}
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
            {makeSpan(2)}
            {makeAnchor(3, '/blog', 'Blog', true)}
        </div>
    )

    return (
        <div ref={ref} className="absolute transform translate-y-[-80px] z-0">
            <div className="w-240 absolute h-5 z-3 bg-[var(--background)]"></div>
            <div className="w-max absolute">{info}</div>
        </div>
    )
}
