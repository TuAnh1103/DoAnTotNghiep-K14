import { Pageable } from './pageable.model';
import { UserDetail } from './user-detail';
export class Followings {
  content:Following[];
  page:Pageable;
}
export class Following {
  id:number;
  user_info:UserDetail;
}
