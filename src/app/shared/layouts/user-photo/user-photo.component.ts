import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPhotoComponent implements OnInit {
  @Input() photoUrl!: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  get safePhotoUrl(): SafeStyle | null {
    return this.photoUrl
      ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoUrl})`)
      : null;
  }
}
