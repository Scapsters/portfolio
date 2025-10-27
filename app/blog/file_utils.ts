import fs from 'fs';
import path from 'path'

export function getPostFullFilenames() {
    return fs.readdirSync(path.join(process.cwd(), "app/blog/_posts"))
}

export function getPostShortFilenames() {
    return getPostFullFilenames().map(filename => filename.replace(/\.mdx$/, ""))
}

export function getPostContent(postName: string) {
    return fs.readFileSync(path.join(process.cwd(), "app/blog/_posts", postName + ".mdx")).toString()
}

const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
] as const

function matchToMonth(partialMonth: string) {
    const match = months.find(month => month.includes(partialMonth))
    if (!match) throw Error("\"" + partialMonth + "\" doesnt match any months")
    return months.indexOf(match)
}

/**
 * @param date - formatted like "Oct 4, 2024" or "Sept 10, 2005" 
 * @returns Date
 */
export function stringToDate(date: string) {
    const partialMonth = date.split(" ")[0]
    const day = date.split(" ")[1].replace(",", "")
    const year = date.split(",")[1].replace(" ", "")
    return new Date(parseInt(year), matchToMonth(partialMonth), parseInt(day))
}