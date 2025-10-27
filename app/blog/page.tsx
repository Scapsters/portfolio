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
            <div className="flex flex-col w-fit items-center gap-10">
                <p className="text-3xl">Blog Posts</p>
                {postInfo.map(info =>
                    <Link
                        href={"blog/" + info.link}
                        key={info.name}
                        className="w-full text-left"
                    >
                        <p className="text-xl">{info.name}</p>
                        <p>{info.date}</p>
                    </Link>
                )}
            </div>
        </div>
    )
}