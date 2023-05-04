import { FilterPipeModule } from 'ngx-filter-pipe';
import { AngularFireModule } from '@angular/fire/compat';
import { FollowerDetailComponent } from './pages/timeline/timeline-follower/follower-detail/follower-detail.component';
import { TimelineFollowingComponent } from './pages/timeline/timeline-following/timeline-following.component';
import { TimelineFollowerComponent } from './pages/timeline/timeline-follower/timeline-follower.component';
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
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { SideNavAdminComponent } from './admin/side-nav-admin/side-nav-admin.component';
import { FooterAdminComponent } from './admin/footer-admin/footer-admin.component';
import { TopBarAdminComponent } from './admin/top-bar-admin/top-bar-admin.component';
import { AddressAdminComponent } from './admin/address-admin/address-admin.component';
import { AddressComponent } from './admin/address-admin/address/address.component';
import { FavoriteAdminComponent } from './admin/favorite-admin/favorite-admin.component';
import { FavoriteComponent } from './admin/favorite-admin/favorite/favorite.component';
import { PostAdminComponent } from './admin/post-admin/post-admin.component';
import { PostListComponent } from './admin/post-admin/post-list/post-list.component';
import { PostDetailComponent } from './admin/post-admin/post-detail/post-detail.component';
import { CommentPostDetailComponent } from './admin/post-admin/comment-post-detail/comment-post-detail.component';
import { SharePostAdminComponent } from './admin/share-post-admin/share-post-admin.component';
import { PostShareListComponent } from './admin/share-post-admin/post-share-list/post-share-list.component';
import { CommentPostShareAdminComponent } from './admin/share-post-admin/comment-post-share-admin/comment-post-share-admin.component';
import { UserAdminComponent } from './admin/user-admin/user-admin.component';
import { UserManagementComponent } from './admin/user-admin/user-management/user-management.component';
import { SharePostAdminDetailComponent } from './admin/share-post-admin/share-post-admin-detail/share-post-admin-detail.component';
import { ImageAdminComponent } from './admin/image-admin/image-admin.component';
import { ImageListComponent } from './admin/image-admin/image-list/image-list.component';
import { UserdetailViewComponent } from './admin/userdetail-view/userdetail-view.component';
import { UserViewComponent } from './admin/userdetail-view/user-view/user-view.component';
import { SuggestFriendComponent } from './pages/sidebar/suggest-friend/suggest-friend.component';
import { ChatMessageComponent } from './pages/chat-message/chat-message.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChatMessageContentComponent } from './pages/chat-message/chat-message-content/chat-message-content.component';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {MatListModule} from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollToBottomDirective } from './core/directive/scroll-to-bottom-directive';
import { MatSelectModule } from '@angular/material/select';
import { AddNewPostComponent } from './shared/components/add-new-post/add-new-post.component';
import { PrivacyDialogComponent } from './shared/components/privacy-dialog/privacy-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { EditCommentComponent } from './shared/components/edit-comment/edit-comment.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { AuthenRecoveryComponent } from './shared/components/authen-recovery/authen-recovery.component';
import { ChangeEmailComponent } from './pages/change-email/change-email.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ScrollToBottomDirective,
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
    TimelinePhotosComponent,
    NotificationsComponent,
    ErrorComponent,
    RegisterComponent,
    AuthenticationDialogComponent,
    NotificationDialogComponent,
    PhotosComponent,
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
    CommentPostNewsComponent,
    HomeAdminComponent,
    SideNavAdminComponent,
    FooterAdminComponent,
    TopBarAdminComponent,
    AddressAdminComponent,
    AddressComponent,
    FavoriteAdminComponent,
    FavoriteComponent,
    PostAdminComponent,
    PostListComponent,
    PostDetailComponent,
    CommentPostDetailComponent,
    SharePostAdminComponent,
    PostShareListComponent,
    CommentPostShareAdminComponent,
    UserAdminComponent,
    UserManagementComponent,
    PostAdminComponent,
    CommentPostShareAdminComponent,
    SharePostAdminDetailComponent,
    ImageAdminComponent,
    ImageListComponent,
    UserdetailViewComponent,
    UserViewComponent,
    SuggestFriendComponent,
    ChatMessageComponent,
    ChatMessageContentComponent,
    AddNewPostComponent,
    PrivacyDialogComponent,
    EditCommentComponent,
    RecoveryPasswordComponent,
    AuthenRecoveryComponent,
    ChangeEmailComponent,
    DetailPostComponent
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
    MatRadioModule,
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
    MatListModule,
    PerfectScrollbarModule,
    MatFormFieldModule,
    ScrollToModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ScrollingModule,
    FilterPipeModule,
    MatSelectModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  providers: [AuthService,AuthGuardService,{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
