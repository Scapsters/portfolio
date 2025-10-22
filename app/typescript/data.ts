
export type Item = {
    id: string
    name: string
    description: string[]
    links: string[]
    images?: string[]
    date?: string
    github?: string
    demo?: string
};

export const Projects: Record<string, Item> = {
    Scrapstack: {
        id: 'Scrapstack',
        name: 'Scrapstack',
        description: [
            'Cloud-based social media-like app providing users a way to effectively search, browse, and share their liked posts from other social media sites.',
            'This redesign revolved around user experience and extensibility, with a conventional infinite scroll layout and support for multiple feeds.',
        ],
        links: ['React', 'TypeScript', 'Tailwind', 'tRPC', 'Tanstack Query', 'MongoDB Atlas', 'Terraform', 'Cloudflare Wrangler', 'Cloudflare Workers', 'AWS Lambda'],
        date: 'July 2025 - Present',
        images: ['scrapstack/post.png', 'scrapstack/stacks.png', 'scrapstack/banner.png'],
        demo: 'https://scrapstack.net',
        github: 'https://github.com/Scapsters/ScrapStack',
    },
    ScrapstackBeta: {
        id: 'Scrapstack Beta',
        name: 'Scrapstack Beta',
        description: [
            'First version of a social media post viewer, with data from an third party web scraper. Displays random posts from my at-the-time 6000 liked posts on twitter.',
            'Formerly hosted on my local machine, but due to the newer version existing, this isnt live anymore.'
        ],
        links: ['React', 'TypeScript', 'Tailwind', 'Express.js', 'PostgreSQL'],
        date: 'December 2024 - June 2025',
        images: ['furryslop/componentuml.png', 'furryslop/sequence.png', 'furryslop/preview.png'],
        github: 'https://github.com/Scapsters/Furry-Slop',
    },
    JSThread: {
        id: 'JSThread',
        name: 'JSThread: Java-style threading in Node.js',
        description: [
            'This is a recreation of Java multithreading inside of a single-threaded programming language. Design overview and documentation available in the demo.',
        ],
        date: 'February 2025 - February 2025',
        github: 'https://github.com/Scapsters/swen_342_github',
        demo: 'https://scapsters.github.io/swen_342_github/JSThread/dist/',
        images: ['jsthread/console.png'],
        links: ['TypeScript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    YoLinkCenter: {
        id: 'YoLink Center',
        name: 'YoLink Center: Leveraging an IoT API',
        description: [
            "A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink's app.",
            'Featured standard CRUD endpoints and a denormalized database schema, with data analysis guidance given by multiple professional data analysts.',
        ],
        date: 'November 2024 - December 2024',
        images: ['yolink/sensors.png', 'yolink/thsensors.png'],
        github: 'https://github.com/Scapsters/YoLink',
        links: ['Python', 'Flask', 'MySQL'],
    },
    Portfolio: {
        id: 'Portfolio',
        name: 'Portfolio',
        date: 'March 22, 2025 - Present',
        description: [
            'Personalized developer portfolio for myself. Features a physics-bsaed scrollwheel that runs on its own frame cycle and manipulates the dom directly to optimize performance.',
            'This visuals-based site required in-depth knowledge regarding CSS, JS Animations, and React Effects and rendering.'
        ],
        demo: 'https://scotthappy.com',
        github: 'https://github.com/Scapsters/portfolio',
        images: ['portfolio/portfolio.png', 'portfolio/portfolio_10-2025.png'],
        links: ['Figma', 'Next.js', 'TypeScript', 'Tailwind', 'AWS', 'Amplify'],
    },
    DinDin: {
        id: 'DinDin',
        name: 'DinDin: Share Your Food With the World',
        date: 'January 2025 - May 2025',
        description: [
            'Semester-long group UX design project, including all sorts of design artifacts and feedback cycles.',
            'Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.',
        ],
        images: ["dindin/main.png", "dindin/profile.png", "dindin/waad.png"],
        links: ['Figma', 'Draw.io', 'Agile'],
    }
}

export const Tools: Record<string, Item> = {
    TypeScript: {
        id: 'TypeScript', name: 'TypeScript',
        links: ['Scrapstack', 'JSThread', 'Portfolio'], description: [
            'I\'ve had several months of professional TypeScript experience and it is my go-to language for personal projects.',
            "Experienced in component-based frontend frameworks and REST APIs, with experience with server and client routers.",
            'Well-versed in typing to aid in developer experience across the board, from API calls to object-oriented.'
        ]
    },
    Java: {
        id: 'Java', name: 'Java',
        links: ['NutriApp', 'RatFund', 'Bowling App Refactor'], description: [
            'I have experience using Java, Spring Boot, and Maven to create and maintain REST APIs.',
            'Nutriapp featured a heavy emphasis on code quality through design patterns with both a CLI and web-based frontend.',
            'RatFund included heavy Spring Boot usage to build out a CRUD API.'
        ]
    },
    Python: {
        id: 'Python', name: 'Python',
        links: ['YoLink Center', 'Chat App'], description: [
            'I\'ve had several months of working with python professionally, with my experience lying in a couple key regions.',
            'Pytest, where I am comfortable managing contexts and mocks in order to mock external apis, internal apis, and databases.',
            'Typing with Pyright, where I have handled complex decorator signatures and modified foundaitonal code to bring type safety to messy codebases.',
        ]
    },
    HTML: {
        id: 'HTML', name: 'HTML',
        links: ['Scrapstack', 'JSThread', 'Portfolio'], description: [
            'I have experience using plain HTML/JS/CSS apps, HTMX, JSQuery, and AJAX requests to develop and maintain basic HTML-based webpages.'
        ]
    },
    React: {
        id: 'React', name: 'React',
        description: [
            'A considerable amount of professional and personal experience with React has enabled me to build full-scale interactive apps.',
            'My expertise lies in not only maintaining but improving outdated and unstable codebases, integrating lessons from modern tools to non-invasively improve code quality and developer experience.'
        ],
        links: ['Scrapstack', 'Portfolio', 'Chess App'],
    },
    Tailwind: {
        id: 'Tailwind', name: 'Tailwind',
        links: ['Scrapstack', 'JSThread', 'Portfolio'], description: [
            'I have experience using Tailwind, CSS, and SCSS to effectively style web pages from tech demos to social media sites.'
        ],
    },
    Nextjs: {
        id: 'Next.js', name: 'Next.js',
        links: ['Portfolio'], description: [
            'While its usage can be debated, I used Next.js to develop this portfolio, gaining experience with more batteries-included routers.'
        ],
    },
    Expressjs: {
        id: 'Express.js', name: 'Express.js',
        links: ['Scrapstack'], description: [
            'I\'ve leveraged Express.js as a nginx substitute, creating a reverse proxy to divert traffic to my machine to multiple locally hosted services.',
            'Since then I\'ve gone the way of the cloud and don\'t use it much anymore.'
        ]
    },
    AWS: {
        id: 'AWS', name: 'AWS',
        links: ['Portfolio'], description: []
    },
    AWSConsole: {
        id: 'AWS Console', name: 'AWS Console',
        links: [], description: []
    },
    Amplify: {
        id: 'Amplify', name: 'Amplify',
        links: ['Portfolio'], description: ['I don\'t like Amplify.']
    },
    Terraform: {
        id: 'Terraform', name: 'Terraform',
        links: ['Scrapstack'], description: [
            'Terraform lends well to usage in multi-cloud scenarios. I have experience using Terraform alongside with Cloudflare Wrangler to provision AWS, Cloudflare, and MongoDB Atlas resources.',
        ]
    },
    PostgreSQL: {
        id: 'PostgreSQL', name: 'PostgreSQL',
        links: ['Scrapstack', 'Chat App'], description: []
    },
    MySQL: {
        id: 'MySQL', name: 'MySQL',
        links: ['YoLink Center'], description: []
    },
    Scrum: {
        id: 'Scrum', name: 'Scrum',
        links: [], description: []
    },
    Docker: {
        id: 'Docker', name: 'Docker',
        links: ['NutriApp'], description: []
    },
    GitHub: {
        id: 'GitHub', name: 'GitHub',
        links: [], description: []
    },
    Git: {
        id: 'Git', name: 'Git',
        links: [], description: [
            'There\'s far too much to know about Git for me to claim im good at it, but what I can say is that I can use Git to make my coworkers\' lives a lot easier through hunk/single-line commits.',
            'It\'s not always worth it to take the time to use Git nicely, but in team environments its usually preferrable.'
        ]
    },
    Figma: {
        id: 'Figma', name: 'Figma',
        links: ['Portfolio', 'DinDin', 'Scrapstack'], description: []
    },
    AppsScript: {
        id: 'Apps Script', name: 'Apps Script',
        links: [], description: [
            'While not a conventional technology, I was introduced to spreadsheet scripting by Apps Script.',
            'I used it to create a visualizer for a mood tracker-style Sheet. It was mostly a fancy formatter, parsing words and numbers to decide what colors to shade cells with, but it was context aware, allowing it to shade in regions between two specifically formatted cells in order to fill in gaps created by sleep.'
        ]
    }
};
