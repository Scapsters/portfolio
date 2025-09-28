import { Project, Tool } from "@/typescript/wheel_info";
import { createContext } from "react";

export type Visibility = {
    visible: boolean,
    timeSet: number
}

export const ProjectContext = createContext<{
    selected: Project | Tool | null | undefined
    setSelected: React.Dispatch<React.SetStateAction<Project | Tool | null | undefined>>
    selectedIndex: number | null,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
    scrollSinceSelection: boolean
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>
    previousSelected: Project | Tool | null | undefined
    setPreviousSelected: React.Dispatch<React.SetStateAction<Project | Tool | null | undefined>>
    groupVisibilities: Visibility[]
    setGroupVisibilities: React.Dispatch<React.SetStateAction<Visibility[]>>
}>({
    selected: undefined,
    setSelected: () => {},
    selectedIndex: 0,
    setSelectedIndex: () => {},
    scrollSinceSelection: false,
    setScrollSinceSelection: () => {},
    previousSelected: undefined,
    setPreviousSelected: () => {},
    groupVisibilities: [],
    setGroupVisibilities: () => {}
})