import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.serviceUrl;
  constructor(private http: HttpClient) { }
  // url = 'http://localhost:8666/spicy/API/';

  // getMenuList() {
  //   return this.http.get(this.url + "menuList.json");
  // }

  getCall(route) {
    return this.http.get<any>(this.url + route)
  }

  postCall(route, payload) {
    return this.http.post<any>(this.url + route, payload)
  }

  get(route) {
    return this.http.get<any>(this.url + route)
  }

  post(route, body = {}) {
    return this.http.post<any>(this.url + route, body)
  }

  item(route, body = {}) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.post<any>(this.url + route, body, { headers })
  }

  itemUpdate(route, body = {}) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.patch<any>(this.url + route, body, { headers })
  }

  cart(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url + route, { headers })
  }

  getCategoryList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url + route, { headers })
  }

  getMenuList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    //url = "http://localhost:9090/v1/menuItem?filters=category:&page=1&size=100";
    return this.http.get<any>(this.url+"menuItem?filters=category:&page=1&size=1000", { headers })
  }

}