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
        background: var(--card-background);
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        border: 1px solid var(--primary-color);
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;
        /* 3D transforms will be applied by parent */
    }

    .project-card-image {
        width: 100%;
        height: 70%;
        background-size: cover;
        background-position: center;
        border-bottom: 1px solid var(--primary-color);
        transition: transform 0.5s ease;
    }

    .project-card:hover .project-card-image {
        transform: scale(1.1);
    }

    .project-card-title {
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        padding: 1rem;
    }

    .project-card h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.2rem;
        color: var(--primary-color);
        text-shadow: var(--neon-glow-cyan);
        text-align: center;
        margin: 0;
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
