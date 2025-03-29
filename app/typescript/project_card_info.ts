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
        description: [
            'A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink\'s app.',
            'While I gained much experience in this python-based tech stack, this fledgling project is mostly incomplete and lacks a public demo (api keys are private).'
        ],
        features: [
            'Worked with experts from SoCore and Oracle to design an effective denormalized database for data storage',
        ],
        date: 'November 2024 - December 2024',
        github: 'https://github.com/Scapsters/YoLink',
        image: [ { original: '/yolink/sensors.png' }, { original: '/yolink/thsensors.png' } ], //TODO:
        technologies: ['Python', 'Flask', 'MySQL'],
    },
    'Portfolio': {
        name: 'Portfolio',
        date: 'March 22, 2025 - March 28, 2025',
        description: [
            'My first time really challenging myself with how fast I could develop a unique app. Was rushed to prepare for an interview and made this in about a week over ~20 hours of work.',
            'I learned about tradeoffs with in development and sought to leverage the limited scope of the project to make incredibly efficient, if unsound, development decisions.'
        ],
        features: [
            'Rigorously optimized physics-based side nav',
            'Wireframed in Figma to speed up initial design'
        ],
        demo: 'https://scotthappy.com',
        github: "https://github.com/Scapsters/portfolio",
        image: [ { original: '/portfolio/portfolio.png'} ],
        technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    },
    'DinDin': {
        name: 'DinDin: Share Your Food With the World',
        date: 'January 2025 - May 2025',
        description: [
            "Semester-long group project designing a product from the ground up. Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.",
            "Though this is a class project, it's been a unique experience to dive this far into what makes UX tick."
        ],
        features: [
            '60+ Page design documentation sheet',
            'Appealing and user-friendly UI built in Figma',
            'Artifacts such as WAADs and HTA'
        ],
        image: [ { original: '/dindin/main.png'}, { original: '/dindin/profile.png'}, { original: '/dindin/waad.png'}, { original: '/dindin/themes.png'}, { original: '/dindin/guidelines.png'}, { original: '/dindin/tutorial.png'} ],
        technologies: [ 'Figma', 'Draw.io' ]
    }
}
