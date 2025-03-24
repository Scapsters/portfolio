import { lexendPeta } from '@/typescript/css_constants'
import { useEffect, useRef } from 'react'

export default function Infocard() {
    const divRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
    const spanRefs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null)]

    useEffect(() => {
        const updateStyles = (e: MouseEvent, value: string) => {
            const anchorIndex = divRefs.findIndex((ref) => ref.current === e.target)
            const anchor = divRefs[anchorIndex].current
            const spans = [spanRefs[anchorIndex - 1], spanRefs[anchorIndex]]

            spans.forEach((span) => {
                if (span?.current) span.current.style.paddingTop = value
            })
            if (anchor) anchor.style.paddingTop = value
        }

        const mouseEnterHandler = (e: MouseEvent) => updateStyles(e, '80px')
        const mouseExitHandler = (e: MouseEvent) => updateStyles(e, '0px')

        divRefs.forEach((anchor) => {
            anchor.current?.addEventListener('mouseenter', mouseEnterHandler)
            anchor.current?.addEventListener('mouseleave', mouseExitHandler)
        })
    })

    const info = (
        <div className="p-4 text-xl flex" style={lexendPeta.style}>
            <div ref={divRefs[0]} className="infocardfast  max-h-[25]">
                <a href="tel:1-603-213-3404" className="infocardfast">
                    603-213-3404
                </a>
            </div>
            &nbsp;&nbsp;
            <span ref={spanRefs[0]} className="infocardslow">
                &nbsp;&nbsp;
                <div className="border-l-2 ml-1 h-50 relative bottom-50 border-[#393939] infocardslow"></div>
                &nbsp;&nbsp;&nbsp;
            </span>
            <div ref={divRefs[1]} className="infocardfast max-h-[25]">
                <a href="https://github.com/Scapsters" className="infocardfast">
                    github.com/Scapsters
                </a>
            </div>
            &nbsp;&nbsp;
            <span ref={spanRefs[1]} className="infocardslow">
                &nbsp;&nbsp;
                <div className="border-l-2 ml-1 h-50 relative bottom-50 border-[#393939] infocardslow"></div>
                &nbsp;&nbsp;&nbsp;
            </span>
            <div ref={divRefs[2]} className="infocardfast max-h-[25]">
                <a href="mailto:scotty.happy@gmail.com" className="infocardfast">
                    scotty.happy@gmail.com
                </a>
            </div>
        </div>
    )

    return (
        <>
            <div className="w-150 absolute h-5 z-3 bg-[#FFFAEF]"></div>
            <div className="w-max h-min absolute z-2">{info}</div>
        </>
    )
}
