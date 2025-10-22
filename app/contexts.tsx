import { createContext, SetStateAction } from "react";
import { Item } from "./typescript/data"

export type Visibility = {
    visible: boolean,
    timeSet: number
}

export const ProjectContext = createContext<{
    selected: Item | null | undefined
    setSelected: React.Dispatch<React.SetStateAction<Item | null | undefined>>
    selectedIndex: number | null,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>,
    scrollSinceSelection?: React.RefObject<boolean>
    previousSelected: Item | null | undefined
    setPreviousSelected: React.Dispatch<React.SetStateAction<Item | null | undefined>>
    groupVisibilities?: React.RefObject<Visibility[]>
}>({
    selected: undefined,
    setSelected: () => {},
    selectedIndex: 0,
    setSelectedIndex: () => {},
    previousSelected: undefined,
    setPreviousSelected: () => {},
    groupVisibilities: undefined,
})

export const CursorContext = createContext<{
    cursorPosition: [number, number]
    setCursorPosition: React.Dispatch<SetStateAction<[number, number]>>
    relativeCursorPositions?: React.RefObject<{ [index: string]: [number, number] }>
}>({
    cursorPosition: [0, 0],
    setCursorPosition: () => {},
})