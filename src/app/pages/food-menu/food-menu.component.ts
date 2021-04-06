import { iif } from 'rxjs';
import { AlertmessageService } from 'src/app/alertmessage.service';
import { ApiService } from 'src/app/api.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.less']
})
export class FoodMenuComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  navClicked : boolean = false

  isMenuLink: boolean = true;
  menusList: Object = {};
  filter: boolean = false;
  categoryIconMap = {
    "starters": '../../../assets/images/icons/biryani.png',
    "rice": '../../../assets/images/icons/raita.png',
    "raitas": '../../../assets/images/icons/maincourse.png',
    "maincourse": '../../../assets/images/icons/salad.png',
    "salads": '../../../assets/images/icons/roti.png',
    "bread/rotis": '../../../assets/images/icons/rice.png',
    "streetfoods": '../../../assets/images/icons/streetFood.png'
  };

  categoryList: any = [];
  liquorList: any = [];
  menuList: any = []; 
  catSelectedIndex: number = 2;
  subCatSelectedIndex: number = 2;
  isEditClicked : boolean = false;
  foodData = {};
  selectedData = {};
  popupData: any = {};
  isPopupShow = false;
  subCat = [
  ];
  finalResults = [];
  cartItems: any = {
    itemList: [],
    totalAmount: 0,
    tax: 0,
    // subTotal: 0,
    email: '',
    identifier:''

  };
  startersData = []
  showStarters: Boolean = false
  cartData: any = { spicyLevel: 'none', type: '', addons: [] }
  addonsData = {}
  cartTotalAmount = 0
  isConfirmPopup: Boolean = false;
  userName = '';
  cartItemSelectedData = {};
  isCancelConfirm: Boolean = false;
  constructor(private _ApiService: ApiService, private _AlertmessageService: AlertmessageService) {
  }

  ngOnInit(): void {
    this.isCancelConfirm = false;
    this.getCategories()
    this.getCart()
    this.userName = localStorage.getItem('name');
    this._AlertmessageService.errorMessageShow('');

  }

  getCategories() {
    this._ApiService.getCategoryList('category').subscribe((res: any) => {
      res.content.map(e => {
        let category = e.content
        //let itemType = e.itemType;
        if(category == "Steaks"){
          this.menuList.push({
            title: category,
            url: this.categoryIconMap[category.toLowerCase()]
          })
        }else{
          this.liquorList.push({
            title: category,
            url: this.categoryIconMap[category.toLowerCase()]
          })
        
        }
        if(this.isMenuLink){
          this.categoryList = this.menuList;
        }else{
          this.categoryList = this.liquorList;
        }
       // this.categoryList =
        this.categoryList.push({
          title: category,
          url: this.categoryIconMap[category.toLowerCase()]
        })
      })
      this.getMenuList()
    }, e => {
      console.log(e)
    })
  }

  getMenuList() {
    this._ApiService.getMenuList('menuItem').subscribe((res: any) => {
      this.menusList = res;
      this.prepareData();
      this.itemSelected(2, 'Starters', 'main')
    }, e => {
      console.log(e)
    })
  }

  itemSelected(_index, _type, _subType) {
    this.showStarters = false
    if (_subType === 'main') {
      this.subCatSelectedIndex = 0;
      this.catSelectedIndex = _index;
      this.selectedData = _type === 'All' ? this.foodData[this.categoryList[2].title] : this.foodData[_type];
      this.cartData.type = _type
      if (_type == 'MainCourse') {
        this.showStarters = true
      }
      this.subCatUpdate(this.selectedData, _type)
    }
  }

  subCatUpdate(data, _type) {
    this.subCat = [];
    for (const key in data) {
      this.subCat.push(key);
    }
    this.subCatData(0, '');
  }

  subCatData(_index, _type) {
    this.subCatSelectedIndex = _index;
    this.finalResults = _type ? this.selectedData[_type] : this.selectedData[this.subCat[0]];
  }

  prepareData() {
    let dataMap = {}
    this.menusList['content'].forEach((item) => {
      item.itemList.forEach((itemInside) => {
        if (itemInside.category == 'Starters') {
          itemInside.checked = false
          this.startersData.push(itemInside)
        }
        if (dataMap[itemInside.category]) {
          if (dataMap[itemInside.category][itemInside.subType]) {
            dataMap[itemInside.category][itemInside.subType].push(itemInside)
          } else {
            dataMap[itemInside.category][itemInside.subType] = [itemInside]
          }
        } else {
          dataMap[itemInside.category] = {
            [itemInside.subType]: [itemInside]
          }
        }
      })
    })
    this.foodData = dataMap;
    this.selectedData = this.foodData;
    this.itemSelected(2, 'All', 'main')
  }

  onAddonSelect(event, item: any) {

    this.cartTotalAmount = 0
    let quantity = 1;
    let amount = this.popupData['amount'];
    if(this.cartItemSelectedData) {
      if(this.cartItemSelectedData['quantity'])
        quantity = this.cartItemSelectedData['quantity'];
      if(this.cartItemSelectedData['amount'])
        amount = this.cartItemSelectedData['amount'];
    }
    if (event.target.checked) {
      this.addonsData[item.name] = {
        name: item.name,
        amount: item.amount,
        quantity: 1,
        checked:true

      }
    } else  {
      
      this.cartTotalAmount = this.addonsData[item.name].amount * quantity
      this.cartItemSelectedData['netAmount'] -= this.cartTotalAmount
      delete this.addonsData[item.name]
    }
    this.cartData.addons = []
    if( this.addonsData) {
      this.cartItemSelectedData['netAmount'] = amount * quantity
      for (const iterator in this.addonsData) {
        this.cartTotalAmount += this.addonsData[iterator].amount * quantity
        this.cartData.addons.push(this.addonsData[iterator])
        this.cartItemSelectedData['netAmount'] += this.addonsData[iterator].amount * quantity
      }
    }
    

  }

  addToCard(item: any, _type: any, identifier: any) {
      
    if (!_type && !item.quantity) {
      item.quantity = 1
    }

    if (_type == 'plus' || _type == 'minus') {
      item.isOnlyQuantity = true
    }
    if (_type === 'plus') {
      item.quantity = item.quantity + 1;
    }
    let netAmount;
    if(_type === 'new'){
      netAmount = item.amount;
    }else {
      netAmount = item.amount * item.quantity
    }
    if ((this.isEditClicked && _type != 'new') || this.isConfirmPopup) {
      identifier = item.identifier;
    }
    
    if (this.cartData && this.cartData.addons && this.cartData.addons.length > 0) {
      this.cartData.addons.map(e => { netAmount += e.amount * item.quantity });
    } else if(item.addOnItemList && item.addOnItemList.length > 0) {
      item.addOnItemList.map(e => { netAmount += e.amount * item.quantity });
    }
    
    let addons = (this.cartData.addons && this.cartData.addons.length) ? this.cartData.addons : item.addOnItemList
    let itemData: any = {
      "name": item.name,
      "quantity": item.quantity,
      "type": this.cartData.type || item.type,
      "subType": item.subType,
      "spiceLevel": this.cartData.spicyLevel || item.spiceLevel,
      "netAmount": netAmount,
      "amount": item.amount,
      "addOnItemList": addons,
      "specialNote": this.cartData.specialNote || item.specialNote,
      "image" : item.image
    }
    console.log(itemData)
    if (((_type && identifier || this.isEditClicked) && _type !== 'new')  || this.isConfirmPopup) {
      itemData.identifier = identifier
      this._ApiService.itemUpdate(`item/${itemData.identifier}`, itemData).subscribe(res => {
        //this.popupData = {};
        //this.cartData = { spicyLevel: 'none', type: '', addons: [] };
        this.resetModel();
        this._ApiService.cart('cart').subscribe(res => {
          this.cartItems = res;
          if (!this.cartItems) {
            this.cartItems = {}
            this.cartItems = {
              totalAmount: 0,
              tax: 0,
              subTotal: 0,
              email: ''
            }
          }
          this._AlertmessageService.successAlert('Your cart has updated successfully')
        })
        this.isPopupShow = false;
      }, error => {
        this._AlertmessageService.errorAlert(error)
        console.log(error)
      })
    } else {
      this._ApiService.item('item', itemData).subscribe(res => {
        console.log("item Resonse : ", res)
        localStorage.setItem('email', res.email)
        this._ApiService.cart('cart').subscribe(res => {
          this.resetModel();
          
          console.log(this.cartData);
          this.cartItems = res;
          if (!this.cartItems) {
            this.cartItems = {
              totalAmount: 0,
              tax: 0,
              subTotal: 0,
              email: ''
            }
          }

          this._AlertmessageService.successAlert('Your cart has updated successfully')
        })
        this.isPopupShow = false;
      }, error => {
        this._AlertmessageService.errorAlert(error)
        console.log(error)
      })

    }
    this.isEditClicked = false;
    this.cartItemSelectedData= {};
    this.addonsData={};
    this.getCartDetails();

  }

  onProductView(item) {
    //this.resetModel();
    this.popupData = item
    this.isPopupShow = true
    this.cartData.identifier = null
    this.cartData.spicyLevel = "none"
   //let selectedItem= this.cartItems.itemList.find((x)=>x.name==item.name)||{}
    for (const starter of this.startersData) {
      starter.checked = false
    };
    /*if(Object.keys(selectedItem).length){
      let  list=selectedItem.addOnItemList||[];
      list.map((data) => {
        let index = this.startersData.findIndex((x) => x.name==data.name);
        if(index > -1) {
          this.checkboxes['_results'][index].nativeElement.checked = true;
        }
      }) 
    }*/
    this.cartItemSelectedData={}
    this.cartTotalAmount=0; 
  }

  getCart() {
    this._ApiService.cart('cart').subscribe(res => {
      console.log('cartData', res)
      if (res) {
        this.cartItems = res;
      }
    })
  }

  onCartEdit(item) {
    //this.isCancelConfirm = false;
    if(this.isCancelConfirm) {
      item.quantity = 1
    }
    this.isEditClicked = true;
    let index = 0
    if(item.addOnItemList && item.addOnItemList.length >0) {
      this.showStarters = true;
    }
    for (const iterator of this.categoryList) {
      if (iterator.title == item.type) {
        this.itemSelected(index, item.type, 'main')
        break
      }
      index++
    }

    for (const starter of this.startersData) {
      starter.checked = false
    }
    this.cartData.identifier = item.identifier
    this.popupData.name = item.name
    //this.popupData = item
    //this.cartData= item
    this.popupData.identifier = item.identifier
    this.popupData.amount = item.amount
    this.cartData.addons = item.addOnItemList
    this.cartData.spicyLevel = item.spiceLevel
    this.cartData.specialNote = item.specialNote;
    this.popupData.quantity = item.quantity;
    if(this.isCancelConfirm) {
      item.netAmount = item.amount;
    }  
    this.cartTotalAmount = 0
    this.addonsData = {}
    if(item && item.addOnItemList && item.addOnItemList.length >0)
    for (const iterator of item.addOnItemList) {
      for (const starter of this.startersData) {
        if (iterator.name == starter.name) {
          starter.checked = true
          this.showStarters = true
          //this.cartTotalAmount += starter.amount
          if(this.isCancelConfirm) {
            item.netAmount += starter   .amount;
          } 
          this.addonsData[starter.name] = {
            name: starter.name,
            amount: starter.amount,
            quantity: 1
          }
        }
      }
    }
    let  list=item.addOnItemList||[];
      list.map((data) => {
        let index = this.startersData.findIndex((x) => x.name==data.name);
        if(index > -1) {
          if(this.checkboxes && this.checkboxes['_results'] && this.checkboxes['_results'][index]) 
          this.checkboxes['_results'][index].nativeElement.checked = true;
        }
      })
    this.cartItemSelectedData = item 
    this.isPopupShow = true
  }
  isRepeatOrderPopup() {
    this.isConfirmPopup = true;
  }
  totalAddon(item){
    let amount = 0;
    if(item && item.length > 0)
    for(let i = 0; i<= item.length; i++){
      if(item[i] && item[i].amount && item[i].amount > 0){
        amount = amount + item[i]['amount']
      }
    }
    return amount;
  }
  /*resetModel() {
    this.popupData = {};
    this.cartData = { spicyLevel: 'none', type: '', addons: [] };
    for(var i = 0; i < this.startersData.length ; i++) {
      this.startersData[i].checked = false
      console.log(this.startersData[i].checked )
    }

    
  }*/

  resetModel() {
    this.addonsData={};
    this.popupData = {};
    this.cartData = { spicyLevel: 'none', type: '', addons: [], specialNote: '' };
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.cartItemSelectedData= {};
    this.getCartDetails();
    this.isConfirmPopup = false;
    this.isCancelConfirm = false;

  }

  getCartDetails() {
    this._ApiService.cart('cart').subscribe(res => {
      this.cartItems = res;
    })
  }

  menu(){
    
    this.isMenuLink = true;
    //let category = this.categoryTestData.content;
 /*for (let counter = 0; counter <= this.categoryTestData.content.length; counter++) {
  this.categoryList.push({
    title: 'streetfoods',//this.categoryTestData.content[counter].content,
   url: this.categoryIconMap['streetfoods']
  })
}*/
this.categoryList = this.menuList;
    
  }
  licker(){
    this.isMenuLink = false;
    //let category = this.categoryTestData.content;
    /*for (let counter = 0; counter <= this.categoryTestData.content.length; counter++) {
      this.categoryList.push({
        title: 'Licker '+counter,//this.categoryTestData.content[counter].content,
      url: this.categoryIconMap['streetfoods']
      })
    }*/
    //this.subCat = [];
  this.categoryList = this.liquorList;
  }
}
