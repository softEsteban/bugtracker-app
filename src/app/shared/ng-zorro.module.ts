import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzIconModule,
    NzAvatarModule
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzIconModule,
    NzAvatarModule
  ]
})
export class NgZorroModule { }
