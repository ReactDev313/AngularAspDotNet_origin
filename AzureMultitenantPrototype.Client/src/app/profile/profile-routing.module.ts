import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '../msal/msal.guard';
import { DetailsComponent } from './details/details.component';
import { ProfileDetailsResolverService } from './profile-details-resolver.service';

const routes: Routes = [
  {
    path: 'profile-details',
    component: DetailsComponent,
    // resolve: { auditEntities: ProfileDetailsResolverService },
    canActivate: [
      MsalGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
