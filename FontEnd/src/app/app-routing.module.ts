import { UserPostComponent } from './pages/timeline/news-timeline/user-post/user-post.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TimelineFriendsComponent } from './pages/timeline/timeline-friends/timeline-friends.component';
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
import { ShareDialogComponent } from './shared/components/share-dialog/share-dialog.component';
import { TimelinePostShareComponent } from './pages/timeline/timeline-post-share/timeline-post-share.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { PostAdminComponent } from './admin/post-admin/post-admin.component';
import { SharePostAdminComponent } from './admin/share-post-admin/share-post-admin.component';
import { AddressAdminComponent } from './admin/address-admin/address-admin.component';
import { FavoriteAdminComponent } from './admin/favorite-admin/favorite-admin.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';
import { UserdetailViewComponent } from './admin/userdetail-view/userdetail-view.component';
import { ChatMessageComponent } from './pages/chat-message/chat-message.component';
import { ChatMessageContentComponent } from './pages/chat-message/chat-message-content/chat-message-content.component';
import { AddNewPostComponent } from './shared/components/add-new-post/add-new-post.component';
import { PrivacyDialogComponent } from './shared/components/privacy-dialog/privacy-dialog.component';
import { EditCommentComponent } from './shared/components/edit-comment/edit-comment.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
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
        path:'photos',
        component:TimelinePhotosComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'share',
        component:TimelinePostShareComponent,
        canActivate:[AuthGuardService]
      }
    ],
  },
  {path:'message',component:MessageComponent,canActivate:[AuthGuardService]},
  {path:'error',component:ErrorComponent,canActivate:[AuthGuardService]},
  {path:'news',component:NewsComponent,canActivate:[AuthGuardService]},
  {path:'notifications',component:NotificationsComponent,canActivate:[AuthGuardService]},
  {path:'search/:key',component:SearchComponent,canActivate:[AuthGuardService]},
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
  {path:'admin',component:HomeAdminComponent,canActivate:[AuthGuardService]},
  {
    path:'admin',
    children:[
      {
        path:'post',
        component:PostAdminComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'share',
        component:SharePostAdminComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'address',
        component:AddressAdminComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'favorite',
        component:FavoriteAdminComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'account',
        component:UserAdminComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'view/:userId',
        component:UserdetailViewComponent,
        canActivate:[AuthGuardService]
      },

    ],
  },
  {path:'messager/t/:chatId',component:ChatMessageComponent,canActivate:[AuthGuardService]},
  {path:'recovery',component:RecoveryPasswordComponent},
  {path:'post',component:DetailPostComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
