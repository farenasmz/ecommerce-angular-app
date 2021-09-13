import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ButtonsModule } from '@app/shared';
import { ControlsModule } from '../../../../shared/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from '../../../../shared/indicators/indicators.module';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonsModule,
    ControlsModule,
    ReactiveFormsModule,
    IndicatorsModule,
  ],
})
export class SharedModule {}
