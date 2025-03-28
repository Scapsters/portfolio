export type Project = {
    name: string
    description: string[]
    technologies: string[]
    date: string
    features?: string[]
    note?: string
    image?: { original: string }[]
    github?: string
    demo?: string
}

export const projects: { [index: string]: Project } = {
    'furryslop.com': {
        name: 'furryslop.com: Self-hosted Twitter Media Viewer',
        description: [
            "Created as a way to view my 6000 liked posts. Utilized a web scraper to collect back-end tweet data for every post and enter it into a database. Currently, only random images may be displayed.",
        ],
        features: [
            "Prefetching and prerendering for little to no lag",
            "Responsive UI based off user feedback",
            "Cross-site embeds using Twitter Card API",
            "(Partial) support for back/forward arrow navigation",
        ],
        technologies: ['React', 'TypeScript', 'Tailwind', 'Express.js', 'PostgreSQL' ],
        date: 'December 2024 - Present',
        demo: 'https://furryslop.com',
        github: 'https://github.com/Scapsters/Furry-Slop',
        image: [ { original:'/furryslop/preview.png' }, { original: '/furryslop/componentuml.png'}, { original: '/furryslop/sequence.png'} ],
    },
    JSThread: {
        name: 'JSThread: Java-style threading in Node.js',
        description: [
            "Born out of curiosity, this is a recreation of Java Threads inside of a single-threaded programming language. Design overview and documentation available in the demo."
        ],
        features: [
            'Leverages web-workers with advanced communication to simulate synchronized blocks, keys, joins, etc.',
            'Built-in code editor (and color-coded output console) with examples to see it running yourself!'
        ],
        date: 'February 2025 - February 2025',
        github: 'https://github.com/Scapsters/swen_342_github',
        demo: 'https://scapsters.github.io/swen_342_github/JSThread/dist/',
        image: [ { original: '/jsthread/header.png' }, { original: '/jsthread/console.png' } ],
        technologies: ['Typescript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    'YoLink Center': {
        name: 'YoLink Center: Leveraging IoT API',
        date: 'November 2024 - December 2024',
        description: ['charlie oh nooooo not the poisonous fugu fish'],
        technologies: ['Python', 'Flask', 'MySQL'],
    },
    'Portfolio': {
        name: 'Portfolio',
        date: 'March 22, 2025 - March 24, 2025',
        description: ['charlie oh nooooo not the poisonous fugu fish'],
        technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    }
}
