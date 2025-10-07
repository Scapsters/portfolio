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
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>,
    scrollSinceSelection?: React.RefObject<boolean>
    previousSelected: Project | Tool | null | undefined
    setPreviousSelected: React.Dispatch<React.SetStateAction<Project | Tool | null | undefined>>
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