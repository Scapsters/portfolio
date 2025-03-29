export type Project = {
    key_name: string,
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

export type Tool = {
    key_name: string
    name: string
    notes: string,
    proficiency: string,
    usedOften: boolean,
    projects: string[]
}

export const tools: { [index: string]: Tool } = {
    Typescript: {
        key_name: 'Typescript',
        name: 'Typescript',
        notes: 'Typescript is one of my favorite languages, due to its ubiquity, its first-class handling of functions, and I think Promises/callbacks are neat!',
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'JSThread', 'Portfolio']
    },
    React: {
        key_name: 'React',
        name: 'React',
        notes: "I've been using React since high school, and I've gained great familiarity with state management. I enjoy how quick it is to develop with, and as opposed to certain frameworks (cough cough Angular), I notice the speed gains quickly.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'Portfolio', 'Chess App']
    },
    Tailwind: {
        key_name: 'Tailwind',
        name: 'Tailwind',
        notes: "Tailwind is a wonderful time saver for front-ends. While not the nicest way to do styling, it gets the job done. I'm familiar with Tailwind even in complex applications that require the usage of sibling states and CSS variables.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'JSThread', 'Portfolio']
    },
    'Next.js': {
        key_name: 'Next.js',
        name: 'Next.js',
        notes: "Next.js is a very theoretically intriguing app! To me, it's React if it was optimizable and had complex routing. While you can optimize it, it's not necessarily done for you. The more elegant handling of loading and alternate page states is really useful for cleaning up components, especially ones that have lots of loading. Though in practice, Next.js is harder to use than it looks.",
        proficiency: 'Novice',
        usedOften: false,
        projects: ['Portfolio']
    },
    Bootstrap: {
        key_name: 'Bootstrap',
        name: 'Bootstrap',
        notes: "Nothing special to say about Bootstrap. I admire the existence of a component package, but in my personal projects, I avoid them since they seem boring. I've gotten experience with them in classes, though.",
        proficiency: 'Novice',
        usedOften: false,
        projects: ['Nightclub Tracker']
    },
    'Express.js': {
        key_name: 'Express.js',
        name: 'Express.js',
        notes: "Express.js is like React in that it's light, flexible, and saves me a ton of time. I use Express.js to set up all of my personal servers, proxy included. I'm familiar with static serving, as well as intercepting requests such as when a web scraper reaches my server.",
        proficiency: 'Intermediate',
        usedOften: true,
        projects: ['furryslop.com', 'Personal Proxy']
    }
};

export const projects: { [index: string]: Project } = {
    'furryslop.com': {
        key_name: 'furryslop.com',
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
        key_name: 'JSThread',
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
        key_name: 'YoLink Center',
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
        key_name: 'Portfolio',
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
        key_name: 'DinDin',
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
