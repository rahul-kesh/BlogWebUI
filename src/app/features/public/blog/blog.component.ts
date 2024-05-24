import { Component,Input,OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { AuthService } from '../../auth/services/auth.service';
import { BlogPostService } from '../../blog-post/services/blog-post.service';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @Input() data:any;
  isCommentBlockActive:boolean=false;
  comment:string="";
constructor(private blogPostService:BlogPostService,private authService:AuthService,
  private toastService :ToastService ){}
ngOnInit(): void {
  this.getLikeStatus(this.data.id);
  this.getLikeCount(this.data.id);
  this.getAllComments(this.data.id);
}

  getLikeStatus(blogId:string){
    this.blogPostService.getLikeStatus(blogId).subscribe({
      next:(response)=>{
        this.data.isActive=response;
      },
      // error:error=>{
      //  if(error.status==401){
      //   this.toastService.info("You are not logged In");
        
      //  }
      // }
    })
  }

  getLikeCount(blogId:string){
    this.blogPostService.getLikeCount(blogId).subscribe({
      next:(response)=>{
        console.log("Count=>"+response);
        this.data.likeCount=response;
      }
    })
  }

  onLike(blogId:string,isActive:boolean){
    isActive=!isActive;
    this.blogPostService.likeBlog(blogId,isActive).subscribe({
      next:()=>{
        this.getLikeStatus(blogId);
        this.getLikeCount(blogId);
      },
      error:error=>{
        if(error.status==401){
          this.toastService.error("You are not logged In");
        }
      }
    })
    
  }

  isCommentActive(){
    this.isCommentBlockActive=!this.isCommentBlockActive;
  }

  onComment(blogId:string){
  const user=this.authService.getUser();
    const emailName=`${user?.email?.charAt(0).toUpperCase()}${user?.email?.slice(1,user?.email.indexOf('@'))}`;
    this.blogPostService.addComment(blogId,this.comment,emailName).subscribe({
      next:()=>{
        this.toastService.info("Commented");
        this.getAllComments(blogId);
      }
      ,
      error:error=>{
        if(error.status==401){
          this.toastService.error("You are not logged In");
        }
      }
    })
    console.log(this.comment);
  }
  // getAllUsers(){

  // }
  
  getAllComments(blogId:string){
    this.blogPostService.getAllComments(blogId).subscribe({
      next:response=>{
        console.log(response);
        this.data.comment=response;
      }
    })
  }
}
