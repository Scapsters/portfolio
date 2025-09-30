
export type Tool = {
    id: string;
    name: string;
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
    image?: string;
    github?: string;
    demo?: string;
};

export const Projects = {
    Scrapstack: {
        id: 'Scrapstack',
        name: 'Scrapstack',
        description: [
            'The second version of a social media post viewer, rebuilt entirely from the ground up, or should I say from the cloud up?',
            'This redesign revolved around user experience and extensibility, with a conventional infinite scroll layout and support for multiple feeds.',
        ],
        features: [
            'Hand-rolled virtualization and scroll restoration in an infinite scrolling context',
            'Propietary web scraper to retrieve posts',
            'Simple auth system to allow for frictionless user persistence',
        ],
        technologies: ['React', 'TypeScript', 'Tailwind', 'tRPC', 'Tanstack Query', 'MongoDB', 'Selenium', 'Terraform', 'Cloudflare Wrangler', 'Cloudflare Workers', 'AWS Lambda'],
        date: 'July 2025 - Present',
        demo: 'https://scrapstack.net',
        github: 'https://github.com/Scapsters/ScrapStack',
        image: '/scrapstack/banner.png'
    },
    ScrapstackBeta: {
        id: 'Scrapstack Beta',
        name: 'Scrapstack Beta',
        description: [
            'First version of a social media post viewer, with data from an third party web scraper. Displays random posts from my at-the-time 6000 liked posts on twitter.',
            'Formerly hosted on my local machine, but due to the newer version existing, this isnt live anymore.'
        ],
        features: [
            'Prefetching and prerendering for little to no lag',
            'Responsive UI based off user feedback',
            'Cross-site embeds using Twitter Card API',
        ],
        technologies: ['React', 'TypeScript', 'Tailwind', 'Express.js', 'PostgreSQL'],
        date: 'December 2024 - June 2025',
        github: 'https://github.com/Scapsters/Furry-Slop',
        image: '/furryslop/preview.png',
    },
    JSThread: {
        id: 'JSThread',
        name: 'JSThread: Java-style threading in Node.js',
        description: [
            'This is a recreation of Java multithreading inside of a single-threaded programming language. Design overview and documentation available in the demo.',
        ],
        features: [
            'Leverages web workers to simulate synchronized blocks, keys, joins, etc.',
            'Simple code editor (and output console) with examples to see it running yourself!',
        ],
        date: 'February 2025 - February 2025',
        github: 'https://github.com/Scapsters/swen_342_github',
        demo: 'https://scapsters.github.io/swen_342_github/JSThread/dist/',
        image: '/jsthread/console.png',
        technologies: ['TypeScript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    YoLinkCenter: {
        id: 'YoLink Center',
        name: 'YoLink Center: Leveraging an IoT API',
        description: [
            "A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink's app.",
            'While I gained much experience in this python-based tech stack, this project is mostly incomplete and lacks a public demo.',
        ],
        features: [
            'Worked with experts from SoCore and Oracle to design an effective denormalized schema to optimize write speed',
        ],
        date: 'November 2024 - December 2024',
        github: 'https://github.com/Scapsters/YoLink',
        image: '/yolink/sensors.png',
        technologies: ['Python', 'Flask', 'MySQL'],
    },
    Portfolio: {
        id: 'Portfolio',
        name: 'Portfolio',
        date: 'March 22, 2025 - Present',
        description: [
            'In rushing to complete this for a live demo, I learned important lessons on technical debt. Or more accurately, I learned those lessons afterwards. It was worth it!',
            'My biggest mistake here was using Next.js. There\'s practically no reason to do that for a static site like this. But, here I am.'
        ],
        features: ['Rigorously optimized physics-based side navigation bar', 'Wireframed in Figma for fast design prototyping'],
        demo: 'https://scotthappy.com',
        github: 'https://github.com/Scapsters/portfolio',
        image: '/portfolio/portfolio.png',
        technologies: ['Next.js', 'TypeScript', 'Tailwind', 'AWS', 'Amplify'],
    },
    DinDin: {
        id: 'DinDin',
        name: 'DinDin: Share Your Food With the World',
        date: 'January 2025 - May 2025',
        description: [
            'Semester-long group UX design project, including all sorts of design artifacts and feedback cycles.',
            'Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.',
        ],
        features: [
            '60+ Page design documentation sheet',
            'Appealing and user-friendly UI built in Figma',
            'Artifacts such as WAADs and HTA',
        ],
        image: '/dindin/main.png',
        technologies: ['Figma', 'Draw.io'],
    }
}

export const Tools: Record<string, Tool> = {
    TypeScript: {
        id: 'TypeScript', name: 'TypeScript',
        projects: ['Scrapstack', 'JSThread', 'Portfolio'], notes: [
            'I\'ve had several months of professional TypeScript experience and it is my go-to language for personal projects.',
            "Sometimes, when I write .toArray(), I close my eyes and imagine I'm using Java Streams. Just kidding who wants to imagine that."
        ]
    },
    Java: {
        id: 'Java', name: 'Java',
        projects: ['NutriApp', 'Bowling App Refactor'], notes: []
    },
    Python: {
        id: 'Python', name: 'Python',
        projects: ['YoLink Center', 'Chat App'], notes: [
            'I\'ve had several months of working with python professionally, with my experience lying in a couple key regions.',
            '- Pytest, where I am comfortable managing contexts and mocks in order to mock external apis, internal apis, and databases.',
            '- Typing with Pyright, where I have handled complex decorator signatures to ensure type safety',
        ]
    },
    CSS: {
        id: 'CSS', name: 'CSS',
        projects: ['Scrapstack', 'Portfolio'], notes: []
    },
    HTML: {
        id: 'HTML', name: 'HTML',
        projects: ['Scrapstack', 'JSThread', 'Portfolio'], notes: []
    },
    React: {
        id: 'React', name: 'React',
        notes: [
            "There's a lot to learn about React, but as of recently, there are two guiding principals that made improved my ability to use React:",
            " - Only split components when there is a meaningful chance of reuse",
            " - Think really hard any time you want to use a useEffect",
        ],
        projects: ['Scrapstack', 'Portfolio', 'Chess App'],
    },
    Tailwind: {
        id: 'Tailwind', name: 'Tailwind',
        projects: ['Scrapstack', 'JSThread', 'Portfolio'], notes: [],
    },
    Nextjs: {
        id: 'Next.js', name: 'Next.js',
        projects: ['Portfolio'], notes: [],
    },
    Bootstrap: {
        id: 'Bootstrap', name: 'Bootstrap',
        projects: ['Club Tracker'], notes: [],
    },
    Expressjs: {
        id: 'Express.js', name: 'Express.js',
        projects: ['Scrapstack'], notes: [
            'I\'ve leveraged Express.js as a nginx substitute, creating a reverse proxy to divert traffic to my machine to multiple locally hosted services.',
            'Since then I\'ve gone the way of the cloud and don\'t use it much anymore.'
        ]
    },
    AWS: {
        id: 'AWS', name: 'AWS',
        projects: ['Portfolio'], notes: []
    },
    AWSConsole: {
        id: 'AWS Console', name: 'AWS Console',
        projects: [], notes: []
    },
    Amplify: {
        id: 'Amplify', name: 'Amplify',
        projects: ['Portfolio'], notes: ['I don\'t like Amplify.']
    },
    Terraform: {
        id: 'Terraform', name: 'Terraform',
        projects: ['Scrapstack'], notes: [
            'A unique part of IaC is its ability to be automated.',
            'I created a CLI to automate the editing of Terraform files. You provide a series of template files with blanks, put specially formatted markers in your code, and then run the CLI with whatever you want filled in the blanks. It could add new blocks or edit existing ones.',
            'Granted, this was before I realized a "module" could be used multiple times, but it still saved me time when editing common files was unavoidable.',
            'Either way, it meant the other contributors on my project were able to use Terraform without any Terraform/cloud knowledge.'
        ]
    },
    PostgreSQL: {
        id: 'PostgreSQL', name: 'PostgreSQL',
        projects: ['Scrapstack', 'Chat App'], notes: []
    },
    MySQL: {
        id: 'MySQL', name: 'MySQL',
        projects: ['YoLink Center'], notes: []
    },
    Scrum: {
        id: 'Scrum', name: 'Scrum',
        projects: [], notes: []
    },
    Docker: {
        id: 'Docker', name: 'Docker',
        projects: ['NutriApp'], notes: []
    },
    GitHub: {
        id: 'GitHub', name: 'GitHub',
        projects: [], notes: []
    },
    Git: {
        id: 'Git', name: 'Git',
        projects: [], notes: [
            'There\'s far too much to know about Git for me to claim im good at it, but what I can say is that I can use Git to make my coworkers\' lives a lot easier through hunk/single-line commits.',
            'It\'s not always worth it to take the time to use Git nicely, but in team environments its usually preferrable.'
        ]
    },
    Figma: {
        id: 'Figma', name: 'Figma',
        projects: ['Portfolio', 'DinDin', 'Scrapstack'], notes: []
    },
    AppsScript: {
        id: 'Apps Script', name: 'Apps Script',
        projects: [], notes: [
            'While not a conventional technology, I was introduced to spreadsheet scripting by Apps Script.',
            'I used it to create a visualizer for a mood tracker-style Sheet. It was mostly a fancy formatter, parsing words and numbers to decide what colors to shade cells with, but it was context aware, allowing it to shade in regions between two specifically formatted cells in order to fill in gaps created by sleep.'
        ]
    }
};
