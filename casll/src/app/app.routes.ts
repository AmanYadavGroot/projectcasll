import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EditorComponent } from './editor/editor.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { AbilityGuard } from './auth-gaurd.guard';
import { UnauthorizedComponentComponent } from './unauthorized-component/unauthorized-component.component';

export const routes: Routes = [
     { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AbilityGuard], data: { action: 'manage', subject: 'all' } },
  { path: 'editor', component: EditorComponent, canActivate: [AbilityGuard], data: { action: 'update', subject: 'Article' } },
  { path: 'guest', component: GuestComponent },
  { path: 'unauthorized', component: UnauthorizedComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}