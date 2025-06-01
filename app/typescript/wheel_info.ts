// Items in raw_items that match an item in headers will be displayed as a header on the wheel.

// Languages: Proficient in Typescript, Java, Python, C#, C, CSS, HTML, Lua. Familiar with Rust, Go
// Frameworks: Proficient in React, Tailwind, Next.js, Bootstrap, Express.js. Familiar with AngularJS
// Tools: Proficient in Git, CLI, PostgreSQL, AWS, Amplify, Terraform, MySQL, Scrum, Agile
// Applications: Proficient in VS Code, Google Sheets, Docker, Git Bash, GitHub, AWS Console, Figma

export const projects = [
    'ScrapStack',
    'JSThread',
    'YoLink Center',
    'Portfolio',
    'DinDin',
]

export const languages = [
    'TypeScript',
    'Java',
    'Python',
    'CSS',
    'HTML',
]
export const frameworks = [
    'React',
    'Tailwind',
    'Next.js',
    'Bootstrap',
    'Express.js',
]
export const tools = [
    'Git',
    'PostgreSQL',
    'MySQL',
    'Scrum',
    'AWS',
    'Amplify',
    'Terraform',
]
export const applications = [
    'Figma',
    'Draw.io',
    'GitHub',
    'VS Code',
    'Google Sheets',
    'Docker',
    'Git Bash',
    'AWS Console',
]

export const raw_items = [
    'Projects',
    ...projects,
    '',
    'Frameworks',
    ...frameworks,
    '',
    'Languages',
    ...languages,
    '',
    'Tools',
    ...tools,
    '',
    'Applications',
    ...applications
]

export function getItemColor(item: string) {
    if (projects.includes(item)) return 'oklch(0.5 0.2 210deg)'
    if (languages.includes(item)) return 'oklch(0.5 0.1 240deg)'
    if (frameworks.includes(item)) return 'oklch(0.5 0.1 300deg)'
    if (tools.includes(item)) return 'oklch(0.5 0.1 60deg)'
    if (applications.includes(item)) return 'oklch(0.5 0.1 180deg)'
    return ''
}



export const headers = ['Projects', 'Languages', 'Frameworks', 'Tools', 'Applications']
