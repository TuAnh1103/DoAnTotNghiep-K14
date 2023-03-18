import { AuthService } from './core/auth/auth.service';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CenterMetaComponent } from './pages/sidebar/center-meta/center-meta.component';
import { ShortcutsComponent } from './pages/sidebar/shortcuts/shortcuts.component';
import { RecentActivityComponent } from './pages/sidebar/shortcuts/recent-activity/recent-activity.component';
import { FollowerComponent } from './pages/sidebar/follower/follower.component';
import { PageLikeComponent } from './pages/sidebar/page-like/page-like.component';
import { ListFriendComponent } from './pages/sidebar/list-friend/list-friend.component';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './pages/news/news.component';
import { TimelineFriendsComponent } from './pages/timeline/timeline-friends/timeline-friends.component';
import { EditAccountSettingComponent } from './pages/edit-account-setting/edit-account-setting.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MessageComponent } from './pages/message/message.component';
import { EditProfileBasicComponent } from './pages/edit-profile-basic/edit-profile-basic.component';
import { TimelineGroupComponent } from './pages/timeline/timeline-group/timeline-group.component';
import { TimelinePageComponent } from './pages/timeline/timeline-page/timeline-page.component';
import { TimelinePhotosComponent } from './pages/timeline/timeline-photos/timeline-photos.component';
import { TimelineVideosComponent } from './pages/timeline/timeline-videos/timeline-videos.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ErrorComponent } from './pages/error/error.component';
import { AboutComponent } from './pages/timeline/about/about.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationDialogComponent } from './shared/authentication-dialog/authentication-dialog.component';
import { NotificationDialogComponent } from './shared/shared/notification-dialog/notification-dialog.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CenterMetaComponent,
    ShortcutsComponent,
    RecentActivityComponent,
    FollowerComponent,
    PageLikeComponent,
    ListFriendComponent,
    ChatboxComponent,
    TimelineComponent,
    NewsComponent,
    TimelineFriendsComponent,
    EditAccountSettingComponent,
    ChangePasswordComponent,
    MessageComponent,
    EditProfileBasicComponent,
    TimelineGroupComponent,
    TimelinePageComponent,
    TimelinePhotosComponent,
    TimelineVideosComponent,
    NotificationsComponent,
    ErrorComponent,
    AboutComponent,
    RegisterComponent,
    AuthenticationDialogComponent,
    NotificationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatTreeModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
