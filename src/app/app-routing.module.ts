import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './modules/module-home/home/home.component';
import { ChatGptComponent } from './modules/module-chat-gpt/chat-gpt/chat-gpt.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'projects', loadChildren: () => import('./modules/module-projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'users', loadChildren: () => import('./modules/module-users/users.module').then(m => m.UsersModule) },
      { path: 'kanban', loadChildren: () => import('./modules/module-kanban/kanban.module').then(m => m.KanbanModule) },
      { path: 'chat-gpt', component: ChatGptComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  {
    path: '**',
    component: NotFoundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
