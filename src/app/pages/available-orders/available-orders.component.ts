import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-available-orders',
  templateUrl: './available-orders.component.html',
  styleUrls: ['./available-orders.component.less']
})
export class AvailableOrdersComponent implements OnInit {
 
  availableOrders:any=[];
  currentOrderDetails: any = {};
  addOns = []
  items = []
  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.fetchOrders()
  }

  fetchOrderDetails(order){
    let router = "orderStauts/" + order.identifier
    this.items = [];
    this.addOns = [];
    this.service.getOrderDetails(router).subscribe(
      (res) =>{
        console.log(res)
       this.currentOrderDetails = res
       let i: number =1;
       this.currentOrderDetails.itemList.forEach(element => {
         let item = {
           SLNo: i ,
           name : element.name,
           spiceLevel: element.spiceLevel,
           specialNote: element.specialNote,
           quantity: element.quantity
         }
         this.items.push(item);
         i = i+ 1;
         if(element.addOnItemList != null){
          element.addOnItemList.forEach(ele => {
            let addOn = {
              name: ele.name,
              quantity: ele.quantity
            }
            this.addOns.push(addOn);
          });
 
         }
         
       });
       console.log(this.items)
      }
    )
    
  }

  fetchOrders(){
    this.service.getAvailableOrders("orderStauts").subscribe(
      (res) =>{
        console.log(res.content)
       this.availableOrders = res.content
      }
    )

  }

  onSuccess(order){
    let isProcessed = true;
    let id = order.identifier;
    console.log(id)
    this.service.approveOrder(id, isProcessed).subscribe(
      (res) =>{
        console.log(res.content)
        window.location.reload()
       this.availableOrders = res.content
      }
    )

  }

 

}
