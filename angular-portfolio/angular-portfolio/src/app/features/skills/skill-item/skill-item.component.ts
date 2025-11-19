import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../core/services/skills.service';

@Component({
    selector: 'app-skill-item',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="skill-item" [style.animation-delay.ms]="animationDelay">
        <div class="skill-name">{{ skill.name }}</div>
        <div class="proficiency-bar-container">
            <div class="proficiency-bar" [style.width.%]="skill.proficiency"></div>
        </div>
        <div class="proficiency-text">{{ skill.proficiency }}%</div>
    </div>
  `,
    styles: [`
    .skill-item {
        display: flex;
        align-items: center;
        padding: 0.8rem 1rem;
        background-color: rgba(20, 20, 40, 0.4);
        border-radius: 6px;
        border-left: 3px solid var(--primary-color);
        transition: all 0.3s ease;
        margin-bottom: 0.8rem;
        opacity: 0;
        animation: slideIn 0.5s forwards;
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .skill-item:hover {
        background-color: rgba(30, 30, 60, 0.6);
        transform: translateX(5px);
    }

    .skill-name {
        flex-basis: 30%;
        min-width: 120px;
        font-weight: 500;
        color: var(--text-color);
        margin-right: 1rem;
    }

    .proficiency-bar-container {
        flex-grow: 1;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        overflow: hidden;
        margin-right: 1rem;
        position: relative;
    }

    .proficiency-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--secondary-color), var(--primary-color), var(--secondary-color), var(--primary-color));
        background-size: 300% 300%;
        border-radius: 8px;
        box-shadow: 0 0 8px var(--primary-color);
        animation: colorShift 8s infinite ease-in-out;
        transition: width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .proficiency-text {
        min-width: 40px;
        font-weight: 600;
        color: var(--primary-color);
        text-align: right;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .skill-item {
            flex-direction: column;
            align-items: flex-start;
        }
        .skill-name {
            margin-bottom: 0.5rem;
            width: 100%;
        }
        .proficiency-bar-container {
            width: 100%;
            margin-bottom: 0.5rem;
        }
        .proficiency-text {
            align-self: flex-end;
        }
    }
  `]
})
export class SkillItemComponent {
    @Input() skill!: Skill;
    @Input() animationDelay: number = 0;
}
