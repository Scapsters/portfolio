export type Project = {
    name: string
    description: string
    technologies: string[]
    image?: URL
    github?: URL
    demo?: URL
}

export const projects: { [index: string]: Project } = {
    'Project 1': {
        name: 'Project 1',
        description: 'nooo charlie its a magical leoploradon',
        technologies: ['React', 'TypeScript'],
    },
    'Project 222222222222222': {
        name: 'flint and steel',
        description: 'flint and steel',
        technologies: ['React', 'TypeScript'],
    },
    'Project 3': {
        name: 'Project 3',
        description: 'charlie oh nooooo not the poisonous fugu fish',
        technologies: ['React', 'TypeScript'],
    },
}