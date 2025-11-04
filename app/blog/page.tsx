import Link from "next/link"
import { getPostContent, getPostShortFilenames, stringToDate } from "./file_utils"
import { BiChevronLeft } from "react-icons/bi"

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
                        href="/"
                    >
                        <BiChevronLeft size={32} className="text-black"></BiChevronLeft>
                    </Link>
                </div>
            </div>
            <div className="
                grow
                flex flex-col items-center
            ">
                <div className="
                    flex justify-center pt-20 h-full w-full
                    bg-white
                ">
                    <div className="flex flex-col w-fit items-center">
                        <p className="text-3xl pb-20">Blog Posts</p>
                        {postInfo.map((info, index) =>
                            <div
                                className="flex flex-col w-full items-center"
                                key={info.name}
                            >
                                <Link
                                    href={"blog/" + info.link}
                                    className="
                                        w-full px-5 py-10
                                        text-left
                                        hover:bg-black/10
                                    "
                                >
                                    <p className="text-xl">{info.name}</p>
                                    <p>{info.date}</p>
                                </Link>
                                {index != postInfo.length - 1
                                    && <div className="w-full h-[2px] bg-black" />
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grow"></div>
        </div>
    </>)
}