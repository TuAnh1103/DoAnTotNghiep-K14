import { Pageable } from './pageable.model';
import { UserDetail } from './user-detail';
export class FriendRequests {
  content:FriendRequest[];
  page:Pageable;
}
export class FriendRequest {
  id:number;
  user_info:UserDetail;
}
