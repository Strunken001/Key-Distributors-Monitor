import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding.routing';
import { OnboardingComponent } from './container/onboarding.component';

@NgModule({
  declarations: [
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
