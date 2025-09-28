
export type Tool = {
    id: string;
    name: string;
    proficiency: 'Novice' | 'Intermediate' | 'Advanced';
    notes: string[];
    projects: string[];
};

export type Project = {
    id: string;
    name: string;
    description: string[];
    technologies: string[];
    date: string;
    features?: string[];
    image?: { original: string }[];
    github?: string;
    demo?: string;
};

export const Projects = {
    ScrapStack: {
        id: 'ScrapStack',
        name: 'ScrapStack: Self-hosted Twitter Media Viewer',
        description: [
            'Created as a way to view my 6000 liked posts. Utilized a web scraper to collect back-end tweet data for every post and enter it into a database. Currently, only random images may be displayed.',
        ],
        features: [
            'Prefetching and prerendering for little to no lag',
            'Responsive UI based off user feedback',
            'Cross-site embeds using Twitter Card API',
            '(Partial) support for back/forward arrow navigation',
        ],
        technologies: ['React', 'TypeScript', 'Tailwind', 'Express.js', 'PostgreSQL'],
        date: 'December 2024 - Present',
        demo: 'https://ScrapStack.net',
        github: 'https://github.com/Scapsters/Furry-Slop',
        image: [
            { original: '/furryslop/preview.png' },
            { original: '/furryslop/componentuml.png' },
            { original: '/furryslop/sequence.png' },
        ],
    },
    JSThread: {
        id: 'JSThread',
        name: 'JSThread: Java-style threading in Node.js',
        description: [
            'Born out of curiosity, this is a recreation of Java multithreading inside of a single-threaded programming language. Design overview and documentation available in the demo.',
        ],
        features: [
            'Leverages web-workers with advanced communication to simulate synchronized blocks, keys, joins, etc.',
            'Built-in code editor (and output console) with examples to see it running yourself!',
            'Followed TSDoc specifications to create webpage with thorough documentation using TypeDoc'
        ],
        date: 'February 2025 - February 2025',
        github: 'https://github.com/Scapsters/swen_342_github',
        demo: 'https://scapsters.github.io/swen_342_github/JSThread/dist/',
        image: [{ original: '/jsthread/header.png' }, { original: '/jsthread/console.png' }],
        technologies: ['TypeScript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    YoLinkCenter: {
        id: 'YoLink Center',
        name: 'YoLink Center: Leveraging an IoT API',
        description: [
            "A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink's app.",
            'While I gained much experience in this python-based tech stack, this fledgling project is mostly incomplete and lacks a public demo.',
        ],
        features: [
            'Worked with experts from SoCore and Oracle to design an effective denormalized schema top optimize write speed',
        ],
        date: 'November 2024 - December 2024',
        github: 'https://github.com/Scapsters/YoLink',
        image: [{ original: '/yolink/sensors.png' }, { original: '/yolink/thsensors.png' }],
        technologies: ['Python', 'Flask', 'MySQL'],
    },
    Portfolio: {
        id: 'Portfolio',
        name: 'Portfolio',
        date: 'March 22, 2025 - March 30, 2025',
        description: [
            'My first time really challenging myself with how fast I could develop a unique app. Was rushed to prepare for an interview and made the core of the app in about a week over ~40 hours of work.',
            'I learned about tradeoffs with in development and sought to leverage the limited scope of the project to make incredibly efficient, if unsound, development decisions.',
            'Coming back after I\'ve refined the project, I do regret some of my choices. A particular pitfall was that I was unneccesarily reducing data, when I could\'ve been passing around the full representation the whole time.'
        ],
        features: ['Rigorously optimized physics-based side navigation bar', 'Wireframed in Figma for fast design prototyping', 'Hosted with AWS Amplify'],
        demo: 'https://scotthappy.com',
        github: 'https://github.com/Scapsters/portfolio',
        image: [{ original: '/portfolio/portfolio.png' }],
        technologies: ['Next.js', 'TypeScript', 'Tailwind', 'AWS', 'Amplify'],
    },
    DinDin: {
        id: 'DinDin',
        name: 'DinDin: Share Your Food With the World',
        date: 'January 2025 - May 2025',
        description: [
            'Semester-long group project designing a product\'s UX from the ground up. Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.',
        ],
        features: [
            '60+ Page design documentation sheet',
            'Appealing and user-friendly UI built in Figma',
            'Artifacts such as WAADs and HTA',
        ],
        image: [
            { original: '/dindin/main.png' },
            { original: '/dindin/profile.png' },
            { original: '/dindin/waad.png' },
            { original: '/dindin/themes.png' },
            { original: '/dindin/guidelines.png' },
            { original: '/dindin/tutorial.png' },
        ],
        technologies: ['Figma', 'Draw.io'],
    }
}

export const Tools: Record<string, Tool> = {
    TypeScript: {
        id: 'TypeScript', name: 'TypeScript', proficiency: 'Advanced',
        projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: [
            'I\'ve had several months of professional TypeScript experience and it is my go-to language for personal projects.'
        ]
    },
    Java: {
        id: 'Java', name: 'Java', proficiency: 'Advanced',
        projects: ['NutriApp', 'Bowling App Refactor'], notes: []
    },
    Python: {
        id: 'Python', name: 'Python', proficiency: 'Intermediate',
        projects: ['YoLink Center', 'Chat App'], notes: [
            'I\'ve had several months of working with python professionally, with my experience lying in a couple key regions.',
            '- Pytest, where I am comfortable managing contexts and mocks in order to mock external apis, internal apis, and databases.',
            '- Typing with Pyright, where I have handled complex decorator signatures to ensure type safety',
        ]
    },
    CSS: {
        id: 'CSS', name: 'CSS', proficiency: 'Intermediate',
        projects: ['ScrapStack', 'Portfolio'], notes: []
    },
    HTML: {
        id: 'HTML', name: 'HTML', proficiency: 'Intermediate',
        projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: []
    },
    React: {
        id: 'React', name: 'React', proficiency: 'Advanced',
        projects: ['ScrapStack', 'Portfolio', 'Chess App'], notes: []
    },
    Tailwind: {
        id: 'Tailwind', name: 'Tailwind', proficiency: 'Advanced',
        projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: [],
    },
    Nextjs: {
        id: 'Next.js', name: 'Next.js', proficiency: 'Novice',
        projects: ['Portfolio'], notes: [],
    },
    Bootstrap: {
        id: 'Bootstrap', name: 'Bootstrap', proficiency: 'Novice',
        projects: ['Nightclub Tracker'], notes: [],
    },
    Expressjs: {
        id: 'Express.js', name: 'Express.js', proficiency: 'Intermediate',
        projects: ['ScrapStack'], notes: ['I\'ve leveraged Expressjs as a nginx substitute, creating a reverse proxy to divert traffic to multiple locally hosted services.']
    },
    AWS: {
        id: 'AWS', name: 'AWS', proficiency: 'Novice',
        projects: ['Portfolio'], notes: []
    },
    AWSConsole: {
        id: 'AWS Console', name: 'AWS Console', proficiency: 'Novice',
        projects: [], notes: []
    },
    Amplify: {
        id: 'Amplify', name: 'Amplify', proficiency: 'Novice',
        projects: ['Portfolio'], notes: ['I don\'t like Amplify.']
    },
    Terraform: {
        id: 'Terraform', name: 'Terraform', proficiency: 'Novice',
        projects: ['ScrapStack'], notes: [
            'With only scattered experience with Terraform, I am not an expert.',
            'Stil, I created a CLI to automate the editing of Terraform files. You provide a series of template files with blanks, put specially formatted markers in your code, and then run the CLI with whatever you want filled in the blanks. It could add new blocks or edit existing ones.',
            'It saved not only a ton of time for myself, but also meant the other contributors on my project were able to use Terraform without any Terraform/cloud knowledge.'
        ]
    },
    PostgreSQL: {
        id: 'PostgreSQL', name: 'PostgreSQL', proficiency: 'Intermediate',
        projects: ['ScrapStack', 'Chat App'], notes: []
    },
    MySQL: {
        id: 'MySQL', name: 'MySQL', proficiency: 'Intermediate',
        projects: ['YoLink Center'], notes: []
    },
    Scrum: {
        id: 'Scrum', name: 'Scrum', proficiency: 'Intermediate',
        projects: [], notes: []
    },
    Docker: {
        id: 'Docker', name: 'Docker', proficiency: 'Novice',
        projects: ['NutriApp'], notes: []
    },
    GitHub: {
        id: 'GitHub', name: 'GitHub', proficiency: 'Intermediate',
        projects: [], notes: []
    },
    Git: {
        id: 'Git', name: 'Git', proficiency: 'Intermediate',
        projects: [], notes: ['I\'m proud of my profciency with Git! I\'ve heard its an undervalued skill, but like with a lot of things, it\'s worth getting to know.']
    },
    Figma: {
        id: 'Figma', name: 'Figma', proficiency: 'Intermediate',
        projects: ['Portfolio', 'DinDin'], notes: []
    },
    Drawio: {
        id: 'Draw.io', name: 'Draw.io', proficiency: 'Advanced',
        projects: ['ScrapStack'], notes: []
    },
    AppsScript: {
        id: 'Apps Script', name: 'Apps Script', proficiency: 'Intermediate',
        projects: [], notes: [
            'While not a conventional technology, I was introduced to spreadsheet scripting by Apps Script.',
            'I used it to create a visualizer for a mood tracker-style Sheet. It was mostly a fancy formatter, parsing words and numbers to decide what colors to shade cells with, but it was context aware, allowing it to shade in regions between two specifically formatted cells.'
        ]
    }
};
