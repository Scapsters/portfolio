// Items in raw_items that match an item in headers will be displayed as a header on the wheel.

export type Tool = {
    key_name: string
    name: string
    notes: string[]
    proficiency: string
    usedOften?: boolean
    projects: string[]
}

export type Project = {
    key_name: string
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

const TypeScriptTool: Tool = {
    key_name: 'TypeScript', name: 'TypeScript', proficiency: 'Advanced', usedOften: true, 
    projects: ['ScrapStack', 'JSThread', 'Portfolio', 'Personal Proxy'], notes: []
}

const JavaTool: Tool = {
    key_name: 'Java', name: 'Java', proficiency: 'Advanced', usedOften: true,
    projects: ['NutriApp', 'Bowling App Refactor'], notes: []
}

const PythonTool: Tool = {
    key_name: 'Python', name: 'Python', proficiency: 'Intermediate',
    projects: ['YoLink Center', 'Chat App'], notes: []
}

const CSSTool: Tool = {
    key_name: 'CSS', name: 'CSS', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'Portfolio'], notes: []
}

const HTMLTool: Tool = {
    key_name: 'HTML', name: 'HTML', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: []
}

const ReactTool: Tool = {
    key_name: 'React', name: 'React', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack', 'Portfolio', 'Chess App'], notes: []
}

const TailwindTool: Tool = {
    key_name: 'Tailwind', name: 'Tailwind', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: [],
}

const NextjsTool: Tool = {
    key_name: 'Next.js', name: 'Next.js', proficiency: 'Novice',
    projects: ['Portfolio', 'Personal Proxy'], notes: [],
}

const BootstrapTool: Tool = {
    key_name: 'Bootstrap', name: 'Bootstrap', proficiency: 'Novice',
    projects: ['Nightclub Tracker'], notes: [],
}

const ExpressjsTool: Tool = {
    key_name: 'Express.js', name: 'Express.js', proficiency: 'Intermediate', usedOften: true,
    projects: ['ScrapStack', 'Personal Proxy'], notes: []
}

const AWSTool: Tool = {
    key_name: 'AWS', name: 'AWS', proficiency: 'Novice',
    projects: ['Portfolio'], notes: []
}

const AWSConsoleTool: Tool = {
    key_name: 'AWS Console', name: 'AWS Console', proficiency: 'Novice',
    projects: [], notes: []
}

const AmplifyTool: Tool = {
    key_name: 'Amplify', name: 'Amplify', proficiency: 'Novice',
    projects: ['Portfolio'], notes: []
}

const TerraformTool: Tool = {
    key_name: 'Terraform', name: 'Terraform', proficiency: 'Novice',
    projects: [], notes: []
}

const PostgreSQLTool: Tool = {
    key_name: 'PostgreSQL', name: 'PostgreSQL', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'Chat App'], notes: []
}

const MySQLTool: Tool = {
    key_name: 'MySQL', name: 'MySQL', proficiency: 'Intermediate',
    projects: ['YoLink Center'], notes: []
}

const ScrumTool: Tool = {
    key_name: 'Scrum', name: 'Scrum', proficiency: 'Intermediate',
    projects: [], notes: []
}

const DockerTool: Tool = {
    key_name: 'Docker', name: 'Docker', proficiency: 'Novice',
    projects: ['NutriApp'], notes: []
}

const GitHubTool: Tool = {
    key_name: 'GitHub', name: 'GitHub', proficiency: 'Intermediate', usedOften: true,
    projects: [], notes: []
}

const GitTool: Tool = {
    key_name: 'Git', name: 'Git', proficiency: 'Intermediate', usedOften: true,
    projects: [], notes: []
}

const FigmaTool: Tool = {
    key_name: 'Figma', name: 'Figma', proficiency: 'Intermediate', usedOften: true,
    projects: ['Portfolio', 'DinDin'], notes: []
}

const DrawioTool: Tool = {
    key_name: 'Draw.io', name: 'Draw.io', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack'], notes: []
}

const AppsScriptTool: Tool = {
    key_name: 'Apps Script', name: 'Apps Script', proficiency: 'Intermediate',
    projects: [], notes: []
}

const ScrapStackProject: Project = {
    key_name: 'ScrapStack',
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
}

const JSThreadProject: Project = {
    key_name: 'JSThread',
    name: 'JSThread: Java-style threading in Node.js',
    description: [
        'Born out of curiosity, this is a recreation of Java Threads inside of a single-threaded programming language. Design overview and documentation available in the demo.',
    ],
    features: [
        'Leverages web-workers with advanced communication to simulate synchronized blocks, keys, joins, etc.',
        'Built-in code editor (and color-coded output console) with examples to see it running yourself!',
        'Followed TSDoc specifications to create webpage with thorough documentation using TypeDoc'
    ],
    date: 'February 2025 - February 2025',
    github: 'https://github.com/Scapsters/swen_342_github',
    demo: 'https://scapsters.github.io/swen_342_github/JSThread/dist/',
    image: [{ original: '/jsthread/header.png' }, { original: '/jsthread/console.png' }],
    technologies: ['TypeScript', 'Node.js', 'Vite.js', 'Tailwind'],
}

const YoLinkCenterProject: Project = {
    key_name: 'YoLink Center',
    name: 'YoLink Center: Leveraging an IoT API',
    description: [
        "A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink's app.",
        'While I gained much experience in this python-based tech stack, this fledgling project is mostly incomplete and lacks a public demo (api keys are private).',
    ],
    features: [
        'Worked with experts from SoCore and Oracle to design an effective denormalized database for data storage',
    ],
    date: 'November 2024 - December 2024',
    github: 'https://github.com/Scapsters/YoLink',
    image: [{ original: '/yolink/sensors.png' }, { original: '/yolink/thsensors.png' }],
    technologies: ['Python', 'Flask', 'MySQL'],
}

const PortfolioProject: Project = {
    key_name: 'Portfolio',
    name: 'Portfolio',
    date: 'March 22, 2025 - March 30, 2025',
    description: [
        'My first time really challenging myself with how fast I could develop a unique app. Was rushed to prepare for an interview and made this in about a week over ~40 hours of work.',
        'I learned about tradeoffs with in development and sought to leverage the limited scope of the project to make incredibly efficient, if unsound, development decisions.',
    ],
    features: ['Rigorously optimized physics-based side navigation bar', 'Wireframed in Figma to speed up initial design', 'SSR hosted with AWS Amplify'],
    demo: 'https://scotthappy.com',
    github: 'https://github.com/Scapsters/portfolio',
    image: [{ original: '/portfolio/portfolio.png' }],
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'AWS', 'Amplify'],
}

const DinDinProject: Project = {
    key_name: 'DinDin',
    name: 'DinDin: Share Your Food With the World',
    date: 'January 2025 - May 2025',
    description: [
        'Semester-long group project designing a product\'s UX from the ground up. Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.',
        "Though this is a class project, it's been a unique experience to dive this far into what makes UX tick.",
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

export const PortfolioData = {
    Projects: {
        ScrapStack: ScrapStackProject,
        JSThread: JSThreadProject,
        'YoLink Center': YoLinkCenterProject,
        Portfolio: PortfolioProject,
        DinDin: DinDinProject,
    },
    //Tools: {
    Languages: {
        TypeScript: TypeScriptTool,
        Java: JavaTool,
        Python: PythonTool,
        HTML: HTMLTool,
        CSS: CSSTool,
    },
    Frameworks: {
        React: ReactTool,
        Tailwind: TailwindTool,
        'Next.js': NextjsTool,
        Bootstrap: BootstrapTool,
        'Express.js': ExpressjsTool,
    },
    Tools: {
        AWS: AWSTool,
        Amplify: AmplifyTool,
        Terraform: TerraformTool,
        Git: GitTool,
        'Apps Script': AppsScriptTool, 
        PostgreSQL: PostgreSQLTool,
        MySQL: MySQLTool,
    },
    Applications: {
        Docker: DockerTool,
        'AWS Console': AWSConsoleTool,
        GitHub: GitHubTool,
        Figma: FigmaTool,
        'Draw.io': DrawioTool,
        Scrum: ScrumTool,
    },
    Frontend: {
        ScrapStack: ScrapStackProject,
        JSThread: JSThreadProject,
        Portfolio: PortfolioProject,
        React: ReactTool,
        Tailwind: TailwindTool,
        'Next.js': NextjsTool,
        Bootstrap: BootstrapTool,
        Typescript: TypeScriptTool,
        HTML: HTMLTool,
        CSS: CSSTool,
    },
    Backend: {
        ScrapStack: ScrapStackProject,
        'YoLink Center': YoLinkCenterProject,
        Java: JavaTool,
        Python: PythonTool,
    },
    Database: {
        ScrapStack: ScrapStackProject,
        PostgreSQL: PostgreSQLTool,
        MySQL: MySQLTool,
        Docker: DockerTool
    },
    Cloud: {
        Portfolio: PortfolioProject,
        // ScrapStack: ScrapStackProject,
        // AWS: AWSTool,
        // Amplify: AmplifyTool,
        // Terraform: TerraformTool,
        // 'AWS Console': AWSConsoleTool,
    },
}
export const raw_items = Object.values(PortfolioData).flatMap(category => Object.keys(category))

export const all_items = Object.values(PortfolioData).flatMap(category => [ "", ...Object.keys(category) ] )

export const all_items_with_gaps = Object.values(PortfolioData).flatMap(category => [ "", ...Object.keys(category), "" ] )

export const raw_headers = [...Object.keys(PortfolioData)]

export function getItemIndex(key_name: string) {
    return raw_items.indexOf(key_name)
}

export function getIndexOfProjectInSection(key_name: string, category: string) {
    const section = PortfolioData[category as keyof typeof PortfolioData]
    if (!section) return -1
    const projects = Object.values(section).filter(item => 'key_name' in item && item.key_name === key_name)
    return projects.length > 0 ? all_items.indexOf(projects[0].key_name) : -1
}

export function getGroupIndexOfProject(key_name: string, category: string) {
}

export function getItemColor(item: string) {
    if (Object.keys(PortfolioData.Projects).includes(item)) return 'oklch(0.5 0.2 210deg)'
    if (Object.keys(PortfolioData.Languages).includes(item)) return 'oklch(0.5 0.1 240deg)'
    if (Object.keys(PortfolioData.Frameworks).includes(item)) return 'oklch(0.5 0.1 300deg)'
    if (Object.keys(PortfolioData.Tools).includes(item)) return 'oklch(0.5 0.1 60deg)'
    if (Object.keys(PortfolioData.Applications).includes(item)) return 'oklch(0.5 0.1 180deg)'
    return ''
}
