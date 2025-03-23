import { Project } from "../typescript/project_card_info"

/**
 * Also serves as intro card (When no projects are selected)
 */
export function ProjectCard({ project }: Readonly<{ project: Project | null }>) {
    const common_css = 'absolute border-2 border-red-600'
    return project ? (
        <div className={`top-1/2 left-1/4 ${common_css}`}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <ul>
                {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                ))}
            </ul>
        </div>
    ) : (
        <div className={`top-1/4 left-1/4 ${common_css}`}>eweewewe</div>
    )
}