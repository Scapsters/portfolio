import Markdown from 'react-markdown'
import { getPostContent, getPostShortFilenames } from "../file_utils"
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'

export async function generateStaticParams() {
    return getPostShortFilenames().map(filename => ({ slug: filename }))
}

export default async function Post({ params }:
    { params: Promise<{ postName: string }> }
) {
    const { postName } = await params
    return (
        <div className="flex dark:bg-foreground h-full">
            <div className="grow">
                <div className="w-full flex justify-end mt-20">
                    <Link 
                        className="
                            w-10 h-10 rounded-full 
                            flex items-center justify-center
                            hover:dark:bg-white/10 hover:bg-black/10
                        "    
                        href="/blog"
                    >
                        <BiChevronLeft size={32} className="text-foreground dark:text-background"></BiChevronLeft>
                    </Link>
                </div>
            </div>
            <div className="
                grow pt-20
                flex justify-center
            ">
                <article className="
                    prose
                    text-foreground dark:text-background
                    prose-li:marker:text-foreground prose-li:marker:dark:text-background
                    dark:prose-invert
                ">
                    <Markdown>{getPostContent(postName)}</Markdown>
                </article>
            </div>
            <div className="grow"></div>
        </div>
    )
}
