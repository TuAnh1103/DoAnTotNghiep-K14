import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import * as jQuery from 'jquery';
import { first, map } from 'rxjs';
import { Friend, Friends } from 'src/app/core/models/friends.model';
import { UserDetail } from 'src/app/core/models/user-detail';
import { ApiService, Chat, User } from 'src/app/core/service/api/api.service';
import { HelperService } from 'src/app/core/service/helper/helper.service';
import { WebSocketAPI } from 'src/app/core/service/web-soket-api.service';
import { CommonService } from 'src/app/shared/common.service';
import * as jquery1 from 'src/assets/admin/vendor/jquery/jquery';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  private baseUrl: string;
  private headers: any;
  listFriend: Friend[];
  page: any;
  data:Friends;
  item:any;
  show:boolean=true;
  userTo:string;
  id:string;
  user:UserDetail;
  chatUser:UserDetail;
  users: Array<any>=undefined; // users list.
  message: string = ''; // the  message to be sent
  public messages: Array<any> = [] // messages array/
  temp: any; // for handling temporory data from observables.
  userList: Array<any>=undefined;
  chat:Chat;
  showMessages = false; //Toggle to select a conversation.
  constructor(public api:ApiService,private helper: HelperService,
    private db: AngularFireDatabase,
    private router:Router,private route:ActivatedRoute,
    private http: HttpClient, private commonService: CommonService) {
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(
      localStorage.getItem('token')
    );

    this.id = localStorage.getItem('userId');
    this.getAllFriend()
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas as Friends;
        this.listFriend=this.data.content;
        console.log(this.listFriend);
      },
      (error)=>{
        console.log(error);
      }
    )
    this.getUserInfo(localStorage.getItem('userId')).subscribe(
      (data)=>{
        this.user=data as UserDetail;
      },
      (error)=>{
        console.log(error)
      }
    );
    this.getAllUsers();
  }
  getAllFriend() {
    this.page={
      index:0,
      size:5
    };
    return this.http.post(`${this.baseUrl}/friends/getall/me`, this.page, {
      headers: this.headers
    });
  }
  getUserInfo(id:string){
    return this.http.get(`${this.baseUrl}/user/id/${id}`,{headers:this.headers})
    .pipe(first());
  }
  ngOnInit(): void {
    this.getAllUsers();
    // this.webSocketAPI = new WebSocketAPI(new ChatMessageComponent(this.router,this.route,this.http, this.commonService));
    (function($) {
      "use strict";
      var position = $(".chat-search").last().position().top;
      $('.scrollable-chat-panel').scrollTop(position);

      $('.chat-upload-trigger').on('click', function(e) {
        $(this).parent().find('.chat-upload').toggleClass("active");
      });
      $('.user-detail-trigger').on('click', function(e) {
        $(this).closest('.chat').find('.chat-user-detail').toggleClass("active");
      });
      $('.user-undetail-trigger').on('click', function(e) {
        $(this).closest('.chat').find('.chat-user-detail').toggleClass("active");
      });
    })(jQuery);
    this.route.paramMap.subscribe((params)=>{
      this.id = params.get('chatId');
      this.getUserInfo(this.id).subscribe(
        (data)=>{
          this.chatUser=data as UserDetail;
          console.log(this.chatUser);
          this.openChat(this.chatUser);
        },
        (error)=>{
          console.log(error)
        }
      )
      // this.webSocketAPI._connect();
    })

  }
  openChat(user:UserDetail){
    this.chatUser=user;
    let user_chat:User;
    console.log(this.userList);
    (this.userList|| []).forEach(u=>{
      if(u.email===user.email)
      {
        user_chat=u;
        console.log(user_chat);
      }
    })
    this.selectUser(user_chat);
  }
  getAllUsers() {
    this.api.setCurrentUser(localStorage.getItem('uid')) //setting up the uid in the service for easy access.
    this.api.getUsers().pipe(
      map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data();
          let id = a.payload.doc.id;
          return {...data}
        })
      })
    ).subscribe(data => {
      console.log('data', data)
      this.userList=data;
        this.users = data.filter((item)=>{
          let find = this.api.currentUser.conversations?.find(el => el.uid == (item.uid||undefined));
          if(!find){
            return item;
          }
        })
  })
}
//Selecting A User from the list (onclick)  to talk
async selectUser(user) {
  try {
    this.helper.closeModal()
  } catch (e) { console.log(e) }

  if (this.api.currentUser.conversations == undefined) {
    //means user has no conversations.
    this.api.currentUser.conversations = [];
  }
  let convo = [...this.api.currentUser.conversations]; //spread operators for ensuring type Array.
  let find = convo.find(item => item.uid == user.uid); // Check If Its the same person who user has talked to before,
  if (find) { // Conversation Found
    this.api.getChat(find.chatId).subscribe(m => {
      this.temp = m;
      // set the service values
      this.api.chat = this.temp[0];
      console.log(this.api.chat);
      this.chat=this.temp[0];
      console.log(this.chat);
      this.messages = this.api.chat.messages == undefined ? [] : this.api.chat.messages
      console.log(this.messages);
      this.showMessages = true;
      setTimeout(() => {
        //this.triggerScrollTo() //scroll to bottom
      }, 1000);
      return
    })
  } else {
    /* User is talking to someone for the very first time. */
    this.api.addNewChat().then(async () => { // This will create a chatId Instance.
     // Now we will let both the users know of the following chatId reference
      let b = await this.api.addConvo(user); //passing other user info
    })

  }
}

 /* Sending a  Message */
 sendMessage() {
  // If message string is empty
  if (this.message == '') {
    alert('Enter message');
    return
  }
  //set the message object
  let msg = {
    senderId: this.api.currentUser.uid,
    senderName: this.api.currentUser.name,
    timestamp: new Date(),
    content: this.message
  };
  //empty message
  this.message = '';
  //update
  this.messages.push(msg);
  console.log('list', this.messages);
  this.api.pushNewMessage(this.messages,this.chat).then(() => {
    console.log('sent');
  })
}
}
