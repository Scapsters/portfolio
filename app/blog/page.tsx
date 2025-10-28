import Link from "next/link"
import { getPostContent, getPostShortFilenames, stringToDate } from "./file_utils"

export default function BlogHome() {
    const postInfo = getPostShortFilenames()
        .map(name => {
            const content = getPostContent(name).split("\n")
            return {
                link: name,
                name: content[0].replace(/#/g, "").trim(),
                date: content[1].replace(/#/g, "").trim()
            }
        })
        .sort((a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime())
    return (
        <div className="
            flex justify-center pt-20 h-full
            dark:bg-foreground dark:text-background
        ">
            <div className="flex flex-col w-fit items-center">
                <p className="text-3xl pb-20">Blog Posts</p>
                {postInfo.map((info, index) =>
                    <>
                        <Link
                            href={"blog/" + info.link}
                            key={info.name}
                            className="
                                w-full px-5 py-10
                                text-left
                                hover:bg-black/10 dark:hover:bg-white/10
                            ">
                            <p className="text-xl">{info.name}</p>
                            <p>{info.date}</p>
                        </Link>
                        {index != postInfo.length - 1
                            && <div className="w-full h-[2px] bg-foreground dark:bg-background" />
                        }
                    </>
                )}
            </div>
        </div>
    )
}