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
    userRole = "";

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || 'user';
  }

  buttons = [
    { label: 'Adicionar número', routerLink: '/register/customer', roles: ['user'] },
    { label: 'Enviar mensagem', routerLink: '/send', roles: ['user'] },
    { label: 'Consultar dados', routerLink: '/customer/id', roles: ['user'] },
    { label: 'Buscar cliente', routerLink: '/customers', roles: ['admin'] },
    { label: 'Sair', routerLink: '/login', roles: ['admin', 'user'], action: () => this.logout() },
  ];

  get filteredButtons() {
    return this.buttons.filter(button => button.roles.includes(this.userRole));
  }

  logout() {
    sessionStorage.clear();
    this.toastService.success("Saindo...");
    this.router.navigate(['/login']);
  }
}
