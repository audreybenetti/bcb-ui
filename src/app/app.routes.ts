import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { MessageSenderComponent } from './pages/message-sender/message-sender.component';

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
        path: "register/costumer",
        component: CustomerRegistrationComponent
    },
    {
        path: "send",
        component: MessageSenderComponent
    }
];