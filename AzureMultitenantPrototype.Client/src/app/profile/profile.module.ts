import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { ProfileService } from './profile.service';
import { ProfileDetailsResolverService } from './profile-details-resolver.service';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileService,
    ProfileDetailsResolverService
  ]
})
export class ProfileModule { }
