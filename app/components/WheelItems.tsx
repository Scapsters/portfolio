import { ProjectContext, Visibility } from "@/contexts";
import { getItemColor, Project, Tool } from "@/typescript/wheel_info";
import { useContext, useEffect, useMemo, useRef } from "react";

export function Group({
    header, items, groupIndex, startingIndex, itemRefs, groupVisibilities
}: Readonly<{ 
        header: string, 
        items: (Tool | Project)[], 
        groupIndex: number
        startingIndex: number, 
        itemRefs: { 
            headerRef: React.RefObject<HTMLDivElement | null>, 
            itemRefs: (React.RefObject<HTMLDivElement | null>)[] 
        }, 
        groupVisibilities?: React.RefObject<Visibility[]>
    }>) {
    console.log('render')
    return (<>
        <ItemWrapper ref={itemRefs.headerRef} isHeader={true}>
            <Header text={header} toggleSection={() => {
                if (!groupVisibilities) return

                const visArray = groupVisibilities.current
                if (!visArray || !visArray[groupIndex]) return

                visArray[groupIndex].visible = !visArray[groupIndex].visible
                visArray[groupIndex].timeSet = performance.now()
            }}/>
        </ItemWrapper>
        {items.map((item, index) => {
            return (
                <ItemWrapper ref={itemRefs.itemRefs[index]} key={item.id + index}>
                    <Item tool={item} index={startingIndex + index + 1}></Item>
                </ItemWrapper>
            )
        })}
    </>)
}

function Header({
    text, toggleSection
}: Readonly<{ text: string, toggleSection: () => void }>) {
    return (
        <button
            className="font-light cursor-pointer text-[var(--light-text)] hover:underline text-right transition-[padding-right] duration-200 ease-out wheel-item wheel-text"
            onClick={toggleSection}
        >{text}</button>
    )
}

function Item({ tool, index }: Readonly<{ tool: Tool | Project; index: number }>) {
    const { 
        selected,
        setSelected,
        setSelectedIndex,
        scrollSinceSelection,
        setPreviousSelected, 
    } = useContext(ProjectContext)

    const handleItemHover = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        (target as HTMLElement).style.setProperty('padding-right', '50px')
    }
    const handleItemUnhover = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        (target as HTMLElement).style.setProperty('padding-right', '0px')
    }

    const buttonRef = useRef<HTMLButtonElement>(null)
    useBoldSelected(buttonRef, selected)

    const itemMemo = useMemo(() => 
        <button
            ref={buttonRef}
            style={{color: getItemColor(tool.id)}}
            className="left-0 p-3 w-max h-max text-[var(--dark-text)] cursor-pointer text-right transition-[padding-right, color] duration-200 ease-out"
            onClick={() => {
                if (scrollSinceSelection) scrollSinceSelection.current = false

                setPreviousSelected(selected)

                // If clicking on the same thing twice, deselect
                if (selected?.id === tool.id) {
                    setSelected(null)
                    setSelectedIndex(null)
                    return
                }

                setSelected(tool)
                setSelectedIndex(index)
            }}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemUnhover}
        >{tool.id}</button>
        ,
        [tool, scrollSinceSelection, setPreviousSelected, selected, setSelected, setSelectedIndex, index]
    )

    return itemMemo
}

function ItemWrapper({ ref, children, isHeader }: Readonly<{ ref: React.RefObject<HTMLDivElement | null>, children: React.ReactNode, isHeader?: boolean }>) {
    return <div
        ref={ref}
        style={isHeader ? { 'zIndex': 2 } : {}}
        className={`relative w-[var(--item-width)] h-0 text-2xl`}
    >
        <div className="flex w-[600px] -rotate-2 select-none justify-end transition-[padding-right] duration-200 ease-out">
            {children}
        </div>
    </div>
}

function useBoldSelected(itemRef: React.RefObject<HTMLButtonElement | null>, selected: Project | Tool | null | undefined) {
    useEffect(() => {
        const element = itemRef?.current
        if (!element)
            return

        if (selected?.id == element.textContent) {
            element.style.setProperty('text-decoration', 'underline')
            element.style.setProperty('font-weight', 'bold')
        } else {
            element.style.setProperty('text-decoration', 'none')
            element.style.setProperty('font-weight', 'normal')
        }
    }, [itemRef, selected])
}
