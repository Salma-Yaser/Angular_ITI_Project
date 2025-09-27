import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFlyIn]'
})
export class FlyInDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.addClass(this.el.nativeElement, 'fly-in-init');
    this.checkVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight - 60) {
      this.renderer.addClass(this.el.nativeElement, 'fly-in-animate');
    }
  }
}