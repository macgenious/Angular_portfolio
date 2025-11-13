import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeSection = 'home';
  private scrollListener: () => void = () => this.onScroll();

  navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'skills', label: 'Skills', path: '/skills' },
    { id: 'projects', label: 'Projects', path: '/projects' }
  ];

  ngOnInit(): void {
    // Add scroll listener
    window.addEventListener('scroll', this.scrollListener);
    this.onScroll(); // Initial check
  }

  ngOnDestroy(): void {
    // Remove scroll listener
    window.removeEventListener('scroll', this.scrollListener);
  }

  private onScroll(): void {
    const sections = ['home', 'skills', 'projects'];
    let currentSection = 'home';

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
        }
      }
    });

    this.activeSection = currentSection;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}