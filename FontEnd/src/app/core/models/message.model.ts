import { UserDetail } from "./user-detail";

export class Message {
  message:string;
  createdAt:Date;
  sender:string;
  constructor({message,createdAt,sender}){
    this.message=message;
    this.createdAt=createdAt;
    this.sender= sender;
  }
}
