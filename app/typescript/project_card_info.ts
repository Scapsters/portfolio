export type Project = {
    name: string
    description: string
    technologies: string[]
    image?: URL
    github?: URL
    demo?: URL
}

export const projects: { [index: string]: Project } = {
    'furryslop.com': {
        name: 'furryslop.com',
        description: 'nooo charlie its a magical leoploradon',
        technologies: ['React', 'TypeScript', 'Express.js', 'PostgreSQL'],
    },
    'JSThread': {
        name: 'JSThread: Java-style threading in Node.js',
        description: 'flint and steel',
        technologies: ['Typescript', 'Node.js', 'Vite.js', 'Tailwind'],
    },
    'YoLink Center': {
        name: 'YoLink Center: Communication with commercial IoT devices',
        description: 'charlie oh nooooo not the poisonous fugu fish',
        technologies: ['Python', 'Flask', 'MySQL'],
    },
}