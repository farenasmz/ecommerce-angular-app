import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadComponent } from './files-upload.component';
import { FilesUploadDirective } from './files-upload.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [FilesUploadComponent, FilesUploadDirective, DropZoneDirective, UploadComponent],
  imports: [CommonModule, MatDialogModule, ImageCropperModule],
  exports: [FilesUploadDirective],
})
export class FilesUploadModule {}
