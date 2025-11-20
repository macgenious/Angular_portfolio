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
        padding: 80px 5%;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    section h2 {
        font-family: 'Orbitron', sans-serif;
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 1rem;
        letter-spacing: 3px;
        color: var(--primary-color);
        text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5);
    }

    .neon-text-purple {
        color: var(--secondary-color);
        text-shadow: 0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.5);
        margin-left: 0.5ch;
    }

    .section-subtitle {
        font-size: 1.15rem;
        color: rgba(224, 224, 224, 0.75);
        margin-bottom: 3rem;
        max-width: 650px;
        line-height: 1.6;
    }

    .skills-container {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        width: 100%;
        max-width: 1000px;
        margin-top: 2rem;
    }

    .proficiency-levels, .skill-categories {
        flex: 1;
        background: linear-gradient(135deg, rgba(20, 20, 50, 0.8), rgba(30, 20, 60, 0.6));
        padding: 2rem;
        border-radius: 12px;
        border: 2px solid var(--primary-color);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), 
                    inset 0 0 20px rgba(0, 255, 255, 0.05);
        transition: all 0.3s ease;
    }

    .proficiency-levels:hover, .skill-categories:hover {
        border-color: var(--secondary-color);
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.4), 
                    0 0 50px rgba(255, 0, 255, 0.2),
                    inset 0 0 30px rgba(0, 255, 255, 0.08);
    }
    
    .skill-categories {
        flex: 2; /* As per original CSS */
    }

    h3 {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--primary-color);
        text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
        margin-bottom: 2rem;
        text-align: center;
    }

    .category-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
        justify-content: center;
    }

    .category-btn {
        background: transparent;
        color: var(--text-color);
        border: 2px solid var(--primary-color);
        padding: 0.7rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Orbitron', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    }

    .category-btn:hover {
        background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 191, 255, 0.2));
        color: var(--primary-color);
        border-color: var(--link-hover-color);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    .category-btn.active {
        background: linear-gradient(135deg, var(--primary-color), var(--link-hover-color));
        color: var(--background-color);
        border-color: var(--primary-color);
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.6), 
                    0 0 40px rgba(0, 255, 255, 0.3);
        transform: translateY(-2px);
        font-weight: 700;
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
            font-size: 2.2rem;
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
