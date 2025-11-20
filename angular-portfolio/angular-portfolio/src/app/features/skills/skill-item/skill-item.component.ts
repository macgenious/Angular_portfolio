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
        padding: 1rem 1.2rem;
        background: linear-gradient(135deg, rgba(20, 20, 40, 0.6), rgba(30, 20, 50, 0.4));
        border-radius: 8px;
        border-left: 4px solid var(--primary-color);
        border-right: 1px solid rgba(0, 255, 255, 0.2);
        transition: all 0.3s ease;
        margin-bottom: 0.8rem;
        opacity: 0;
        animation: slideIn 0.6s forwards;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .skill-item:hover {
        background: linear-gradient(135deg, rgba(30, 30, 60, 0.7), rgba(40, 30, 60, 0.6));
        transform: translateX(8px);
        border-left-color: var(--secondary-color);
        box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3), -4px 0 15px rgba(255, 0, 255, 0.2);
    }

    .skill-name {
        flex-basis: 30%;
        min-width: 120px;
        font-weight: 600;
        color: var(--text-color);
        margin-right: 1rem;
        font-size: 1.05rem;
    }

    .proficiency-bar-container {
        flex-grow: 1;
        height: 22px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        overflow: hidden;
        margin-right: 1rem;
        position: relative;
        border: 1px solid rgba(0, 255, 255, 0.2);
    }

    .proficiency-bar {
        height: 100%;
        background: linear-gradient(90deg, 
            #ff00ff 0%, 
            #ff00cc 15%,
            #cc00ff 30%,
            #00ffff 50%,
            #00ccff 70%,
            #ff00ff 85%,
            #ff00ff 100%);
        background-size: 400% 400%;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.6), 
                    0 0 30px rgba(255, 0, 255, 0.4),
                    inset 0 0 10px rgba(255, 255, 255, 0.2);
        animation: colorShift 6s infinite ease-in-out;
        transition: width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        position: relative;
    }

    .proficiency-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent);
        border-radius: 10px 10px 0 0;
    }

    .proficiency-text {
        min-width: 45px;
        font-weight: 700;
        color: var(--primary-color);
        text-align: right;
        font-size: 1rem;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
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
