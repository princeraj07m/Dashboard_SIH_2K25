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
    communication: ['', Validators.required],
    language: ['', Validators.required],

    // Step 2: Farm Info
    farmName: [''],
    farmLocation: [''],
    farmSize: [null],
    ownershipType: [''],
    irrigationType: [''],
    soilType: [''],
    waterSource: [''],
    climateZone: [''],

    // Step 3: Crop Info
    primaryCrops: [''],
    secondaryCrops: [''],
    farmingPractice: [''],
    currentSeasonCrop: [''],
    typicalYield: [''],

    // Step 4: Equipment Info
    sprayerType: [''],
    iotDevices: [null],
    machinery: [''],
    pesticides: [''],
    fertilizerPreference: [''],
    monthlyExpenditure: ['']
  });
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
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
