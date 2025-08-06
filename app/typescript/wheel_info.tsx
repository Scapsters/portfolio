// Items in raw_items that match an item in headers will be displayed as a header on the wheel.

export type ToolData = ItemData & {
    proficiency: string
    usedOften?: boolean
    projects: string[]
}
export type ProjectData = ItemData & {
    description: string[]
    technologies: string[]
    date: string
    features?: string[]
    image?: { original: string }[]
    github?: string
    demo?: string
}
export type ItemData = {
    key_name: string
    name: string
    notes: string[]
    category: Class
}
export type PlacedItemData = ItemData & {
    category: Category
    category: Class
    wheelIndex: number
}

export type Category = { 
    name: string
    placedItems: PlacedItemData[]
}
export type Class = { color: string }
export type ItemGroup = Category & { index:  number }

const TypeScript: ToolData = {
    key_name: 'TypeScript', name: 'TypeScript', proficiency: 'Advanced', usedOften: true, 
    projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: [
        'I\'ve had several months of professional TypeScript experience and it is my go-to language for personal projects.'
    ]
}

const JavaTool: ToolData = {
    key_name: 'Java', name: 'Java', proficiency: 'Advanced', usedOften: true,
    projects: ['NutriApp', 'Bowling App Refactor'], notes: []
}

const PythonTool: ToolData = {
    key_name: 'Python', name: 'Python', proficiency: 'Intermediate',
    projects: ['YoLink Center', 'Chat App'], notes: [
        'I\'ve had several months of working with python professionally, with my experience lying in a couple key regions.', 
        '- Pytest, where I am comfortable managing contexts and mocks in order to mock external apis, internal apis, and databases.',
        '- Typing with Pyright, where I have handled complex decorator signatures to ensure type safety',
    ]
}

const CSSTool: ToolData = {
    key_name: 'CSS', name: 'CSS', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'Portfolio'], notes: []
}

const HTMLTool: ToolData = {
    key_name: 'HTML', name: 'HTML', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: []
}

const ReactTool: ToolData = {
    key_name: 'React', name: 'React', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack', 'Portfolio', 'Chess App'], notes: []
}

const Tailwind: ToolData = {
    key_name: 'Tailwind', name: 'Tailwind', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack', 'JSThread', 'Portfolio'], notes: [],
}

const Nextjs: ToolData = {
    key_name: 'Next.js', name: 'Next.js', proficiency: 'Novice',
    projects: ['Portfolio'], notes: [],
}

const BootstrapTool: ToolData = {
    key_name: 'Bootstrap', name: 'Bootstrap', proficiency: 'Novice',
    projects: ['Nightclub Tracker'], notes: [],
}

const ExpressjsTool: ToolData = {
    key_name: 'Express.js', name: 'Express.js', proficiency: 'Intermediate', usedOften: true,
    projects: ['ScrapStack'], notes: ['I\'ve leveraged Expressjs as a nginx substitute, creating a reverse proxy to divert traffic to multiple locally hosted services.']
}

const AWSTool: ToolData = {
    key_name: 'AWS', name: 'AWS', proficiency: 'Novice',
    projects: ['Portfolio'], notes: []
}

const AWSConsoleTool: ToolData = {
    key_name: 'AWS Console', name: 'AWS Console', proficiency: 'Novice',
    projects: [], notes: []
}

const AmplifyTool: ToolData = {
    key_name: 'Amplify', name: 'Amplify', proficiency: 'Novice',
    projects: ['Portfolio'], notes: ['I don\'t like Amplify.']
}

const TerraformTool: ToolData = {
    key_name: 'Terraform', name: 'Terraform', proficiency: 'Novice',
    projects: ['ScrapStack'], notes: [ 
        'With only scattered experience with Terraform, I am not an expert.',
        'Stil, I created a CLI to automate the editing of Terraform files. You provide a series of template files with blanks, put specially formatted markers in your code, and then run the CLI with whatever you want filled in the blanks. It could add new blocks or edit existing ones.', 
        'It saved not only a ton of time for myself, but also meant the other contributors on my project were able to use Terraform without any Terraform/cloud knowledge.'
    ]
}

const PostgreSQLTool: ToolData = {
    key_name: 'PostgreSQL', name: 'PostgreSQL', proficiency: 'Intermediate',
    projects: ['ScrapStack', 'Chat App'], notes: []
}

const MySQLTool: ToolData = {
    key_name: 'MySQL', name: 'MySQL', proficiency: 'Intermediate',
    projects: ['YoLink Center'], notes: []
}

const ScrumTool: ToolData = {
    key_name: 'Scrum', name: 'Scrum', proficiency: 'Intermediate',
    projects: [], notes: []
}

const DockerTool: ToolData = {
    key_name: 'Docker', name: 'Docker', proficiency: 'Novice',
    projects: ['NutriApp'], notes: []
}

const GitHubTool: ToolData = {
    key_name: 'GitHub', name: 'GitHub', proficiency: 'Intermediate', usedOften: true,
    projects: [], notes: []
}

const GitTool: ToolData = {
    key_name: 'Git', name: 'Git', proficiency: 'Intermediate', usedOften: true,
    projects: [], notes: ['I\'m proud of my profciency with Git! I\'ve heard its an undervalued skill, but like with a lot of things, it\'s worth getting to know.']
}

const FigmaTool: ToolData = {
    key_name: 'Figma', name: 'Figma', proficiency: 'Intermediate', usedOften: true,
    projects: ['Portfolio', 'DinDin'], notes: []
}

const DrawioTool: ToolData = {
    key_name: 'Draw.io', name: 'Draw.io', proficiency: 'Advanced', usedOften: true,
    projects: ['ScrapStack'], notes: []
}

const AppsScriptTool: ToolData = {
    key_name: 'Apps Script', name: 'Apps Script', proficiency: 'Intermediate',
    projects: [], notes: [
        'While not a conventional technology, I was introduced to spreadsheet scripting by Apps Script.',
        'I used it to create a visualizer for a mood tracker-style Sheet. It was mostly a fancy formatter, parsing words and numbers to decide what colors to shade cells with, but it was context aware, allowing it to shade in regions between two specifically formatted cells.'
    ]
}

const ScrapStack: ProjectData = {
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

const JSThread: ProjectData = {
    key_name: 'JSThread',
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
}

const YoLinkCenter: ProjectData = {
    key_name: 'YoLink Center',
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
}

const Portfolio: ProjectData = {
    key_name: 'Portfolio',
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
}

const DinDin: ProjectData = {
    key_name: 'DinDin',
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

let index = 0



enum Class {
    Projects,
    Laguages,
    Frameworks,
    Tools,
}

enum Category {
    Projects,
    Languages,
    Frameworks,
    Tools,
    Frontend,
    Cloud,
    Backend,
}

export const PortfolioData: 
    { [key in Category]: 
        { [key: string]: 
            PlacedItemData 
        }
    } = {
    [Category.Projects]: {
        ScrapStack     : { ...ScrapStack  , category: 'Projects', class:'Projects' },
        Portfolio      : { ...Portfolio   , category: 'Projects', class:'Projects' },
        JSThread       : { ...JSThread    , category: 'Projects', class:'Projects' },
        'YoLink Center': { ...YoLinkCenter, category: 'Projects', class:'Projects' },
        DinDin         : { ...DinDin      , category: 'Projects', class:'Projects' },
    },
    Frontend: {
        ScrapStack: { ...ScrapStack, category: 'Frontend', class:'Projects' },
        JSThread  : { ...JSThread  , category: 'Frontend', class:'Projects' },
        Portfolio : { ...Portfolio , category: 'Frontend', class:'Projects' },
        React     : { ...ReactTool , category: 'Frontend', class:'Frameworks' },
        Tailwind  : { ...Tailwind  , category: 'Frontend', class:'' },
        'Next.js' : { ...Nextjs    , category: 'Frontend', class:'' },
        Typescript: { ...TypeScript, category: 'Frontend', class:'' },
    },
    Cloud: {
        Portfolio : { ...Portfolio    , category: 'Cloud' },
        ScrapStack: { ...ScrapStack   , category: 'Cloud' },
        Amplify   : { ...AmplifyTool  , category: 'Cloud' },
        Terraform : { ...TerraformTool, category: 'Cloud' },
    },
    Languages: {
        TypeScript: { ...TypeScript, category: 'Languages' },
        Python    : { ...PythonTool, category: 'Languages' },
        Java      : { ...JavaTool  , category: 'Languages' },
    },
    Frameworks: {
        React       : { ...ReactTool    , category: 'Frameworks' },
        Tailwind    : { ...Tailwind     , category: 'Frameworks' },
        'Next.js'   : { ...Nextjs       , category: 'Frameworks' },
        'Express.js': { ...ExpressjsTool, category: 'Frameworks' },
    },
    Tools: {
        Amplify      : { ...AmplifyTool   , category: 'Tools' },
        Terraform    : { ...TerraformTool , category: 'Tools' },
        Git          : { ...GitTool       , category: 'Tools' },
        'Apps Script': { ...AppsScriptTool, category: 'Tools' },
    },
    
    Backend: {
        ScrapStack     : { ...ScrapStack  , category: 'Backend' },
        'YoLink Center': { ...YoLinkCenter, category: 'Backend' },
        Python         : { ...PythonTool  , category: 'Backend' },
    }
    
}

Object.values(PortfolioData).forEach(category => {
    Object.values(category).forEach(item => {
        item.index = index++;
    });
});

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

export function getItemColor(item: string) {
    if (Object.keys(PortfolioData.Projects).includes(item)) return 'oklch(0.5 0.2 240deg)'
    if (Object.keys(PortfolioData.Languages).includes(item)) return 'oklch(0.5 0.1 180deg)'
    if (Object.keys(PortfolioData.Frameworks).includes(item)) return 'oklch(0.55 0.1 300deg)'
    if (Object.keys(PortfolioData.Tools).includes(item)) return 'oklch(0.6 0.1 10deg)'
    //if (Object.keys(PortfolioData.Applications).includes(item)) return 'oklch(0.5 0.1 180deg)'
    return ''
}
