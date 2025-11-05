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
    return (<>
        <div className="flex h-full bg-white overflow-y-scroll pb-20">
            <div className="grow">
                <div className="w-full flex justify-end mt-20">
                    <Link 
                        className="
                            fixed
                            w-10 h-10 rounded-full 
                            flex items-center justify-center
                            hover:bg-black/10
                        "    
                        href="/blog"
                    >
                        <BiChevronLeft size={32} className="text-black"></BiChevronLeft>
                    </Link>
                </div>
            </div>
            <div className="
                grow
                flex flex-col items-center
            ">
                <article className="
                    py-20
                    prose
                    h-fit
                    text-black/80
                    prose-headings:text-black
                    prose-li:marker:text-black
                    dark:prose-invert
                ">
                    <Markdown>{getPostContent(postName)}</Markdown>
                </article>
                <div className="pb-20">
                    <Link 
                        className="
                            px-2 w-max h-10 
                            flex items-center justify-center
                            bg-foreground hover:bg-foreground/70
                            text-white
                        "    
                        href="/blog"
                    >
                        Back to Blog Home
                    </Link>
                </div>
            </div>
            <div className="grow"></div>
        </div>
    </>)
}
