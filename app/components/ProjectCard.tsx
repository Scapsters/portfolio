import { Project } from '../typescript/project_card_info'
import { lexendExa, lexendGiga, lexendPeta } from '../typescript/css_constants'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

/**
 * Also serves as intro card (When no projects are selected)
 */
export function ProjectCard({ project }: Readonly<{ project: Project | null }>) {
    const common_css = 'absolute'
    return project ? (
        <div className={`z-2 top-40 left-30 w-2/3 ${common_css}`}>
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
                        <p className="grow text-right justify-end">
                            {project.date}
                        </p>{' '}
                    </>
                ) : (
                    <></>
                )}
            </div>
            <p style={lexendGiga.style} className="text-4xl mb-4">
                {project.name}
            </p>
            <div className="w-1/1 p-4 bg-amber-600/10">
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
                <div className="w-2/3 p-4 mt-4 mr-2 bg-amber-600/10 ">
                    {project.image ? <ImageGallery items={project.image} /> : null}
                </div>
                <ul className="grow p-4 mt-4 ml-2 bg-amber-600/10" >
                    <p className="text-3xl text-[var(--foreground)]">Tech Stack</p>
                    {project.technologies.map((technology) => (
                        <div key={technology + ' container'} className="flex text-2xl text-right items-center m-4">
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
    ) : (
        <div className={`top-1/3 left-1/7 ${common_css}`}>
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
