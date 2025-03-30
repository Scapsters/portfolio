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

export type Tool = {
    key_name: string
    name: string
    notes: string
    proficiency: string
    usedOften: boolean
    projects: string[]
}

export const tools: { [index: string]: Tool } = {
    TypeScript: {
        key_name: 'TypeScript',
        name: 'TypeScript',
        notes: 'TypeScript is one of my favorite languages, due to its ubiquity, its first-class handling of functions, and I think Promises/callbacks are neat!',
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'JSThread', 'Portfolio'],
    },
    React: {
        key_name: 'React',
        name: 'React',
        notes: "I've been using React since high school, and I've gained great familiarity with state management. I enjoy how quick it is to develop with as opposed to certain frameworks (cough cough Angular).",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'Portfolio', 'Chess App'],
    },
    Tailwind: {
        key_name: 'Tailwind',
        name: 'Tailwind',
        notes: "Tailwind is a wonderful time saver for front-ends. While not the most clean way to do styling, it gets the job done. I'm familiar with Tailwind even in complex applications that require the usage of sibling states and CSS variables.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com', 'JSThread', 'Portfolio'],
    },
    'Next.js': {
        key_name: 'Next.js',
        name: 'Next.js',
        notes: "Next.js is a very theoretically intriguing app! To me, it's React if it was optimizable and had complex routing. While you can optimize it, it's not necessarily done for you. The more elegant handling of loading and alternate page states is really useful for cleaning up components, especially ones that have lots of loading. Though in practice, Next.js is harder to use than it looks. While this portfolio uses Next.js, it barely leverages it. But, since create-react-app is deprecated, maybe this is the new base React.",
        proficiency: 'Novice',
        usedOften: false,
        projects: ['Portfolio'],
    },
    Bootstrap: {
        key_name: 'Bootstrap',
        name: 'Bootstrap',
        notes: "Nothing special to say about Bootstrap. I admire the existence of a component package, but in my personal projects, I avoid them since they seem boring and I want to practice styling myself. I've gotten experience with them in classes, though.",
        proficiency: 'Novice',
        usedOften: false,
        projects: ['Nightclub Tracker'],
    },
    'Express.js': {
        key_name: 'Express.js',
        name: 'Express.js',
        notes: "Express.js is like React in that it's light, flexible, and saves me a ton of time. I use Express.js to set up all of my personal servers, proxy included. I'm familiar with static serving, as well as intercepting requests such as when a web scraper reaches my server. ",
        proficiency: 'Intermediate',
        usedOften: true,
        projects: ['furryslop.com', 'Personal Proxy'],
    },
    Java: {
        key_name: 'Java',
        name: 'Java',
        notes: "Java is pretty classic, and so I've obviously dealt with it a lot. I've spent my time with Java mainly working with types and data structures (JCF). As a language that heavily encourages object-oriented design, I've used Java to familiarize myself with subsystem design, including the Gang of Four patterns. I have a personal vendetta against runtime type erasure.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['NutriApp', 'Bowling App Refactor'],
    },
    Python: {
        key_name: 'Python',
        name: 'Python',
        notes: "To me, Python is JavaScript without the web. Even looser, even quicker to write. Due to its lack of functionality in web applications, my usage of it has been limited to mostly classes, though that hasn't stopped me from becoming familiar with Flask and database interaction.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['YoLink Center', 'Chat App'],
    },
    CSS: {
        key_name: 'CSS',
        name: 'CSS',
        notes: "As with HTML, CSS is a mess! CSS is fine. It is what it is. My preferences when using it are either flex or absolute, but of course in the 30% of cases where that doesn't cover my needs, I'll have to take a trip to the Mozilla Docs. I have light experience using SCSS and have done a decent amount with variables and keyframes.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['furryslop.com', 'Portfolio'],
    },
    HTML: {
        key_name: 'HTML',
        name: 'HTML',
        notes: "As with CSS, HTML is a mess! It's flexible, and whenever something doesn't work, I can add another div. Most of my experience with HTML is in .tsx or .jsx files, so naturally, I've ended up going a lot into dynamic HTML. Static sites are less common but still present in some of my projects.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['furryslop.com', 'JSThread', 'Portfolio'],
    },
    PostgreSQL: {
        key_name: 'PostgreSQL',
        name: 'PostgreSQL',
        notes: "Postgres has been my go-to database for personal projects. Though I haven't gone too far into its usage, my general understanding of most elementary concepts of databases gives me confidence that I can use any database for what I need.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['furryslop.com'],
    },
    AWS: {
        key_name: 'AWS',
        name: 'AWS',
        notes: "AWS has an ever so slightly steep learning curve. Despite this, I've made some good strides in understanding its usage and place in the internet. One place where I wanted to use it was in furryslop.com, but after finding out that my query-heavy application would cost me likely $15 a month, I decided that was a lot worse than free. I have spent some time with API Gateway, Route 53, DynamoDB, and of course Lambdas and S3.",
        proficiency: 'Novice',
        usedOften: false,
        projects: [],
    },
    Amplify: {
        key_name: 'Amplify',
        name: 'Amplify',
        notes: "While I am familiar with Amplify, I certainly dislike it. But, through the times I've struggled with it, I learned important lessons on using it, as well as formed strong opinions about what good documentation means. I've never seen worse documentation in any piece of technology, other than other tools from AWS. After finding out that Amazon recommends the usage of generative AI for learning Lex, I've decided that Amazon couldn't care less about its developers. Absolutely atrocious.",
        proficiency: 'Novice',
        usedOften: false,
        projects: [],
    },
    Terraform: {
        key_name: 'Terraform',
        name: 'Terraform',
        notes: "In my time with AWS, I looked into Terraform, as it seemed perfectly robust. Tools like CloudFormation were apparently terrible to use, and SDK, while providing some useful features, isn't as universal as I'd like it to be. I'm lightly familiar with its syntax, and most of my work with it has been to understand the conceptual steps of development when using it.",
        proficiency: 'Novice',
        usedOften: false,
        projects: [],
    },
    MySQL: {
        key_name: 'MySQL',
        name: 'MySQL',
        notes: 'MySQL and MySQL Workbench seem to be a more feature-complete version of PostgreSQL, but at the cost of added complexity. Defining a functionally identical table in both incurs a very different amount of effort. Though, I found the Workbench to be far more useful than PgAdmin, which makes me invested in learning more about it.',
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['YoLink Center'],
    },
    Scrum: {
        key_name: 'Scrum',
        name: 'Scrum',
        notes: "My knowledge about Scrum comes from practical experience in long-term group projects. Everything from backlog refinement to planning poker. I've heard that in practice, while teams may be assigned a methodology, they only have to pick a few of the things that help them the most. I believe that overusing a methodology is possible, and that a methodology is only as useful as the time it saves.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: [],
    },
    Agile: {
        key_name: 'Agile',
        name: 'Agile',
        notes: "Agile is a theoretically sound methodology. While I don't have extensive experience, I understand its principles and Agile can be adapted to fit a team's needs.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: [],
    },
    'VS Code': {
        key_name: 'VS Code',
        name: 'VS Code',
        notes: "VS Code has been my go-to IDE for about as long as I've coded, and I've become very familiar with its settings, its features, and many of its extensions. Of course, I've had some experience with other IDEs such as JetBrains and Vim, if you can consider Vim an IDE.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: [],
    },
    'Google Sheets': {
        key_name: 'Google Sheets',
        name: 'Google Sheets',
        notes: "Okay, Google Sheets sounds like it doesn't count, but, I believe my time with Apps Scripts has given me a unique perspective on the capabilities of Sheets. Even though conditional formatting and data validation are the best to use, some cases simply need more. The biggest project I used Apps Scripts for was a mood tracker, where I used a relatively complex script to parse cells and color them based on multiple criteria, as well as formatting large sections of cells based on my inputs.",
        proficiency: 'Intermediate',
        usedOften: false,
        projects: ['Mood Tracker'],
    },
    Docker: {
        key_name: 'Docker',
        name: 'Docker',
        notes: "Having used Docker for a couple of projects, it's a useful program. My team used Docker while working on NutriApp to run SonarLint to test code quality, security, and test coverage in our Java program. While I'm unfamiliar with its in-depth features, I believe that being able to containerize an application covers probably 80% of its functionality.",
        proficiency: 'Novice',
        usedOften: false,
        projects: ['NutriApp'],
    },
    'Git Bash': {
        key_name: 'Git Bash',
        name: 'Git Bash',
        notes: "Git Bash, along with the normal Windows cmd and PowerShell, are the main CLIs I'm familiar with. Git Bash is the one I know best for simple commands and scripting. It sees some use in just about every project I do.",
        proficiency: 'Novice',
        usedOften: false,
        projects: [],
    },
    'AWS Console': {
        key_name: 'AWS Console',
        name: 'AWS Console',
        notes: 'The AWS Console is a blessing and a curse. In my mind, IaC is the default, while the AWS Console is a wrapper on top of it. I think this is close to reality, as the "basis" for AWS is probably the CLI. This gives us the advantage of being shown every option we have available, but the disadvantage of there being no good way to organize it all, and so the AWS Console is chaos.',
        proficiency: 'Novice',
        usedOften: false,
        projects: [],
    },
    GitHub: {
        key_name: 'GitHub',
        name: 'GitHub',
        notes: "GitHub is of course the standard for public code repositories. While I have experience in GitLab due to our school preferring it, I'm familiar with more of GitHub's features such as GitHub pages, code reviews, and general settings.",
        proficiency: 'Intermediate',
        usedOften: true,
        projects: [],
    },
    Git: {
        key_name: 'Git',
        name: 'Git',
        notes: "Git is incredible. I have no clue how some people so long ago created this and it has lasted so long with so few updates. When it does update, it's just a more convenient usage of an existing command, it's insane. Of course, many version control tools were created a long time ago and this one survived because it worked. But regardless its wonderful, powerful, and dangerous. I have familiarty, but certainly not expertise, in some of the more complex parts of git, including upstream branches and rebasing. Trying to understand Git is as fun as it is difficult.",
        proficiency: 'Intermediate',
        usedOften: true,
        projects: [],
    },
    Figma: {
        key_name: 'Figma',
        name: 'Figma',
        notes: "Figma is a beautiful design app and is shockingly easy to use compared to most design or diagramming apps. It has an interesting effect where, through clicking enough, you can cycle through about four different states on an item. I respect the mileage they get out of the mouse. I've used Figma in multiple projects as both a sketchpad and to create deliverables, and have experience with working with Figma in a team, e.g. using page-defined variables, keeping consistent, and documenting work.",
        proficiency: 'Intermediate',
        usedOften: true,
        projects: ['Portfolio', 'DinDin'],
    },
    'Draw.io': {
        key_name: 'Draw.io',
        name: 'Draw.io',
        notes: "Draw.io is one of those 'powerful' applications that also end up being difficult to use. In practice, it has a steep learning curve. You generally have to learn the way Draw.io 'wants' you to do something, which, while annoying, makes for a quick experience once you know what you're doing. Personally, I love it. When selecting items there is a property table, which is a big ugly list of every variable of the object, and a text field or checkbox to edit it. The table has the answer to everything. I've used it to create complex UML-style diagrams for some of my projects, as well as countless times in class assignments to create mostly class and sequence diagrams.",
        proficiency: 'Advanced',
        usedOften: true,
        projects: ['furryslop.com'],
    },
}

export const projects: { [index: string]: Project } = {
    'furryslop.com': {
        key_name: 'furryslop.com',
        name: 'furryslop.com: Self-hosted Twitter Media Viewer',
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
        demo: 'https://furryslop.com',
        github: 'https://github.com/Scapsters/Furry-Slop',
        image: [
            { original: '/furryslop/preview.png' },
            { original: '/furryslop/componentuml.png' },
            { original: '/furryslop/sequence.png' },
        ],
    },
    JSThread: {
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
    },
    'YoLink Center': {
        key_name: 'YoLink Center',
        name: 'YoLink Center: Leveraging IoT API',
        description: [
            "A framework for interacting with YoLink IoT devices through their API. Enables users to read more data from their sensors than possible through YoLink's app.",
            'While I gained much experience in this python-based tech stack, this fledgling project is mostly incomplete and lacks a public demo (api keys are private).',
        ],
        features: [
            'Worked with experts from SoCore and Oracle to design an effective denormalized database for data storage',
        ],
        date: 'November 2024 - December 2024',
        github: 'https://github.com/Scapsters/YoLink',
        image: [{ original: '/yolink/sensors.png' }, { original: '/yolink/thsensors.png' }], //TODO:
        technologies: ['Python', 'Flask', 'MySQL'],
    },
    Portfolio: {
        key_name: 'Portfolio',
        name: 'Portfolio',
        date: 'March 22, 2025 - March 30, 2025',
        description: [
            'My first time really challenging myself with how fast I could develop a unique app. Was rushed to prepare for an interview and made this in about a week over ~40 hours of work.',
            'I learned about tradeoffs with in development and sought to leverage the limited scope of the project to make incredibly efficient, if unsound, development decisions.',
        ],
        features: ['Rigorously optimized physics-based side navigation bar', 'Wireframed in Figma to speed up initial design'],
        demo: 'https://scotthappy.com',
        github: 'https://github.com/Scapsters/portfolio',
        image: [{ original: '/portfolio/portfolio.png' }],
        technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    },
    DinDin: {
        key_name: 'DinDin',
        name: 'DinDin: Share Your Food With the World',
        date: 'January 2025 - May 2025',
        description: [
            'Semester-long group project designing a product from the ground up. Our product: A social media platform, but for food. Quickly share recipies with your friends and view engaging content from home chefs.',
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
    },
}
