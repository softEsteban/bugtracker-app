import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './landing/content/content.component';
import { LoginComponent } from './module.auth/login/login.component';
import { RegisterComponent } from './module.auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./module.auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
