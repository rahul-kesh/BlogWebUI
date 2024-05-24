import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts?addAuth=true`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }
  
  likeBlog(blogId:string,isActive:boolean){
    return this.http.post(`${environment.apiBaseUrl}/api/Likes/${blogId}?isActive=${isActive}&addAuth=true`,{});

  }

  getLikeStatus(blogId:string){
    return this.http.get(`${environment.apiBaseUrl}/api/Likes?blogId=${blogId}&addAuth=true`);
  }

  getLikeCount(blogId:string){
    return this.http.get(`${environment.apiBaseUrl}/api/Likes/count?blogId=${blogId}`);
  }

  addComment(blogId:string,comment:string,userName:string){
    return this.http.post(`${environment.apiBaseUrl}/api/Likes/comment?blogId=${blogId}&comment=${comment}&userName=${userName}&addAuth=true`,{});
  }
  getBlogPostByUserId(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts/MyBlog?addAuth=true`);
  }  
  getAllComments(blogId:string){
    return this.http.get(`${environment.apiBaseUrl}/api/Likes/comments?blogId=${blogId}`);
  }
  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${urlHandle}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updatedBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
}
