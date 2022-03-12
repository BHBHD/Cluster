import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  async get_blogs(uid?: any): Promise<any> {
    let h = {'uid': uid ? uid : ''};
    return this.http.get(`https://api.dayzkillfeed.gg/cluster/get_blogs`, {headers: h}).toPromise();
  }

  async update_blog(blog: any): Promise<any> {
    return this.http.post(
      `https://api.dayzkillfeed.gg/cluster/update_blog`,
      {message: 'Hmm.'},
      {headers: blog}
    ).toPromise();
  }

  async create_blog(blog: any): Promise<any> {
    return this.http.put(
      `https://api.dayzkillfeed.gg/cluster/create_blog`,
      {message: 'Hmmm.'},
      {headers: blog}).toPromise();
  }

  async delete_blog(blog: any): Promise<any> {
    let h = {'id': (blog.id).toString()}
    return this.http.delete(
      `https://api.dayzkillfeed.gg/cluster/delete_blog`,
      {headers: h}).toPromise();
  }
}
