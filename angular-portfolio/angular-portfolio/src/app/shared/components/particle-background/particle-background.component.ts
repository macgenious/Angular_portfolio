import { Component, ElementRef, OnDestroy, OnInit, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-particle-background',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #particleCanvas id="particle-canvas"></canvas>`,
    styles: [`
    #particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
    }
  `]
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private particlesArray: any[] = [];
    private animationId: number = 0;
    private resizeObserver!: ResizeObserver;

    constructor(private ngZone: NgZone) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.initCanvas();
        this.initParticles();
        this.animateParticles();

        this.resizeObserver = new ResizeObserver(() => {
            this.ngZone.runOutsideAngular(() => {
                this.handleResize();
            });
        });
        this.resizeObserver.observe(document.body);
    }

    ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private initCanvas(): void {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    private handleResize(): void {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.initParticles();
    }

    private initParticles(): void {
        this.particlesArray = [];
        const numberOfParticles = 20; // Reduced for lower density as per original
        const canvas = this.canvasRef.nativeElement;

        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            this.particlesArray.push(new Particle(x, y, canvas.width, canvas.height));
        }
    }

    private animateParticles(): void {
        this.ngZone.runOutsideAngular(() => {
            const animate = () => {
                this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

                for (let i = 0; i < this.particlesArray.length; i++) {
                    this.particlesArray[i].update();
                    this.particlesArray[i].draw(this.ctx);
                }

                this.connectParticles();
                this.animationId = requestAnimationFrame(animate);
            };
            animate();
        });
    }

    private connectParticles(): void {
        for (let i = 0; i < this.particlesArray.length; i++) {
            for (let j = i; j < this.particlesArray.length; j++) {
                const dx = this.particlesArray[i].x - this.particlesArray[j].x;
                const dy = this.particlesArray[i].y - this.particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    const opacity = 1 - distance / 100;
                    const colorMatch = this.particlesArray[i].color.match(/\d+/g);
                    if (colorMatch) {
                        // Extract hue from HSL to create RGBA approximation or just use the HSL
                        // The original used: rgba(${particlesArray[i].color.match(/\d+/g).join(',')}, ${1 - distance / 100})
                        // But the color is HSL. Let's stick to the original logic if possible, but HSL to RGB conversion might be needed for RGBA.
                        // Actually, original code: `hsl(${Math.random() * 360}, 70%, 70%)`
                        // And connect: `strokeStyle = rgba(${particlesArray[i].color.match(/\d+/g).join(',')}, ...)`
                        // Wait, `match(/\d+/g)` on `hsl(100, 70%, 70%)` returns ['100', '70', '70'].
                        // `rgba(100, 70, 70, opacity)` is NOT valid if it expects RGB. 
                        // However, if it worked in vanilla, maybe the browser handled it or it was actually broken/weird.
                        // Let's use hsla for better correctness: hsla(hue, saturation, lightness, alpha)
                        const [h, s, l] = colorMatch;
                        this.ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
                    }
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particlesArray[i].x, this.particlesArray[i].y);
                    this.ctx.lineTo(this.particlesArray[j].x, this.particlesArray[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    canvasWidth: number;
    canvasHeight: number;

    constructor(x: number, y: number, canvasWidth: number, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) {
            this.size -= 0.05;
        } else {
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
        }

        if (this.x < 0 || this.x > this.canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
