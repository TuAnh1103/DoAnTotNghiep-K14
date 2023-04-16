import { Address } from "./address.model";
import { Favorite } from "./favorite.model";
import { FileResponse } from "./file-response.model";

export class UserDetail {
    id:number;
    first_name:string;
    last_name:string;
    gender:boolean;
    dob:Date;
    username:string;
    password:string;
    bio:string;
    cover_image:FileResponse;
    hometown:Address;
    current_city:Address;
    avatar_image:FileResponse;
    created_date:Date;
    user_favorite:Favorite[];
}
