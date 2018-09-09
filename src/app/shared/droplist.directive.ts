import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[mydropdown]'
})
export class DropListDirective {
  @HostBinding ('class.open') isopen= false;
  @HostListener('click') toggleopen () {
    this.isopen = !this.isopen;
  }
}
