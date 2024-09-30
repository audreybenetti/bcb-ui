import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { MessageSenderComponent } from './pages/message-sender/message-sender.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';

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
        path: "register/customer",
        component: CustomerRegistrationComponent
    },
    {
        path: "send",
        component: MessageSenderComponent
    },
    {
        path: "customers",
        component: CustomerListComponent
    },
    {
        path: "customer/id",
        component: CustomerDetailsComponent
    },
];