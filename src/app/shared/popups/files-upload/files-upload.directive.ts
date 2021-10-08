import {
  EventEmitter,
  Directive,
  Input,
  Output,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]',
})
export class FilesUploadDirective {
  @Input() multiple!: boolean;
  @Input() crop!: boolean;
  @Output() changed = new EventEmitter<string | string[]>();

  @HostListener('click', ['event']) onClick() {
    this.openDialog();
  }

  constructor(private dialog: MatDialog) {}

  private openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.changed.emit(result || null);
    });
  }
}
