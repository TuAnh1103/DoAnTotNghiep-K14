
import { FileResponse } from "./file-response.model";
import { Pageable } from "./pageable.model";
import { Author } from "./post.model.ts";

export class CommentRequest{
  content:string;
  image_id:number;
}
export class CommentList{
  content:CommentResponse;
  page:Pageable;
}
export class CommentResponse{
  id:number;
  content:string;
  image_id:number;
  created_date:Date;
  author:Author;
  image:FileResponse;
}
export class CommentUpdate{
  id:number;
  content:string;
  image_id:number;
}
