import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  get_blogs(uid?: any): Promise<any> {
    let options = (uid) ? {headers: {uid: uid}} : {};
    return this.http.get(`http://localhost:8000/get_blogs`, options).toPromise();
  }

  async update_blog(blog: any): Promise<any> {
    return this.http.post(
      `http://localhost:8000/update_blog`,
      {message: 'Hmm.'},
      {headers: blog}
    ).toPromise();
  }

  async create_blog(blog: any): Promise<any> {
    return this.http.put(
      `http://localhost:8000/create_blog`,
      {message: 'Hmmm.'},
      {headers: blog}).toPromise();
  }

  async delete_blog(blog: any): Promise<any> {
    let h = {'id': (blog.id).toString()}
    return this.http.delete(
      `http://localhost:8000/delete_blog`,
      {headers: h}).toPromise();
  }
}
