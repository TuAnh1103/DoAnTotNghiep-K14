import { SlideInterface } from 'src/app/core/types/slide.interface';
import { Page, Pageable } from './pageable.model';
import { FileResponse } from "./file-response.model";

export class Post {
  content:string;
  privacy:number;
  images:any;
}
export class PostResponseList{
  content:PostResponse[];
  page:Pageable;
}
export class PostResponse{
  id:number;
  content:string;
  privacy:number;
  liked:boolean;
  author:Author;
  created_date:Date = new Date();
  images:SlideInterface[];
  like_count:number;
  cmt_count:number;
  share_count:number;
}
export class Author
{
  id:number;
  username:string;
  last_name:string;
  first_name:string;
  avatar_image:FileResponse;
}
