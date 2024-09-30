import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { MessageSenderComponent } from './pages/message-sender/message-sender.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { authGuard } from './guards/auth-guard';
import { HomeComponent } from './pages/home/home.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "register/customer",
        component: CustomerRegistrationComponent,
        canActivate: [authGuard]
    },
    {
        path: "send",
        component: MessageSenderComponent,
        canActivate: [authGuard]
    },
    {
        path: "customers",
        component: CustomerListComponent,
        canActivate: [authGuard]
    },
    {
        path: "customer/:cnpj",
        component: CustomerDetailsComponent,
        canActivate: [authGuard]
    },
    {
        path: "customer/edit/:email",
        component: CustomerEditComponent,
        canActivate: [authGuard]
    },
];
