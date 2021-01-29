import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileDetailsDto } from './profile-details-dto';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileDetailsResolverService implements Resolve<ProfileDetailsDto> {

  constructor(private profileService: ProfileService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileDetailsDto> {
    return this.profileService.getMyProfileDetails();
  }
}
