import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDetailsDto } from './profile-details-dto';

@Injectable()
export class ProfileService {
  private baseUrl = 'api/profile';

  constructor(private http: HttpClient) { }

  public getMyProfileDetails(): Observable<ProfileDetailsDto> {
    const url = `${this.baseUrl}/me`;
    return this.http.get<ProfileDetailsDto>(url);
  }
}
