import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = environment.endpoint + '/blogs';
  private _blogs: Blog[] = [];

  constructor(
    private http: HttpClient
  ) { }

  get blogs() {
    return this._blogs;
  }

  get_blog(id: any, uid: any) {
    console.log(id, uid, this._blogs);
    return this._blogs.find(blog => blog.id == id && blog.uid == uid);
  }

  get_blogs_by_uid(uid: any) {
    return this._blogs.filter(blog => blog.uid == uid);
  }

  async init() {
    if (this._blogs.length == 0) {
      this.get_blogs().subscribe({
        next: (blogs) => {
          this._blogs = blogs;
        }
      });
    }
  }

  get_blogs(uid?: any): Observable<Blog[]> {
    if (uid) return this.http.get<Blog[]>(this.url + '/get_blogs', { params: { uid: uid } });
    else return this.http.get<Blog[]>(this.url + '/get_blogs');
  }

  async update_blog(blog: any): Promise<any> {
    return this.http.post(
      `http://localhost:8000/blogs/update_blog`,
      { message: 'Hmm.' },
      { headers: blog }
    ).toPromise();
  }

  async create_blog(blog: any): Promise<any> {
    return this.http.put(
      `http://localhost:8000/blogs/create_blog`,
      { message: 'Hmmm.' },
      { headers: blog }).toPromise();
  }

  delete_blog(blog: Blog): Observable<any> {
    return this.http.delete(this.url + '/delete_blog', { params: { id: blog.id } });
  }
}
