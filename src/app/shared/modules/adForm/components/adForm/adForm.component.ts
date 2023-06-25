import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import { AdInputInterface } from 'src/app/shared/types/adInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'egate-ad-form',
  templateUrl: './adForm.component.html',
  styleUrls: ['./adForm.component.css'],
})
export class AdFormComponent implements OnInit {
  ads: AdInterface[];
    nearbyUsers: AdInterface[]
    latitude: number;
    longitude: number;
  @Input('initialValues') initialValuesProps: AdInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('adSubmit') adSubmitEvent = new EventEmitter<AdInputInterface>();

  form: FormGroup;
  selectedOptions: string[] = [];
  constructor(private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    this.initializeForm();
    this.setInitialSelectedOptions();
 
  
  }

  async initializeForm(): Promise<void> {
    const tagListValue = this.initialValuesProps.tagList.map(tag => `'${tag}'`).join(',');
    const formattedTagListValue = `{${tagListValue}}`;
  
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      type: this.initialValuesProps.type,
      aboutAuthor: this.initialValuesProps.aboutAuthor,
      description: this.initialValuesProps.description,
      location: this.initialValuesProps.location,
      requiredSkills: this.initialValuesProps.requiredSkills.join(' '),
      hourlyRate: this.initialValuesProps.hourlyRate,
      subject: this.initialValuesProps.subject,
      tagList:formattedTagListValue,
      longitude: this.initialValuesProps.longitude,
      latitude: this.initialValuesProps.latitude,
      
    });
  }

  onSubmit(): void {
    this.adSubmitEvent.emit(this.form.value);
    
  }


  
  setInitialSelectedOptions(): void {
    const typeValue: string[] = this.form.get('type').value;
    this.selectedOptions = [...typeValue];
  }

  toggleCheckbox(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }

    this.form.controls.type.setValue(this.selectedOptions); 
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }
  getUserCoordinates(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
   fetchNearbyUsers(latitude: number, longitude: number) {
    try {
      const queryParams = { latitude, longitude };
      this.router.navigate(['/ads'], { queryParams });
  
    } catch (error) {
      console.error('Error navigating to nearby ads:', error);
      // Handle error
    }
  }
  async getnear() {
    try {
      const position: GeolocationPosition = await this.getUserCoordinates();
      const latitude: number = position.coords.latitude;
      const longitude: number = position.coords.longitude;
      console.log('User coordinates:', latitude, longitude);
  
      // Insert the latitude and longitude values into the form
      this.form.patchValue({
        latitude: latitude,
        longitude: longitude
      });
    } catch (error) {
      console.error('Error getting user coordinates:', error);
      // Handle error
    }
  }
}
