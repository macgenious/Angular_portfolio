import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Skill {
    name: string;
    proficiency: number;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
}

@Injectable({
    providedIn: 'root'
})
export class SkillsService {
    private skillsData: { [key: string]: Skill[] } = {
        'Languages': [
            { name: 'Python', proficiency: 90 },
            { name: 'JavaScript', proficiency: 85 },
            { name: 'Java', proficiency: 80 },
            { name: 'HTML/CSS', proficiency: 90 },
            { name: 'SQL', proficiency: 20 },
            { name: 'C++', proficiency: 10 }
        ],
        'Tools': [
            { name: 'Git', proficiency: 50 },
            { name: 'Statgraphics', proficiency: 75 },
            { name: 'VS Code', proficiency: 95 },
            { name: 'SciLab', proficiency: 60 },
            { name: 'Wolfram Mathematica', proficiency: 60 }
        ],
        'AI & ML': [
            { name: 'StableDifussion', proficiency: 50 },
            { name: 'Gemini', proficiency: 85 },
            { name: 'Claude', proficiency: 95 },
            { name: 'Deepseek', proficiency: 100 },
            { name: 'Generative AI', proficiency: 75 }
        ],
        'Hardware': [
            { name: 'Arduino', proficiency: 85 },
            { name: 'Raspberry Pi', proficiency: 80 },
            { name: 'Electronics', proficiency: 75 },
            { name: 'Sensors', proficiency: 80 },
            { name: 'IoT', proficiency: 70 },
        ]
    };

    constructor() { }

    getSkillsByCategory(category: string): Observable<Skill[]> {
        return of(this.skillsData[category] || []);
    }

    getAllCategories(): string[] {
        return Object.keys(this.skillsData);
    }
}
