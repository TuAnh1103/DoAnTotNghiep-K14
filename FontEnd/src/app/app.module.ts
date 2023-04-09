import { FollowerDetailComponent } from './pages/timeline/timeline-follower/follower-detail/follower-detail.component';
import { TimelineFollowingComponent } from './pages/timeline/timeline-following/timeline-following.component';
import { TimelineFollowerComponent } from './pages/timeline/timeline-follower/timeline-follower.component';
import { PageComponent } from './pages/timeline/timeline-page/page/page.component';
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
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ErrorComponent } from './pages/error/error.component';
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
import { AuthenticationDialogComponent } from './shared/components/authentication-dialog/authentication-dialog.component';
import { NotificationDialogComponent } from './shared/shared/notification-dialog/notification-dialog.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { PhotosComponent } from './pages/timeline/timeline-photos/photos/photos.component';
import { GroupComponent } from './pages/timeline/timeline-group/group/group.component';
import { FriendsComponent } from './pages/timeline/timeline-friends/friends/friends.component';
import { FollowingComponent } from './pages/sidebar/following/following.component';
import { FriendRequestComponent } from './pages/timeline/timeline-friends/friend-request/friend-request.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NavTimelineComponent } from './pages/timeline/nav-timeline/nav-timeline.component';
import { FollowingDetailComponent } from './pages/timeline/timeline-following/following-detail/following-detail.component';
import { HeaderTimelineComponent } from './pages/timeline/header-timeline/header-timeline.component';
import { NewsTimelineComponent } from './pages/timeline/news-timeline/news-timeline.component';
import { UserPostComponent } from './pages/timeline/news-timeline/user-post/user-post.component';
import { ImageSliderComponent } from './shared/components/image-slider/image-slider.component';
import { CommentPostComponent } from './pages/timeline/news-timeline/comment-post/comment-post.component';
import { ShareDialogComponent } from './shared/components/share-dialog/share-dialog.component';
import { CommentPostShareComponent } from './pages/timeline/timeline-post-share/comment-post-share/comment-post-share.component';
import { TimelinePostShareComponent } from './pages/timeline/timeline-post-share/timeline-post-share.component';
import { UserPostShareComponent } from './pages/timeline/timeline-post-share/user-post-share/user-post-share.component';
import { PostShare_newComponent } from './pages/timeline/timeline-post-share/post-share_new/post-share_new.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { EditPostDialogComponent } from './shared/components/edit-post-dialog/edit-post-dialog.component';
import { ComponentsComponent } from './shared/components/components/components.component';
import { EditPostShareComponent } from './shared/components/edit-post-share/edit-post-share.component';
import { SearchUserComponent } from './pages/search/search-user/search-user.component';
import { PostNewComponent } from './pages/news/post-new/post-new.component';
import { CommentPostNewsComponent } from './pages/news/comment-post-news/comment-post-news.component';




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
    NotificationsComponent,
    ErrorComponent,
    RegisterComponent,
    AuthenticationDialogComponent,
    NotificationDialogComponent,
    PhotosComponent,
    PageComponent,
    GroupComponent,
    FriendsComponent,
    FollowingComponent,
    FriendRequestComponent,
    NavTimelineComponent,
    TimelineFollowerComponent,
    TimelineFollowingComponent,
    FollowerComponent,
    FollowerDetailComponent,
    FollowingDetailComponent,
    HeaderTimelineComponent,
    NewsTimelineComponent,
    UserPostComponent,
    ImageSliderComponent,
    CommentPostComponent,
    ShareDialogComponent,
    CommentPostShareComponent,
    TimelinePostShareComponent,
    UserPostShareComponent,
    PostShare_newComponent,
    ConfirmDialogComponent,
    EditPostDialogComponent,
    ComponentsComponent,
    EditPostShareComponent,
    SearchUserComponent,
    PostNewComponent,
    CommentPostNewsComponent
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
    MatSnackBarModule,
    MatButtonModule,
    MatButtonModule,
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
