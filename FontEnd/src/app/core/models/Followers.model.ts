import { Pageable } from './pageable.model';
import { UserDetail } from './user-detail';
export class Followers {
  content:Follower[];
  page:Pageable;
}
export class Follower {
  id:number;
  user_info:UserDetail;
}

