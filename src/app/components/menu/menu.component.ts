import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface MenuItem {
  name: string;
  routerLink: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(private toastService: ToastrService,
     private router: Router) {}
  @Input() mainBtnText: string = "";
  @Input() disableMainBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  userRole = 'user';

  submit(){
    this.onSubmit.emit();
  }

  logout() {
    this.toastService.success("Saindo...");
  }

  buttons = [
    { label: 'Adicionar número', routerLink: '/register/costumer', roles: ['admin', 'user'] },
    { label: 'Enviar mensagem', routerLink: '/send', roles: ['user'] },
    { label: 'Buscar cliente', routerLink: '/costumers', roles: ['admin'] },
    { label: 'Sair', routerLink: '/login', roles: ['admin', 'user'], action: () => this.logout() },
  ];

  get filteredButtons() {
    return this.buttons.filter(button => button.roles.includes(this.userRole));
  }

}
