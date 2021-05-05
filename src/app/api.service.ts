import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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

  makeAdmin(route, body = {}){
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.post<any>(this.url + route, body, { headers})
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

  getMenuCategoryList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    const httpParams:HttpParams = new HttpParams();
  
    return this.http.get<any>(this.url + route +'?item=Menu', { headers})
  }

  getLiquorCategoryList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    const httpParams:HttpParams = new HttpParams();
   
    return this.http.get<any>(this.url + route +'?item=Liqueur', { headers})
  }

  getMenuList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url+"menuItem?filters=item:Menu&page=1&size=1000", { headers })
  }

  getLiquorList(route) {
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url+"menuItem?filters=item:Liqueur&page=1&size=1000", { headers })
  }

  getAvailableOrders(route){
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url+route, { headers })
  }

  getOrderDetails(route){
    console.log(route)
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    return this.http.get<any>(this.url+route, { headers })
  }

  approveOrder(id, isProcessed){
    let email = localStorage.getItem('email') || ""
    let headers = new HttpHeaders({ 'X-User-Id': email });
    let data = {
      isProcessed : isProcessed
    }
    return this.http.patch<any>(this.url+"cart/"+id, data, { headers })
  }

}