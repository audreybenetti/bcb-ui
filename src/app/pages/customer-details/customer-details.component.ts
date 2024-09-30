import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../model/cliente';
import { Plano } from '../../model/plano-enum';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryOutputComponent } from '../../components/primary-output/primary-output.component';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from '../../components/custom-modal/custom-modal.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MenuComponent,
    PrimaryOutputComponent,
    ButtonComponent
  ],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  cliente!: Cliente; 
  clienteId: string;
  Plano = Plano;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private clienteService: ClienteService) {
    this.clienteId = this.route.snapshot.paramMap.get('id') || '';
  }

  alterarPlano(): void {
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '400px',
      data: { tipoAcao: 'PLANO', planoAtual: this.cliente.nomePlano }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cliente.nomePlano = result; 
      }
    });
  }

  alterarSaldo(): void {
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '400px',
      data: { 
        tipoAcao: this.cliente.nomePlano === Plano.PRE_PAGO ? 'SALDO' : 'LIMITE',
        saldoAtual: this.cliente.saldo,
        limiteAtual: this.cliente.limiteCredito
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.cliente.nomePlano === Plano.PRE_PAGO) {
          // Atualiza o saldo
          this.cliente.saldo = result; 
        } else if (this.cliente.nomePlano === Plano.POS_PAGO) {
          // Atualiza o limite
          this.cliente.limiteCredito = result; 
        }
      }
    });
  }

  ngOnInit(): void {
    this.cliente = {
      nome: 'John Doe',
      email: 'john@example.com',
      telefone: '(XX) XXXXX-XXXX',
      cnpj: 'XXX/0001-XX',
      nomeResponsavel: 'Jane Doe',
      cpfResponsavel: 'XXX.XXX.XXX-XX',
      nomePlano: Plano.POS_PAGO,
      saldo: 150.00,
      creditoUtilizado: 50.00,
      limiteCredito: 200.00,
      dataCadastro: '2024-01-01'
    };
  }
}
