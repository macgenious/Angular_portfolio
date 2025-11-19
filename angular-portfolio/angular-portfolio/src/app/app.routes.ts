import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: '**', redirectTo: '' }
];
