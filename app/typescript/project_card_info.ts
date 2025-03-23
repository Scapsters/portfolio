export type Project = {
    name: string
    description: string[]
    technologies: string[]
    image?: string
    imageDimensions?: { width: number, height: number }
    github?: string
    demo?: string
}

export const projects: { [index: string]: Project } = {
    'furryslop.com': {
        name: 'furryslop.com',
        description: [
            "Self-hosted Twitter Media Viewer. Created as an effective way to view my large catalog of liked posts. I have about 6000 liked posts on twitter, but since they are sorted by time, I'd never be able to scroll all the way to them all. But with an external web scraper, I was able to get the back-end tweet data for every post and put them in a database. Right now there's only random access, but it's not far off to be able to search by artist, etc.",
            "Also supports copy/pasting links, the back/forward arrows, and discord embedding! (And possibly other sites). Right now it runs locally on my computer, but I'm actively porting it to AWS, and then from there I'll port it to RIT NextHop's servers. This has been a great exercise for me in web development and web infrastructure."
        ],
        technologies: ['React', 'TypeScript', 'Express.js', 'PostgreSQL'],
        image: '/furrysloppreview.png',
        imageDimensions: { width: 2401, height: 132 },
    },
    'JSThread': {
        name: 'JSThread: Java-style threading in Node.js',
        description: ['flint and steel'],
        technologies: ['Typescript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    'YoLink Center': {
        name: 'YoLink Center: Communication with commercial IoT devices',
        description: ['charlie oh nooooo not the poisonous fugu fish'],
        technologies: ['Python', 'Flask', 'MySQL'],
    },
}