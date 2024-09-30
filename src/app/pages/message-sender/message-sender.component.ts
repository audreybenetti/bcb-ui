import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../components/menu/menu.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../components/button/button.component';
import { PrimaryOutputComponent } from "../../components/primary-output/primary-output.component";
import { ClienteService } from '../../services/cliente.service';
import { MensagemService } from '../../services/mensagem-service.service';
import { Mensagem } from '../../model/mensagem';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-message-sender',
  standalone: true,
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    ButtonComponent,
    PrimaryOutputComponent
  ],
  templateUrl: './message-sender.component.html',
  styleUrl: './message-sender.component.scss'
})
export class MessageSenderComponent {
  messageForm!: FormGroup;
  modoEnvio: string = '';
  telefoneRemetente: string = '';
  cnpj: string = '';
  email: string = '';

  constructor(
    private toastService: ToastrService,
    private clienteService: ClienteService,
    private mensagemService: MensagemService) {
    this.messageForm = new FormGroup({
      telefoneRemetente: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telefoneDestinatario: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mensagem: new FormControl('', [Validators.required]),
      tipoMensagem: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.email = sessionStorage.getItem('email') || '';
    this.getClienteTelefone(this.email);
  }

  getClienteTelefone(email: string) {
    this.clienteService.buscarClientePorEmail(email).subscribe(cliente => {
      if (cliente) {
        this.cnpj = cliente.cnpj;
        this.telefoneRemetente = cliente.telefone;
        this.messageForm.get('telefoneRemetente')?.setValue(cliente.telefone);
      } else {
        this.messageForm.disable();
        this.toastService.warning('Primeiro cadastre o número de telefone.');
      }
    });
  }

  setModoEnvio(modo : string) {
    this.modoEnvio = modo;
  }

  submit() {
    if (this.messageForm.valid) {
      const mensagem = new Mensagem (
        this.cnpj,
        this.messageForm.value.mensagem,
        this.messageForm.value.telefoneDestinatario,
        this.messageForm.value.tipoMensagem
      )

      this.mensagemService.enviarMensagem(mensagem).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.toastService.success('Mensagem enviada com sucesso!');
            this.getClienteTelefone(this.email);
          }
        },
        error: (error) => {
          console.error('Erro ao enviar mensagem.', error);
          this.toastService.error('Erro ao enviar mensagem.');
        }
      });
    }
  }
}
