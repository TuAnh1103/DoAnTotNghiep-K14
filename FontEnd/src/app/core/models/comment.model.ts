export class CommentRequest{
  content:string;
  image_id:number;
}
export class CommentResponse{
  id:number;
  content:string;
  image_id:number;
  created_date:Date;

}
