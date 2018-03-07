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
  

  ngOnInit() {
    this.fetchData();
  }

}
