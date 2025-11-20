import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <header>
        <nav>
            <div class="logo"><span class="logo-cyber">CYBER</span><span class="logo-dev">DEV</span></div>
            <ul>
                <li><a (click)="scrollToSection('home')" [class.active]="activeSection === 'home'">Home</a></li>
                <li><a (click)="scrollToSection('skills')" [class.active]="activeSection === 'skills'">Skills</a></li>
                <li><a (click)="scrollToSection('projects')" [class.active]="activeSection === 'projects'">Projects</a></li>
            </ul>
        </nav>
    </header>
  `,
    styles: [`
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 1.2rem 5%;
        background: rgba(10, 10, 35, 0.9);
        backdrop-filter: blur(15px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
        border-bottom: 2px solid rgba(0, 255, 255, 0.3);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .logo {
        font-family: 'Orbitron', sans-serif;
        font-size: 2rem;
        font-weight: 900;
        letter-spacing: 2px;
    }

    .logo-cyber {
        color: var(--primary-color);
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
    }

    .logo-dev {
        color: var(--secondary-color);
        text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff;
    }

    nav ul {
        list-style: none;
        display: flex;
    }

    nav ul li {
        margin-left: 2.5rem;
        position: relative;
    }

    nav ul li a {
        text-decoration: none;
        color: var(--text-color);
        font-weight: 500;
        font-size: 1.05rem;
        transition: color 0.3s ease, text-shadow 0.3s ease;
        cursor: pointer;
        position: relative;
        padding-bottom: 5px;
    }

    nav ul li a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--link-hover-color));
        box-shadow: 0 0 10px var(--primary-color);
        transition: width 0.3s ease;
    }

    nav ul li a:hover::after,
    nav ul li a.active::after {
        width: 100%;
    }

    nav ul li a:hover,
    nav ul li a.active {
        color: var(--primary-color);
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5);
    }
    
    @media (max-width: 768px) {
        header {
            padding: 1rem 2%;
        }
        nav ul {
            display: none; /* Mobile menu to be implemented if requested, keeping simple for now */
        }
        .logo {
            font-size: 1.6rem;
        }
    }
  `]
})
export class NavigationComponent {
    activeSection: string = 'home';

    constructor(
        private viewportScroller: ViewportScroller,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    scrollToSection(sectionId: string): void {
        this.activeSection = sectionId;
        this.viewportScroller.scrollToAnchor(sectionId);
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (!isPlatformBrowser(this.platformId)) return;

        const sections = ['home', 'skills', 'projects'];

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }
}
