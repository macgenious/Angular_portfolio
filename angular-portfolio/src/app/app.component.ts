import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParticlesService } from './services/particles.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, SkillsComponent, ProjectsComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas', { static: false }) particleCanvas!: ElementRef<HTMLCanvasElement>;
  
  title = 'CyberDev Portfolio';
  
  constructor(private particlesService: ParticlesService) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Initialize particles after view is ready
    if (this.particleCanvas) {
      this.particlesService.initialize(this.particleCanvas.nativeElement);
      this.particlesService.start();
    }

    // Handle window resize
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    // Cleanup
    this.particlesService.destroy();
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    this.particlesService.handleResize();
  }
}