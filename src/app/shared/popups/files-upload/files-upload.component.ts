import { Component, Inject, INJECTOR, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent implements OnInit {
  files: File[] = [];
  image!: File;
  isError!: boolean;
  filesUrls: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  isHovering!: boolean;

  ngOnInit(): void {}

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(event: FileList | any): void {
    this.dropGeneral(event);
  }

  onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && this.files.length > 1) {
      this.isError = true;
      return;
    }

    for (let index = 0; index < files.length; index++) {
      this.files.push(files.item(index) as File);
    }

    console.log(files);
  }

  onUploadComplete(url: string): void {
    this.filesUrls.push(url);
  }
}
