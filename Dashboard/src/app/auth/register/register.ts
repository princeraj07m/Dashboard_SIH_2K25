import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register{

  currentStep = 1;
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
    // Step 1: User Info
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    language: ['', Validators.required],

    // Step 2: Farm Info
    farmName: ['', Validators.required],
    farmLocation: ['', Validators.required],
    farmSize: [null, Validators.required],

    // Step 3: Crop Info
    primaryCrops: ['', Validators.required],
    secondaryCrops: [''],

    // Step 4: Equipment Info
    sprayerType: ['', Validators.required],
    iotDevices: [null, Validators.required],
    machinery: ['', Validators.required],

    // Step 5: Pesticide & Fertilizer
    pesticides: ['', Validators.required],
    fertilizerPreference: ['', Validators.required],
    monthlyExpenditure: ['', Validators.required]
  });
  }

  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    } else {
      this.markFormGroupTouched(this.getFormGroupForStep(this.currentStep));
      alert('Please fill all required fields in the current step.');
    }
  }

  getFormGroupForStep(step: number): FormGroup {
    const group: { [key: string]: any } = {};
    switch (step) {
      case 1:
        group['fullName'] = this.registerForm.get('fullName');
        group['email'] = this.registerForm.get('email');
        group['password'] = this.registerForm.get('password');
        group['phone'] = this.registerForm.get('phone');
        group['language'] = this.registerForm.get('language');
        break;
      case 2:
        group['farmName'] = this.registerForm.get('farmName');
        group['farmLocation'] = this.registerForm.get('farmLocation');
        group['farmSize'] = this.registerForm.get('farmSize');
        break;
      case 3:
        group['primaryCrops'] = this.registerForm.get('primaryCrops');
        group['secondaryCrops'] = this.registerForm.get('secondaryCrops');
        break;
      case 4:
        group['sprayerType'] = this.registerForm.get('sprayerType');
        group['iotDevices'] = this.registerForm.get('iotDevices');
        group['machinery'] = this.registerForm.get('machinery');
        break;
      case 5:
        group['pesticides'] = this.registerForm.get('pesticides');
        group['fertilizerPreference'] = this.registerForm.get('fertilizerPreference');
        group['monthlyExpenditure'] = this.registerForm.get('monthlyExpenditure');
        break;
    }
    return this.fb.group(group);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  skipStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!this.registerForm.get('fullName')?.valid &&
               !!this.registerForm.get('email')?.valid &&
               !!this.registerForm.get('password')?.valid &&
               !!this.registerForm.get('phone')?.valid &&
               !!this.registerForm.get('language')?.valid;
      case 2:
        return !!this.registerForm.get('farmName')?.valid &&
               !!this.registerForm.get('farmLocation')?.valid &&
               !!this.registerForm.get('farmSize')?.valid;
      case 3:
        return !!this.registerForm.get('primaryCrops')?.valid &&
               !!this.registerForm.get('secondaryCrops')?.valid;
      case 4:
        return !!this.registerForm.get('sprayerType')?.valid &&
               !!this.registerForm.get('iotDevices')?.valid &&
               !!this.registerForm.get('machinery')?.valid;
      case 5:
        return !!this.registerForm.get('pesticides')?.valid &&
               !!this.registerForm.get('fertilizerPreference')?.valid &&
               !!this.registerForm.get('monthlyExpenditure')?.valid;
      default:
        return false;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      alert('Form Submitted Successfully!');
      this.currentStep = 5; // Or navigate to a success page
    } else {
      alert('Please fill all required fields.');
    }
  }
}
