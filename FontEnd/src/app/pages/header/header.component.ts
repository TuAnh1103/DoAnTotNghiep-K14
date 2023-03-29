import { CommonService } from 'src/app/shared/common.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { first } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user-detail';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private baseUrl:string;
  private headers:any;
  id:string;
  user:UserDetail;
  constructor(private http:HttpClient,private commonService:CommonService) {
    this.id = localStorage.getItem('userId');
    this.baseUrl = this.commonService.webApiUrl;
    this.headers = this.commonService.createHeadersOption(localStorage.getItem('token'));
    this.getUserInfo();
   }

  ngOnInit(): void {
    jQuery(document).ready(function($) {

      "use strict";

    //------- Notifications Dropdowns
      $('.top-area > .setting-area > li').on("click",function(){
      $(this).siblings().children('div').removeClass('active');
      $(this).children('div').addClass('active');
      return false;
      });
    //------- remove class active on body
      $("body *").not('.top-area > .setting-area > li').on("click", function() {
      $(".top-area > .setting-area > li > div").removeClass('active');
     });


    //--- user setting dropdown on topbar
    $('.user-img').on('click', function() {
      $('.user-setting').toggleClass("active");
      return false;
    });

    //--- side message box
    $('.friendz-list > li, .chat-users > li').on('click', function() {
      $('.chat-box').addClass("show");
      return false;
    });
      $('.close-mesage').on('click', function() {
        $('.chat-box').removeClass("show");
        return false;
      });

    /*--- socials menu scritp ---*/
      $('.trigger').on("click", function() {
          $(this).parent(".menu").toggleClass("active");
        });

    /*--- emojies show on text area ---*/
      $('.add-smiles > span').on("click", function() {
          $(this).parent().siblings(".smiles-bunch").toggleClass("active");
        });

    // delete notifications
    $('.notification-box > ul li > i.del').on("click", function(){
        $(this).parent().slideUp();
      return false;
      });

    /*--- socials menu scritp ---*/
      $('.f-page > figure i').on("click", function() {
          $(".drop").toggleClass("active");
        });

    //===== Search Filter =====//
      (function ($) {
      // custom css expression for a case-insensitive contains()

      function listFilter(searchDir, list) {
        var form = $("<form>").attr({"class":"filterform","action":"#"}),
        input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Search Contacts..."});
        $(form).append(input).appendTo(searchDir);

        $(input)
        .change( function () {
        var filter = $(this).val();
        if(filter) {
          $(list).find("li:not(:Contains(" + filter + "))").slideUp();
          $(list).find("li:Contains(" + filter + ")").slideDown();
        } else {
          $(list).find("li").slideDown();
        }
        return false;
        })
        .keyup( function () {
        $(this).change();
        });
      }

    //search friends widget
      }(jQuery));

    //progress line for page loader
      $('body').show();


    // Sticky Sidebar & header
      if($(window).width() < 769) {
        jQuery(".sidebar").children().removeClass("stick-widget");
      }


    /*--- topbar setting dropdown ---*/
      $(".we-page-setting").on("click", function() {
          $(".wesetting-dropdown").toggleClass("active");
        });

    /*--- topbar toogle setting dropdown ---*/
    $('#nightmode').on('change', function() {
        if ($(this).is(':checked')) {
            // Show popup window
            $(".theme-layout").addClass('black');
        }
      else {
            $(".theme-layout").removeClass("black");
        }
    });

    //**** Slide Panel Toggle ***//
        $("span.main-menu").on("click", function(){
           $(".side-panel").addClass('active');
          $(".theme-layout").addClass('active');
          return false;
        });

        $('.theme-layout').on("click",function(){
          $(this).removeClass('active');
           $(".side-panel").removeClass('active');


        });


    // login & register form
      $('button.signup').on("click", function(){
        $('.login-reg-bg').addClass('show');
        return false;
        });

        $('.already-have').on("click", function(){
        $('.login-reg-bg').removeClass('show');
        return false;
        });

    /** Post a Comment **/
    jQuery(".post-comt-box textarea").on("keydown", function(event) {

      if (event.keyCode == 13) {
        var comment = jQuery(this).val();
        var parent = jQuery(".showmore").parent("li");
        var comment_HTML = '	<li><div class="comet-avatar"><img src="images/resources/comet-1.jpg" alt=""></div><div class="we-comment"><div class="coment-head"><h5><a href="time-line.html" title="">Jason borne</a></h5><span>1 year ago</span><a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a></div><p>'+comment+'</p></div></li>';
        $(comment_HTML).insertBefore(parent);
        jQuery(this).val('');
      }
    });

    //inbox page
    //***** Message Star *****//
        $('.message-list > li > span.star-this').on("click", function(){
          $(this).toggleClass('starred');
        });


    //***** Message Important *****//
        $('.message-list > li > span.make-important').on("click", function(){
          $(this).toggleClass('important-done');
        });




    //------- offcanvas menu

      const menu = document.querySelector('#toggle');
      const menuItems = document.querySelector('#overlay');
      const menuContainer = document.querySelector('.menu-container');
      const menuIcon = document.querySelector('.canvas-menu i');

      function toggleMenu(e) {
        menuItems.classList.toggle('open');
        menuContainer.classList.toggle('full-menu');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.add('fa-times');
        e.preventDefault();
      }

      if( menu ) {
        menu.addEventListener('click', toggleMenu, false);
      }

    // Responsive nav dropdowns
      $('.offcanvas-menu li.menu-item-has-children > a').on('click', function () {
        $(this).parent().siblings().children('ul').slideUp();
        $(this).parent().siblings().removeClass('active');
        $(this).parent().children('ul').slideToggle();
        $(this).parent().toggleClass('active');
        return false;
      });



    });
  }
  getUserInfo(){
    return this.http.get(`${this.baseUrl}/user/id/${this.id}`,{headers:this.headers})
    .pipe(first())
    .subscribe(
      (data)=>{
        this.user=data as UserDetail;
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  logout(){
    localStorage.clear();
  }
}





