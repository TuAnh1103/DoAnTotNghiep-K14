import { Pageable } from './pageable.model';
import { UserDetail } from './user-detail';
export class Friends {
  content:Friend[];
  page:Pageable;
}
export class Friend {
  id:number;
  user_info:UserDetail;
}
