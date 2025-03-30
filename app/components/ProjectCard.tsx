import { Project, projects, Tool, tools } from '../typescript/project_card_info'
import { lexendExa, lexendGiga, lexendPeta } from '../typescript/css_constants'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { SetStateAction, useRef } from 'react'

/**
 * Also serves as intro card (When no projects are selected)
 */
export function ProjectCard({
    selected,
    setSelected,
    setIsProject,
    isProject,
}: Readonly<{
    selected: Project | Tool | null
    setSelected: React.Dispatch<SetStateAction<Project | Tool | null>>
    setIsProject: React.Dispatch<SetStateAction<boolean>>
    isProject: boolean
}>) {
    const galleryRef = useRef<ImageGallery>(null)

    if (selected) {
        if (isProject) {
            const project = selected as Project
            return (
                <div className={`absolute z-2 top-40 left-1/30 h-3/4 w-2/3 `}>
                    <div className="flex">
                        {project.demo ? (
                            <>
                                <a
                                    className="flex hover:underline text-blue-500 "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.demo}
                                >
                                    View Live Project
                                </a>{' '}
                                <span className="mx-4">|</span>
                            </>
                        ) : (
                            <></>
                        )}
                        {project.github ? (
                            <>
                                <a
                                    className="flex hover:underline text-blue-500 "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.github}
                                >
                                    GitHub
                                </a>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                        {project.date ? (
                            <>
                                <p className="grow text-right justify-end">{project.date}</p>{' '}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <p style={lexendGiga.style} className="pb-1 border-b-3 text-4xl">
                        {project.name}
                    </p>
                    <div className="overflow-y-auto h-1/1">
                        <div className="w-1/1 p-4 rounded-b-xl bg-orange-100">
                            {project.description.map((description) => (
                                <p className="m-4" key={description}>
                                    {description}
                                </p>
                            ))}
                            <p className="text-xl m-4"> Features </p>
                            <div>
                                {project.features?.map((feature) => (
                                    <p className="m-2" key={feature}>
                                        {' '}
                                        - {feature}{' '}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="flex w-1/1">
                            <div className="w-2/3 p-4 mt-4 mr-2 rounded-xl bg-orange-100">
                                {project.image ? (
                                    <ImageGallery
                                        ref={galleryRef}
                                        showPlayButton={false}
                                        onMouseOver={() => galleryRef.current?.pause()}
                                        onMouseLeave={() => galleryRef.current?.play()}
                                        autoPlay={true}
                                        slideInterval={4000}
                                        items={project.image}
                                    />
                                ) : null}
                            </div>
                            <ul className="grow rounded-xl p-4 pr-8 mt-4 ml-2 bg-orange-100">
                                <p className="text-3xl p-2 text-[var(--foreground)]">Tech Stack</p>
                                {project.technologies.map((technology) =>
                                    tools[technology] ? (
                                        <button
                                            key={technology + 'container'}
                                            className="flex text-2xl m-2 bg-orange-200/40 hover:bg-orange-200 rounded-xl w-full duration-200 text-right items-center p-2"
                                            onClick={() => {
                                                setIsProject(false)
                                                setSelected(tools[technology])
                                            }}
                                        >
                                            <div className="flex justify-center">
                                                {/*TODO: remove */
                                                /* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    key={technology + ' logo'}
                                                    alt={technology}
                                                    src={'/logos/' + technology.replace('.', '').toLowerCase() + '.png'}
                                                    className={'h-13 aspect-auto'}
                                                />
                                            </div>
                                            <li className="grow" key={technology}>
                                                {technology} ↗
                                            </li>
                                        </button>
                                    ) : (
                                        <button
                                            key={technology + ' container'}
                                            className="flex text-2xl rounded-xl w-full duration-200 text-right items-center p-4"
                                        >
                                            <div className="flex justify-center">
                                                {/*TODO: remove */
                                                /* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    key={technology + ' logo'}
                                                    alt={technology}
                                                    src={'/logos/' + technology.replace('.', '').toLowerCase() + '.png'}
                                                    className={'h-13 aspect-auto'}
                                                />
                                            </div>
                                            <li className="grow" key={technology}>
                                                {technology}
                                            </li>
                                        </button>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            const tool = selected as Tool
            return (
                <div className={`absolute z-2 top-40 left-1/30 h-3/4 w-2/3 `}>
                    <div className="flex items-end gap-10 border-b-3">
                        <p style={lexendGiga.style} className="pb-1 text-4xl">
                            {tool.name}
                        </p>
                        <div className="flex flex-col-reverse h-12 items-center justify-evenly">
                            <p> Proficiency: {tool.proficiency} </p>
                            {tool.usedOften ? (
                                <p className="bold bg-amber-200 pr-1 pl-1 rounded-md self-start">Used Often!</p>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className="overflow-y-auto h-1/1">
                        <div className="w-1/1 p-4 rounded-b-xl bg-orange-100">
                            {tool.notes.map((note) => (
                                <p className="p-2 pt-4 pb-4" key={note}>{note}</p>
                            ))}
                            {tool.projects.length > 0 ? <p className="text-3xl m-4"> Used in: </p> : <></>}
                            <div className="">
                                {tool.projects?.map((project) =>
                                    projects[project] ? (
                                        <button
                                            className="m-2 p-4 text-xl block hover:underline bg-orange-200/40 hover:bg-orange-200 duration-200 rounded-xl"
                                            key={project}
                                            onClick={() => {
                                                setIsProject(true)
                                                setSelected(projects[project])
                                            }}
                                        >
                                            <span className="text-2xl">↗</span> {projects[project].name}
                                        </button>
                                    ) : (
                                        <button
                                            className="m-2 p-4 text-xl block   duration-200 rounded-xl"
                                            key={project}
                                        >
                                            - {project}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={`top-1/3 left-1/7 absolute`}>
                <p style={lexendPeta.style} className="text-5xl mb-4">
                    Welcome <span className="text-2xl">to</span>
                </p>
                <p style={lexendGiga.style} className="text-2xl mb-4">
                    Scott Happy&apos;s Portfolio
                </p>
                <p style={lexendExa.style} className="text-l mb-2">
                    Yes, that&apos;s my name [:
                </p>
            </div>
        )
    }
}
