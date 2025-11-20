import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="home">
        <div class="hero-content">
            <p class="comment">// Hello World</p>
            <h1>Software<br>Engineer<br>Cybernetic<br>Problem<br>Solver</h1>
            <p class="tech-stack">Python | Java | Web Development | Hardware | AI Tools</p>
            <p class="description">Crafting cutting-edge solutions with a fusion of code and creativity, building tomorrow's technology with today's tools.</p>
            <div class="buttons">
                <button class="btn-primary" (click)="openCv()">Read CV &rarr;</button>
            </div>
        </div>
        <div class="hero-image">
            <div class="code-icon">&lt;/&gt;</div>
        </div>
    </section>
  `,
    styles: [`
    #home {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        min-height: calc(100vh - 80px);
        text-align: left;
        padding-top: 80px;
    }

    .hero-content {
        max-width: 600px;
        animation: fadeInLeft 1s ease-out;
    }

    @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .hero-content .comment {
        font-family: 'Courier New', Courier, monospace;
        color: #888;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }

    .hero-content h1 {
        font-family: 'Orbitron', sans-serif;
        font-size: 4.5rem;
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #00ffff 0%, #00ccff 25%, #ff00ff 50%, #ff00cc 75%, #00ffff 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 8s ease infinite;
        filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5)) drop-shadow(0 0 40px rgba(255, 0, 255, 0.3));
    }

    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    .hero-content .tech-stack {
        font-size: 1.1rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        letter-spacing: 1.5px;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }

    .hero-content .description {
        margin-bottom: 2rem;
        font-size: 1.05rem;
        line-height: 1.7;
        color: rgba(224, 224, 224, 0.8);
    }

    .buttons button {
        padding: 1rem 2rem;
        border: none;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 1rem;
        position: relative;
        overflow: hidden;
    }

    .btn-primary {
        background: linear-gradient(135deg, var(--primary-color), var(--link-hover-color));
        color: var(--background-color);
        box-shadow: var(--neon-glow-cyan);
        border: 2px solid var(--primary-color);
    }

    .btn-primary::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    .btn-primary:hover::before {
        width: 300px;
        height: 300px;
    }

    .btn-primary:hover {
        background: linear-gradient(135deg, var(--link-hover-color), var(--primary-color));
        box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;
        transform: translateY(-3px);
    }

    .hero-image .code-icon {
        font-size: 12rem;
        color: var(--primary-color);
        text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff, 0 0 80px #00ffff;
        animation: pulseCodeIcon 3s infinite ease-in-out, float 6s infinite ease-in-out;
        filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.6));
    }

    @media (max-width: 768px) {
        #home {
            flex-direction: column;
            text-align: center;
            padding-top: 100px;
            padding-bottom: 20px;
        }
        .hero-content h1 {
            font-size: 2.8rem;
        }
        .hero-image .code-icon {
            font-size: 7rem;
            margin-top: 2rem;
        }
    }
  `]
})
export class HomeComponent {
    openCv() {
        window.open('assets/curriculum.pdf', '_blank');
    }
}
