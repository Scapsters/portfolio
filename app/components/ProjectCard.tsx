import { Project } from '../typescript/project_card_info'
import { lexendExa, lexendGiga, lexendPeta } from '../typescript/css_constants'
import Image from 'next/image'

/**
 * Also serves as intro card (When no projects are selected)
 */
export function ProjectCard({ project }: Readonly<{ project: Project | null }>) {
    const common_css = 'absolute'
    return project ? (
        <div className={`z-2 top-50 left-30 w-2/3 ${common_css}`}>
            <p style={lexendGiga.style} className="text-4xl mb-4">
                {project.name}
            </p>
            <div className="bg-amber-600/10 w-1/1 p-4 m-2">
                {project.description.map((description) => (
                    <p className="m-4" key={description}>
                        {description}
                    </p>
                ))}
            </div>
            <div className="flex bg-amber-600/10 p-4 w-1/1 m-2">
                <div className="bg-amber-600/10 w-2/3 m-2">
                    {project.image ? (
                        <Image
                            alt="project images"
                            src={project.image.url}
                            width={project.image.width}
                            height={project.image.height}
                        />
                    ) : null}
                </div>
                <ul className="bg-amber-600/10 p-4 m-2 grow">
                    <p className="text-2xl text-[var(--foreground)]">Tech Stack</p>
                    {project.technologies.map((technology) => (
                        <div key={technology + ' container'} className="flex items-center">
                            {/*TODO: remove */
                            /* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={technology + ' logo'}
                                alt={technology}
                                src={'/logos/' + technology.replace('.', '') + '.png'}
                                className={'w-10 h-10'}
                            />
                            <li key={technology}>{technology}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <div className={`top-1/3 left-1/7 ${common_css}`}>
            <p style={lexendPeta.style} className="text-6xl mb-4">
                Welcome <span className="text-4xl">to</span>
            </p>
            <p style={lexendGiga.style} className="text-3xl mb-4">
                Scott Happy&apos;s Portfolio
            </p>
            <p style={lexendExa.style} className="text-xl mb-2">
                Yes, that&apos;s my name [:
            </p>
        </div>
    )
}
