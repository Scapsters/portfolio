import { ProjectData, ToolData } from "@/typescript/wheel_info";
import { createContext } from "react";

export type Visibility = {
    visible: boolean,
    timeSet: number
}

export const ProjectContext = createContext<{
    selected: ProjectData | ToolData | null | undefined
    setSelected: React.Dispatch<React.SetStateAction<ProjectData | ToolData | null | undefined>>
    selectedIndex: number | null,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>
    isProject: boolean
    setIsProject: React.Dispatch<React.SetStateAction<boolean>>
    scrollSinceSelection: boolean
    setScrollSinceSelection: React.Dispatch<React.SetStateAction<boolean>>
    setPreviousSelected: React.Dispatch<React.SetStateAction<ProjectData | ToolData | null | undefined>>
    setIsPreviousProject: React.Dispatch<React.SetStateAction<boolean>>
    groupVisibilities: Visibility[]
    setGroupVisibilities: React.Dispatch<React.SetStateAction<Visibility[]>>
}>({
    selected: undefined,
    setSelected: () => {},
    selectedIndex: 0,
    setSelectedIndex: () => {},
    isProject: true, // TODO: This state doesn't need to exist; use a render function on projects and tools (yucky OOP)
    setIsProject: () => {},
    scrollSinceSelection: false,
    setScrollSinceSelection: () => {},
    setPreviousSelected: () => {},
    setIsPreviousProject: () => {},
    groupVisibilities: [],
    setGroupVisibilities: () => {}
})
