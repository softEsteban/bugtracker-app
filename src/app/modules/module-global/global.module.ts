import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinComponent } from './spin/spin.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FilesViewerComponent } from './files-viewer/files-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    SpinComponent,
    FilesViewerComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    PdfViewerModule
  ],
  exports: [
    FilesViewerComponent
  ]

})
export class GlobalModule { }
