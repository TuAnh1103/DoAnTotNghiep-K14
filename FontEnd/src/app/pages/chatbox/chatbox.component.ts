import { CommonService } from './../../shared/common.service';
import { Socket } from './../../core/models/socket';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user-detail';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'jquery';
import { MessageRequest, SendMessage } from 'src/app/core/models/sendMessage';
import { Message } from 'src/app/core/models/message';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnChanges{
  @Input() userId:string;
  @Output() closeChat = new EventEmitter<string>();
  private baseUrl: string;
  private headers: any;
  messageText:string;
  receivedMessagesDatabase:Message[];
  receivedMessages:any=[];
  sentMessageDatabase:[];
  allMessage:any=[];
  messageRequest:MessageRequest
  messageFrom:string;
  messageTo:string;
  socket:any;
  stompClient:any;
  connected:boolean=false;
  data:any;
  chatId:string;
  myDetail:UserDetail;
  frienDetail:UserDetail;
  myId:string;
  ngOnChanges(changes: SimpleChanges) {
    this.userId = changes['userId'].currentValue;
    this.messageTo=this.userId;
    this.getFriendDetail(this.userId);
    this.connect();
  }
  close(){
    $('.chat-box').removeClass('show');
    this.closeChat.emit("close");
  }
  constructor(private http:HttpClient,private commonService:CommonService)
  {
    this.baseUrl=this.commonService.webApiUrl;
    this.headers=this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.myId=localStorage.getItem("userId");
    this.getMyDetail(this.myId);
    if(this.userId!=null)
    {
      this.connect();
    }
  }
  async send(){
      const sendMessage={
        chatId:"",
        messageText:"",
        messageFrom:"",
        messageTo:this.messageTo,
      }
        sendMessage.chatId=this.messageFrom+this.messageTo;
        sendMessage.messageText=this.messageText;
        sendMessage.messageFrom=this.messageFrom;
        this.stompClient.send('/app/chat',JSON.stringify(sendMessage),{});
        await this.connect;
  }
  async connect(){
    this.messageFrom=localStorage.getItem("userId");
    this.messageTo=this.userId;
    await this.fetchAllReceivedMessage( this.messageFrom,this.messageTo);
    this.socket=new SockJS(`${this.baseUrl}/chat`);
    this.stompClient=Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      (frame)=>{
        this.socket.connected=true;
        console.log(frame);
        this.stompClient.subscribe('/topic/messages',(tick)=>{
          this.receivedMessages.push(JSON.parse(tick.body));
          console.log(JSON.parse(tick.body));
        })
      },
      (error)=>{
        console.log("chua ket noi dc");
        console.log(error);
        this.connected=false;
      }
    )
  }
  connectChat(){
    this.messageFrom=localStorage.getItem("userId");
    this.messageTo=localStorage.getItem("userTo");
    this.socket=new SockJS(`${this.baseUrl}/chat`);
    this.stompClient=Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      (frame)=>{
        this.socket.connected=true;
        console.log(frame);
        this.stompClient.subscribe('/topic/messages',(tick)=>{
          this.receivedMessages.push(JSON.parse(tick.body));
          console.log(JSON.parse(tick.body));
        })
      },
      (error)=>{
        console.log("chua ket noi dc");
        console.log(error);
        this.connected=false;
      }
    )
  }
  fetchAllReceivedMessage(messageFrom:string,messageTo:string){
    this.http.get( `${this.baseUrl}/api/messages/${messageFrom}/${messageTo}`)
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas;
        console.log(datas);
        this.receivedMessagesDatabase=this.data;
      }
    )
  }
  getAllMessage()
  {
    this.http.get( `${this.baseUrl}/api/messages`)
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.data=datas;

        console.log("allmessage");
        console.log(datas);
        this.allMessage=this.data;
      }
    )
  }
  disconnect(){
    if(this.stompClient){
      this.stompClient.disconnect();
    }
    this.connected=false;
  }
  getMyDetail(id:string){
      return this.http.get(`${this.baseUrl}/user/id/${id}`,{headers:this.headers})
      .pipe(first())
      .subscribe(
        (data)=>{
          this.myDetail=data as UserDetail;
        },
        (error)=>{
          console.log(error)
        }
      )
  }
  getFriendDetail(id:string){
    this.http.get(`${this.baseUrl}/user/id/${id}`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (datas)=>{
        this.frienDetail=datas as UserDetail;
      }
    )
  }
}
