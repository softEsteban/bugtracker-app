import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroModule } from './shared/ng-zorro.module';
import { ComponentsModule } from './components/components.module';
import { registerLocaleData } from '@angular/common';
import { ProjectsModule } from './modules/module-projects/projects.module';
import { UsersModule } from './modules/module-users/users.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
  imports: [
    ComponentsModule,
    ProjectsModule,
    UsersModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroModule
  ]
})
export class AppModule { }
