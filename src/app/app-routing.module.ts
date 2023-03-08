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

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'projects', component: ProjectsListComponent },
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
    ]
  },
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
