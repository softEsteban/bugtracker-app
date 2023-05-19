import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectsListComponent } from './modules/module-projects/projects-list/projects-list.component';
import { UsersListComponent } from './modules/module-users/users-list/users-list.component';
import { BoardComponent } from './modules/module-kanban/board/board.component';
import { HomeComponent } from './modules/module-home/home/home.component';
import { UserDetailComponent } from './modules/module-users/user-detail/user-detail.component';
import { ProjectDetailComponent } from './modules/module-projects/project-detail/project-detail.component';
import { ChatGptComponent } from './modules/module-chat-gpt/chat-gpt/chat-gpt.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsListComponent, canActivate: [AuthGuard] },
      { path: 'project/:projectId', component: ProjectDetailComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'user/:userId', component: UserDetailComponent, canActivate: [AuthGuard] },
      { path: 'kanban', component: BoardComponent, canActivate: [AuthGuard] },
      { path: 'chat-gpt', component: ChatGptComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
