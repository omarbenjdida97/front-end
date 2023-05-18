import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'egate-ad-form',
  templateUrl: './adForm.component.html',
  styleUrls: ['./adForm.component.css'],
})
export class AdFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: AdInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('adSubmit') adSubmitEvent = new EventEmitter<AdInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      type: this.initialValuesProps.type,
      profilePicture: this.initialValuesProps.profilePicture,
      description: this.initialValuesProps.description,
      location: this.initialValuesProps.location,
      lessonType: this.initialValuesProps.lessonType,
      hourlyRate: this.initialValuesProps.hourlyRate,
      subject: this.initialValuesProps.subject,
      tagList: this.initialValuesProps.tagList.join(' '),
    });
  }

  onSubmit(): void {
    this.adSubmitEvent.emit(this.form.value);
  }
  
}
