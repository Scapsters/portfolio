
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
            'Twitter disabled public likes, causing a [minor outrage](https://www.reddit.com/r/OutOfTheLoop/comments/1dgl3ws/whats_going_on_with_the_miiverse_yeah_button/).',
            'For the small price of giving me your login cookie, a web scraper will put every post youve ever liked onto this website, to be searched, sorted, and randomized for your viewing pleasure.',
            'Currently, there are very few "users" and it exists largely because of my own desires to catalog art.'
        ],
        links: ['React', 'TypeScript', 'Tailwind', 'tRPC', 'Tanstack Query', 'MongoDB Atlas', 'Terraform', 'Cloudflare', 'AWS'],
        date: 'July 2025 - Present',
        images: ['scrapstack/post.png', 'scrapstack/stacks.png', 'scrapstack/banner.png'],
        demo: 'https://scrapstack.net',
        github: 'https://github.com/Scapsters/ScrapStack',
    },
    ScrapstackBeta: {
        id: 'Scrapstack Beta',
        name: 'Scrapstack Beta',
        description: [
            'Beta version of Scrapstack, which was file-based and ran on a server.',
            'It had a much different ui, where you click and instantly see the next image. While there are some UX problems to fix there, its far more whimsical than my current infinite scroll. One day, I\'ll change it to be more fun.',
        ],
        links: ['React', 'TypeScript', 'Tailwind', 'Express.js', 'PostgreSQL'],
        date: 'December 2024 - June 2025',
        images: ['furryslop/componentuml.png', 'furryslop/sequence.png', 'furryslop/preview.png'],
        github: 'https://github.com/Scapsters/Furry-Slop',
    },
    Choob: {
        id: 'Choob',
        name: 'Choob: An understanding-first Chess trainer',
        description: [
            'This chess trainer is a unique middle ground of current trainers, with added algorithms for more practical learning opportunities.',
            'It complements the Lichess Study feature; editing studies and getting in depth engine analysis is meant to happen on Lichess, not Choob.',
        ],
        links: ['Svelte', 'TypeScript', 'Tailwind', 'Azure'],
        date: 'June 2026 - Present',
        images: ['choob/ingame.png', 'choob/default.png', 'choob/phone.png'],
        demo: 'https://choobmoves.com',
        github: 'https://github.com/Scapsters/Choob',
    },
    JSThread: {
        id: 'JSThread',
        name: 'JSThread: Java-style threading in Node.js',
        description: [
            'This is a recreation of Java multithreading inside of a single-threaded programming language, done for a concurrent systems class. Design overview and documentation available in the demo.',
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
            'Featured standard CRUD endpoints and a denormalized database schema, with data analysis guidance given by multiple professional data analysts (my dad and his friend, who are genuinely data scientists and backend developers).',
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
            'Personalized developer portfolio for myself. Wheel was done from scratch, optimized for performance. Only behaves slightly differently on different framerates.',
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
        links: ['Scrapstack', 'JSThread', 'Portfolio', 'tRPC', 'Tanstack Query', 'Express.js', 'Chart.js', 'Colors.js'], description: [
            'I\'ve had several months of professional TypeScript experience and it is my go-to language for personal projects.',
            "Experienced in component-based frontend frameworks and REST APIs, with experience with server and client routers.",
            'Well-versed in typing to aid in developer experience across the board, from API calls to object-oriented.'
        ]
    },
    Java: {
        id: 'Java', name: 'Java',
        links: ['NutriApp', 'RatFund', 'Bowling App Refactor', 'Spring Boot', 'Maven'], description: [
            'I have experience using Java, Spring Boot, and Maven to create and maintain REST APIs.',
            'Nutriapp featured a heavy emphasis on code quality through design patterns with both a CLI and web-based frontend.',
            'RatFund included heavy Spring Boot usage to build out a CRUD API.'
        ]
    },
    Python: {
        id: 'Python', name: 'Python',
        links: ['YoLink Center', 'Chat App', 'Pytest', 'Pyright', 'SQLAlchemy', 'Flask'], description: [
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
    Svelte: {
        id: 'Svelte', name: "Svelte",
        description: [
            'Svelte is cool, it doesn\'t feel as robust as React, and its what I imagine a batteries-included framework would feel like. It\'s cool.',
            'But, don\'t try to teach this to someone as their first framework. If you\'re coming from React, it will go worse than you think.'
        ],
        links: ['Choob'],
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
        links: ['Portfolio', 'Scrapstack'], description: [
            'Proficient in serverless and server-based architecture, across services like Lambda, DocumentDB, EC2, S3, and API Gateway.',
            'Also experienced in multi-cloud DNS configuration through Route 53',
            'Also unfortunately experienced in Amplify.'
        ]
    },
    Cloudflare: {
        id: "Cloudflare", name: "Cloudflare",
        links: ['Scrapstack'], description: [
            'Proficient in serverless web-hosting architecture, including Workers and Pages.'
        ]
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
