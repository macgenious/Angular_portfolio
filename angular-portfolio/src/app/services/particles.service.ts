import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

@Injectable({
  providedIn: 'root',
})
export class ParticlesService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isRunningSubject = new BehaviorSubject<boolean>(false);

  // Configuration
  private config = {
    particleCount: 100,
    particleColor: '#00ffff',
    particleSize: 2,
    particleSpeed: 0.5,
    connectionDistance: 100,
    connectionColor: 'rgba(0, 255, 255, 0.1)'
  };

  constructor() {}

  initialize(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setupCanvas();
    this.createParticles();
  }

  private setupCanvas(): void {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-2';
  }

  private createParticles(): void {
    if (!this.canvas) return;

    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        radius: this.config.particleSize,
        color: this.config.particleColor,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
  }

  start(): void {
    if (this.animationId) return;
    this.isRunningSubject.next(true);
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunningSubject.next(false);
  }

  private animate = (): void => {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    // Draw connections
    this.drawConnections();

    this.animationId = requestAnimationFrame(this.animate);
  };

  private updateParticle(particle: Particle): void {
    if (!this.canvas) return;

    particle.x += particle.vx;
    particle.y += particle.vy;

    // Bounce off walls
    if (particle.x <= 0 || particle.x >= this.canvas.width) {
      particle.vx *= -1;
    }
    if (particle.y <= 0 || particle.y >= this.canvas.height) {
      particle.vy *= -1;
    }

    // Keep particles within bounds
    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
  }

  private drawParticle(particle: Particle): void {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.globalAlpha = particle.alpha;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }

  private drawConnections(): void {
    if (!this.ctx) return;

    this.ctx.strokeStyle = this.config.connectionColor;
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = 1 - (distance / this.config.connectionDistance);
          this.ctx.globalAlpha = opacity * 0.2;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.globalAlpha = 1;
        }
      }
    }
  }

  handleResize(): void {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  isRunning(): Observable<boolean> {
    return this.isRunningSubject.asObservable();
  }

  destroy(): void {
    this.stop();
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
  }
}