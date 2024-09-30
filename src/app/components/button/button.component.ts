import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() routerLink?: string;
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() buttonText: string = "";
  @Output("submit") onSubmit = new EventEmitter();

  submit() {
    if (!this.disabled) {
      this.onSubmit.emit();
    }
  }
}
