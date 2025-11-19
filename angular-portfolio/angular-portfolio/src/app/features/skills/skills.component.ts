import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService, Skill } from '../../core/services/skills.service';
import { SkillItemComponent } from './skill-item/skill-item.component';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, SkillItemComponent],
    template: `
    <section id="skills">
        <h2>SKILL<span class="neon-text-purple">MATRIX</span></h2>
        <p class="section-subtitle">A comprehensive overview of my technical abilities and proficiency levels.</p>
        <div class="skills-container">
            <div class="skill-categories">
                <h3>Skill Categories</h3>
                <div class="category-tabs">
                    <button *ngFor="let category of categories" 
                            class="category-btn" 
                            [class.active]="selectedCategory() === category"
                            (click)="selectCategory(category)">
                        {{ category }}
                    </button>
                </div>
            </div>
            <div class="proficiency-levels">
                <h3>Proficiency Levels</h3>
                <div class="skill-items-container">
                    <app-skill-item *ngFor="let skill of currentSkills(); let i = index" 
                                    [skill]="skill" 
                                    [animationDelay]="(i + 1) * 100">
                    </app-skill-item>
                </div>
            </div>
        </div>
    </section>
  `,
    styles: [`
    section {
        padding: 60px 5%;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    section h2 {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        letter-spacing: 2px;
        color: var(--primary-color);
        text-shadow: var(--neon-glow-cyan);
    }

    .neon-text-purple {
        color: var(--secondary-color);
        text-shadow: var(--neon-glow-magenta);
        margin-left: 0.5ch;
    }

    .section-subtitle {
        font-size: 1.1rem;
        color: rgba(224, 224, 224, 0.7);
        margin-bottom: 3rem;
        max-width: 600px;
    }

    .skills-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        max-width: 1000px;
        margin-top: 2rem;
    }

    .proficiency-levels, .skill-categories {
        flex: 1;
        background: var(--card-background);
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--primary-color);
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    }
    
    .skill-categories {
        flex: 2; /* As per original CSS */
    }

    h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        color: var(--primary-color);
        text-shadow: var(--neon-glow-cyan);
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .category-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        justify-content: center;
    }

    .category-btn {
        background-color: transparent;
        color: var(--text-color);
        border: 1px solid var(--primary-color);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Orbitron', sans-serif;
    }

    .category-btn:hover, .category-btn.active {
        background-color: var(--primary-color);
        color: var(--background-color);
        box-shadow: var(--neon-glow-cyan);
        transform: translateY(-2px);
    }

    .category-btn.active {
        font-weight: bold;
    }

    .skill-items-container {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    @media (max-width: 768px) {
        .skills-container {
            flex-direction: column;
        }
        section h2 {
            font-size: 2rem;
        }
    }
  `]
})
export class SkillsComponent implements OnInit {
    categories: string[] = [];
    selectedCategory = signal<string>('Languages');

    currentSkills = computed(() => {
        const category = this.selectedCategory();
        let skills: Skill[] = [];
        this.skillsService.getSkillsByCategory(category).subscribe(data => {
            skills = data;
        });
        return skills;
    });

    constructor(private skillsService: SkillsService) { }

    ngOnInit() {
        this.categories = this.skillsService.getAllCategories();
    }

    selectCategory(category: string) {
        this.selectedCategory.set(category);
    }
}
