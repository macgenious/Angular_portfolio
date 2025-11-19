import { Component, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-custom-cursor',
    standalone: true,
    imports: [CommonModule],
    template: `<div #cursorDot class="cursor-dot"></div>`,
    styles: [`
    .cursor-dot {
      width: 8px;
      height: 8px;
      background-color: var(--primary-color);
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
      transition: opacity 0.3s ease;
      opacity: 0; /* Hidden by default until moved */
    }
  `]
})
export class CustomCursorComponent implements AfterViewInit {
    @ViewChild('cursorDot') cursorDot!: ElementRef;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {
        // Initial state
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (!this.cursorDot) return;

        const cursor = this.cursorDot.nativeElement;

        this.renderer.setStyle(cursor, 'left', `${e.clientX}px`);
        this.renderer.setStyle(cursor, 'top', `${e.clientY}px`);
        this.renderer.setStyle(cursor, 'opacity', '0.7');

        // Check if hovering over header/nav to hide cursor
        const target = e.target as HTMLElement;
        if (target.closest('header')) {
            this.renderer.setStyle(cursor, 'transition', 'opacity 0s ease-in-out, transform 0s ease-in-out');
            this.renderer.setStyle(cursor, 'opacity', '0');
        } else {
            // Reset transition if needed, but simple opacity toggle is fine
        }
    }

    @HostListener('document:mouseout')
    onMouseOut() {
        if (this.cursorDot) {
            this.renderer.setStyle(this.cursorDot.nativeElement, 'opacity', '0');
        }
    }
}
