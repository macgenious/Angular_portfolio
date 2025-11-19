import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer>
        <p>&copy; 2025 Alejandro's Portfolio. All rights reserved.</p>
    </footer>
  `,
    styles: [`
    footer {
        text-align: center;
        padding: 1rem;
        font-size: 0.9rem;
        color: rgba(224, 224, 224, 0.5);
        border-top: 1px solid rgba(0, 255, 255, 0.1);
        background-color: var(--background-color);
        position: relative;
        z-index: 1;
    }
  `]
})
export class FooterComponent { }
