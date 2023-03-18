import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { AboutComponent } from './pages/timeline/about/about.component';
import { TimelineFriendsComponent } from './pages/timeline/timeline-friends/timeline-friends.component';
import { TimelineGroupComponent } from './pages/timeline/timeline-group/timeline-group.component';
import { TimelinePageComponent } from './pages/timeline/timeline-page/timeline-page.component';
import { TimelinePhotosComponent } from './pages/timeline/timeline-photos/timeline-photos.component';
import { TimelineVideosComponent } from './pages/timeline/timeline-videos/timeline-videos.component';
import { MessageComponent } from './pages/message/message.component';
import { ErrorComponent } from './pages/error/error.component';
import { NewsComponent } from './pages/news/news.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditAccountSettingComponent } from './pages/edit-account-setting/edit-account-setting.component';
import { EditProfileBasicComponent } from './pages/edit-profile-basic/edit-profile-basic.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationDialogComponent } from './shared/authentication-dialog/authentication-dialog.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, /* redirect without clear GET params */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'home',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'timeline',component:TimelineComponent,canActivate:[AuthGuardService]},
  {
    path:'timeline',
    children:[
      {
        path:'abouts',
        component:AboutComponent
      },
      {
        path:'friends',
        component:TimelineFriendsComponent
      },
      {
        path:'groups',
        component:TimelineGroupComponent
      },
      {
        path:'pages',
        component:TimelinePageComponent
      },
      {
        path:'photos',
        component:TimelinePhotosComponent
      },
      {
        path:'videos',
        component:TimelineVideosComponent
      },
    ],
    canActivate:[AuthGuardService]
  },
  {path:'message',component:MessageComponent,canActivate:[AuthGuardService]},
  {path:'error',component:ErrorComponent,canActivate:[AuthGuardService]},
  {path:'news',component:NewsComponent,canActivate:[AuthGuardService]},
  {path:'notifications',component:NotificationsComponent,canActivate:[AuthGuardService]},
  {path:'account',
  children:[
    {
      path:'changePassword',
      component:ChangePasswordComponent,
    },
    {
      path:'editProfile',
      component:EditProfileBasicComponent
    }
  ],
  canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
