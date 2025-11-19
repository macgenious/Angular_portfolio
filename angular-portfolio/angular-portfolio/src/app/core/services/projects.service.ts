import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
    title: string;
    category: 'Python' | 'Java' | 'JavaScript' | 'Hardware' | 'AI';
    image: string;
    link: string;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private projects: Project[] = [
        {
            title: 'Pokedex python API',
            category: 'Python',
            image: 'assets/images/python.png',
            link: 'pokedex/index.html'
        },
        {
            title: 'Java Game',
            category: 'Java',
            image: 'assets/images/java.png',
            link: 'java/index.html'
        },
        {
            title: 'Personality book test',
            category: 'JavaScript',
            image: 'assets/images/javascript.png',
            link: 'https://llarjovecorresponsales.infinityfreeapp.com'
        },
        {
            title: 'Arduino car project',
            category: 'Hardware',
            image: 'assets/images/arduino.png',
            link: 'arduino/index.html'
        },
        {
            title: 'AI Chatbot Assistant',
            category: 'AI',
            image: 'assets/images/gemini.png',
            link: 'deepseek_api/index.html'
        }
    ];

    constructor() { }

    getProjects(): Observable<Project[]> {
        return of(this.projects);
    }
}
