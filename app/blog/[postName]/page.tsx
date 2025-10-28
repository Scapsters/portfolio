import Markdown from 'react-markdown'
import { getPostContent, getPostShortFilenames } from "../file_utils"

export async function generateStaticParams() {
    return getPostShortFilenames().map(filename => ({ slug: filename }))
}

export default async function Post({ params }: 
    { params: Promise<{ postName: string }>}
) {
    const { postName } = await params
    return (
        <div className="
            w-screen h-full pt-20
            flex justify-center
            dark:bg-foreground
        ">
            <article className="
                prose
                text-background dark:text-foreground
                prose-li:marker:text-foreground prose-li:marker:dark:text-background
                dark:prose-invert
            ">
                <Markdown>{getPostContent(postName)}</Markdown>
            </article>
        </div>
    )
}
