import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdFormComponent } from 'src/app/shared/modules/adForm/components/adForm/adForm.component';
import { BackendErrorsMessagesModule } from '../backendErrorMessages/backendErrorMessages.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BackendErrorsMessagesModule,
    ReactiveFormsModule,
    BackendErrorsMessagesModule,
  ],
  declarations: [AdFormComponent],
  exports: [AdFormComponent],
})
export class AdFormModule {}
