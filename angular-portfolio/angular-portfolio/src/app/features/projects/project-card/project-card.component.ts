import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/services/projects.service';

@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="project-card" [attr.data-category]="project.category" (click)="onClick()">
        <div class="project-card-image" [style.background-image]="'url(' + project.image + ')'"></div>
        <div class="project-card-title"><h3>{{ project.title }}</h3></div>
    </div>
  `,
    styles: [`
    .project-card {
        position: absolute;
        width: 300px;
        height: 400px;
        background: linear-gradient(135deg, rgba(20, 20, 50, 0.9), rgba(30, 20, 60, 0.8));
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.3), 
                    0 0 50px rgba(0, 0, 0, 0.5);
        border: 2px solid var(--primary-color);
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;
        /* 3D transforms will be applied by parent */
    }

    .project-card:hover {
        border-color: var(--secondary-color);
        box-shadow: 0 0 35px rgba(0, 255, 255, 0.5), 
                    0 0 60px rgba(255, 0, 255, 0.3),
                    0 0 100px rgba(0, 0, 0, 0.6);
    }

    .project-card-image {
        width: 100%;
        height: 70%;
        background-size: cover;
        background-position: center;
        border-bottom: 2px solid var(--primary-color);
        transition: transform 0.5s ease, filter 0.5s ease;
        position: relative;
    }

    .project-card-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
        transition: opacity 0.5s ease;
    }

    .project-card:hover .project-card-image {
        transform: scale(1.1);
        filter: brightness(1.1) saturate(1.2);
    }

    .project-card:hover .project-card-image::after {
        opacity: 0.5;
    }

    .project-card-title {
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.9);
        padding: 1rem;
    }

    .project-card h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--primary-color);
        text-shadow: 0 0 15px rgba(0, 255, 255, 0.7), 0 0 25px rgba(0, 255, 255, 0.4);
        text-align: center;
        margin: 0;
        transition: all 0.3s ease;
    }

    .project-card:hover h3 {
        color: var(--secondary-color);
        text-shadow: 0 0 15px rgba(255, 0, 255, 0.7), 0 0 25px rgba(255, 0, 255, 0.4);
    }
  `]
})
export class ProjectCardComponent {
    @Input() project!: Project;
    @Output() cardClick = new EventEmitter<Project>();

    onClick() {
        this.cardClick.emit(this.project);
    }
}
