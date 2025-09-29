import { Projects, Tools, Project, Tool } from "./data";

export type { Project, Tool };

export type PortfolioItem = Project | Tool;

export enum Category {
    Projects = 'Projects',
    Languages = 'Languages',
    Frameworks = 'Frameworks',
    Tools = 'Tools',
    Frontend = 'Frontend',
    Cloud = 'Cloud',
    Backend = 'Backend',
}

export const PortfolioData: Record<Category, Record<string, PortfolioItem>> = {
    [Category.Projects]: {
        'Scrapstack': Projects.Scrapstack,
        'Portfolio': Projects.Portfolio,
        'JSThread': Projects.JSThread,
        'Scrapstack Beta': Projects.ScrapstackBeta,
        'YoLink Center': Projects.YoLinkCenter,
        'DinDin': Projects.DinDin,
    },
    [Category.Frontend]: {
        'Scrapstack': Projects.Scrapstack,
        'JSThread': Projects.JSThread,
        'Portfolio': Projects.Portfolio,
        'Scrapstack Beta': Projects.ScrapstackBeta,
        'React': Tools.React,
        'Tailwind': Tools.Tailwind,
        'Next.js': Tools.Nextjs,
        'TypeScript': Tools.TypeScript,
    },
    [Category.Cloud]: {
        'Scrapstack': Projects.Scrapstack,
        'Portfolio': Projects.Portfolio,
        'Amplify': Tools.Amplify,
        'Terraform': Tools.Terraform,
    },
    [Category.Languages]: {
        'TypeScript': Tools.TypeScript,
        'Python': Tools.Python,
        'Java': Tools.Java,
    },
    [Category.Frameworks]: {
        'React': Tools.React,
        'Tailwind': Tools.Tailwind,
        'Next.js': Tools.Nextjs,
        'Express.js': Tools.Expressjs,
    },
    [Category.Tools]: {
        'Amplify': Tools.Amplify,
        'Terraform': Tools.Terraform,
        'Git': Tools.Git,
        'Apps Script': Tools.AppsScript,
    },
    [Category.Backend]: {
        'Scrapstack Beta': Projects.ScrapstackBeta,
        'YoLink Center': Projects.YoLinkCenter,
        'Python': Tools.Python,
    },
};

export function getPortfolioItemCount(): { totalRenderedItems: number, categoryCount: number } {
    const categoryCount = Object.keys(PortfolioData).length;
    const totalRenderedItems = Object.values(PortfolioData).reduce((acc, category) => acc + Object.keys(category).length, 0);
    return { totalRenderedItems, categoryCount };
}

export function getItemColor(item: string) {
    for (const categoryName in PortfolioData) {
        const category = PortfolioData[categoryName as Category];
        if (Object.prototype.hasOwnProperty.call(category, item)) {
            switch (categoryName) {
                case Category.Projects:
                    return 'oklch(0.5 0.2 240deg)';
                case Category.Languages:
                    return 'oklch(0.5 0.1 180deg)';
                case Category.Frameworks:
                    return 'oklch(0.55 0.1 300deg)';
                case Category.Tools:
                    return 'oklch(0.6 0.1 10deg)';
            }
        }
    }
    return ''
}

export const all_items_with_gaps = Object.values(PortfolioData).flatMap(category => [ "", ...Object.keys(category), "" ] )