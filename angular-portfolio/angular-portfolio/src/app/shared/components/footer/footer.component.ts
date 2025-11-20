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
        padding: 2rem 1rem;
        font-size: 0.95rem;
        color: rgba(224, 224, 224, 0.6);
        border-top: 2px solid rgba(0, 255, 255, 0.3);
        background: linear-gradient(180deg, var(--background-color), rgba(10, 10, 35, 0.95));
        position: relative;
        z-index: 1;
        box-shadow: 0 -2px 20px rgba(0, 255, 255, 0.1);
    }

    footer p {
        font-family: 'Roboto', sans-serif;
        letter-spacing: 0.5px;
        margin: 0;
    }
  `]
})
export class FooterComponent { }
