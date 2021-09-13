import { Injectable, ModuleWithProviders } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationModule } from './notification.module';
import { NotificationComponent } from './components/notification/notification.component';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_error'],
    });
  }

  success(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: { message },
      panelClass: ['mat-snackbar_success'],
    });
  }
}
