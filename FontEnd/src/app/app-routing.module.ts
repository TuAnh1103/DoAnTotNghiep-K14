import { UserPostComponent } from './pages/timeline/news-timeline/user-post/user-post.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TimelineFriendsComponent } from './pages/timeline/timeline-friends/timeline-friends.component';
import { TimelineGroupComponent } from './pages/timeline/timeline-group/timeline-group.component';
import { TimelinePageComponent } from './pages/timeline/timeline-page/timeline-page.component';
import { TimelinePhotosComponent } from './pages/timeline/timeline-photos/timeline-photos.component';
import { MessageComponent } from './pages/message/message.component';
import { ErrorComponent } from './pages/error/error.component';
import { NewsComponent } from './pages/news/news.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditAccountSettingComponent } from './pages/edit-account-setting/edit-account-setting.component';
import { EditProfileBasicComponent } from './pages/edit-profile-basic/edit-profile-basic.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationDialogComponent } from './shared/components/authentication-dialog/authentication-dialog.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { TimelineFollowerComponent } from './pages/timeline/timeline-follower/timeline-follower.component';
import { TimelineFollowingComponent } from './pages/timeline/timeline-following/timeline-following.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, /* redirect without clear GET params */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'home',component:HomeComponent,canActivate:[AuthGuardService]},
  {path:'timeline/me',component:TimelineComponent,canActivate:[AuthGuardService]},
  {path:'timeline/:id',component:TimelineComponent,canActivate:[AuthGuardService]},
  {
    path:'timeline/:id',
    children:[
      {
        path:'friends',
        component:TimelineFriendsComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'followers',
        component:TimelineFollowerComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'following',
        component:TimelineFollowingComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'groups',
        component:TimelineGroupComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'pages',
        component:TimelinePageComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'photos',
        component:TimelinePhotosComponent,
        canActivate:[AuthGuardService]
      }
    ],
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
  },
  {path:'userpost',component:UserPostComponent,canActivate:[AuthGuardService]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
