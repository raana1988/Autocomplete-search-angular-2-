import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'


@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.css']
})
export class AutocompleteSearchComponent implements OnInit {

    list: any;
    filterList: any[];
    listItem : string;

  constructor(private __http:Http) {
    this.filterList = [];
    this.listItem = "";
    this.list = []

   }
 

   //Get data from https://jsonplaceholder.typicode.com/posts

   fetchData = function(){
     this.__http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
       (res:Response) => this.list = res.json()
     )
   }

   style = {
     color:"red"
   }

   //Filter function

   filter= function(){
       
    if (this.listItem !== ""){
        this.filterList = this.list.filter(function(el){
            return el.title.toLowerCase().indexOf(this.listItem.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filterList = [];
    }
   }

   //select items for complete search

   selectItem = function(item){
    this.listItem = item.title;
    this.filterList = [];
    }


    arrowkeyLocation = 0;

keyDown(event: KeyboardEvent) {

  console.log(event)
    switch (event.keyCode) {
        case 38: // this is the ascii of arrow up
                 this.arrowkeyLocation--;
                 
                 break;
        case 40: // this is the ascii of arrow down
                 this.arrowkeyLocation++;
                 
                 break;
        // case 13: // this is the ascii of enter
        //       console.log("hello");
        //       break;
    }
} 

  ngOnInit() {
    this.fetchData();
  }

}
