import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDetailsDto } from '../profile-details-dto';
import { ProfileService } from '../profile.service';

@Component({
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  profileDetails: ProfileDetailsDto | undefined;

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.profileService.getMyProfileDetails().subscribe(x=>{
      this.profileDetails = x;
    })
  }


}
