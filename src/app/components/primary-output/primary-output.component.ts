import { Component, Input } from '@angular/core';

type InputTypes = "text" | "email" | "number"

@Component({
  selector: 'app-primary-output',
  standalone: true,
  templateUrl: './primary-output.component.html',
  styleUrls: ['./primary-output.component.scss']
})
export class PrimaryOutputComponent {
  @Input() inputName: string = '';
  @Input() label: string = "";
  @Input() type: InputTypes = "text";
  @Input() placeholder: string | number | null = null;
  @Input() value: string | number | null = null;

  onInput(event: Event): void {
  }
}
