import { Project, projects, Tool } from '../typescript/project_card_info'
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
                <div className={`z-2 top-40 left-30 h-3/4 w-2/3 absolute`}>
                    <div className="flex">
                        {project.demo ? (
                            <>
                                <a className="hover:underline text-blue-500" href={project.demo}>
                                    View Live Project
                                </a>{' '}
                                <span className="mx-4">|</span>
                            </>
                        ) : (
                            <></>
                        )}
                        {project.github ? (
                            <>
                                <a className="hover:underline text-blue-500" href={project.github}>
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
                            <ul className="grow rounded-xl p-4 mt-4 ml-2 bg-orange-100">
                                <p className="text-3xl text-[var(--foreground)]">Tech Stack</p>
                                {project.technologies.map((technology) => (
                                    <div
                                        key={technology + ' container'}
                                        className="flex text-2xl text-right items-center m-4"
                                    >
                                        {/*TODO: remove */
                                        /* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            key={technology + ' logo'}
                                            alt={technology}
                                            src={'/logos/' + technology.replace('.', '').toLowerCase() + '.png'}
                                            className={'h-13 aspect-auto'}
                                        />
                                        <li className="grow" key={technology}>
                                            {technology}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            const tool = selected as Tool
            return (
                <div className={`z-2 top-40 left-30 h-3/4 w-2/3 absolute`}>
                    <div className="flex items-end gap-10 border-b-3">
                        <p style={lexendGiga.style} className="pb-1 text-4xl">
                            {tool.name}
                        </p>
                        <p> Proficiency: {tool.proficiency} </p>
                        {tool.usedOften ? <p className="bold">Used Often!</p> : <></>}
                    </div>

                    <div className="overflow-y-auto h-1/1">
                        <div className="w-1/1 p-4 rounded-b-xl bg-orange-100">
                            {tool.notes}
                            <p className="text-xl m-4"> Used in: </p>
                            <div className="">
                                {tool.projects?.map((project) => 
                                    projects[project] ? (
                                        <button
                                            className="m-2 block hover:underline"
                                            key={project}
                                            onClick={() => {
                                                setIsProject(true)
                                                setSelected(projects[project])
                                            }}
                                        >
                                            - {projects[project].name}
                                        </button>
                                    ) : (
                                        <p className="m-2 block" key={project}>
                                            - {project}
                                        </p>
                                    )
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
