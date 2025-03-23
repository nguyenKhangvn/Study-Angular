import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit, AfterViewInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private fireworks: Firework[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('fireworks') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.animate();

    // Tạo pháo hoa ngẫu nhiên
    setInterval(() => {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * (this.canvas.height / 2);
      this.fireworks.push(new Firework(x, y, this.ctx));
    }, 800);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private animate(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Giảm mờ để giữ lại hiệu ứng ánh sáng
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.fireworks.forEach(fw => fw.update());
    this.fireworks.forEach(fw => fw.draw());
    this.fireworks = this.fireworks.filter(fw => fw.particles.length > 0);

    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  public x: number;
  public y: number;
  public color: string;
  public speed: number;
  public angle: number;
  public alpha: number;
  public gravity: number;
  public size: number;
  public flicker: number;
  public fadeSpeed: number;

  constructor(x: number, y: number, color: string, speed: number, angle: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.alpha = 1;
    this.gravity = 0.07; // Trọng lực nhẹ hơn
    this.size = Math.random() * 3 + 2;
    this.flicker = Math.random() * 0.3;
    this.fadeSpeed = Math.random() * 0.02 + 0.008; // Giảm tốc độ mờ dần
  }

  update(): void {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle) + this.gravity;
    this.alpha -= this.fadeSpeed;
    this.size *= 0.98; // Thu nhỏ dần hạt pháo
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Firework {
  public x: number;
  public y: number;
  public particles: Particle[];
  private colors: string[];
  private ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.particles = [];
    this.colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff', '#ff00ff', '#ffffff'];

    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(
        x, y,
        this.colors[Math.floor(Math.random() * this.colors.length)],
        Math.random() * 6 + 2, // Tăng tốc độ nổ
        Math.random() * Math.PI * 2
      ));
    }
  }

  update(): void {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw(): void {
    this.particles.forEach(p => p.draw(this.ctx));
  }
}
