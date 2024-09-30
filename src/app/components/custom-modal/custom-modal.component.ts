import { Component, Inject, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';
import { PrimaryInputComponent } from "../primary-input/primary-input.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    MatSelectModule,
    ButtonComponent,
    CommonModule,
    PrimaryInputComponent,
    FormsModule
],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent {
  tipoAcao: 'PLANO' | 'SALDO' | 'LIMITE' = 'PLANO';
  novoPlano: string = '';
  novoSaldo: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tipoAcao = data.tipoAcao;
  }

}
