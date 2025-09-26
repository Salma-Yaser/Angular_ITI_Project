import { asNativeElements, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAnimation]'
})
export class Animation {

  constructor( private el :ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter(){
    console.log("test");

    this.el.nativeElement.style.transform='scale(1.1)';
    this.el.nativeElement.style.transition='all 0.5s ease-in-out';
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.el.nativeElement.style.transform='scale(1)';
    this.el.nativeElement.style.transition='all 0.5s ease-in-out';
  }

}
