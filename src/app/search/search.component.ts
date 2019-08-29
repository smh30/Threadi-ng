import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<object> = new EventEmitter<object>();

  //searchText: string;
  //searchType: string;
  searchParams = {
    searchText: "",
    searchType: "",
    searchLocation: ""
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  submitSearch() {
    //alert("search submitted, text="+ this.searchText);

    console.log("in search type=" + this.searchParams.searchType + ", text  =" + this.searchParams.searchText);


    this.searchEvent.emit(this.searchParams);

  }

  clearParams(){
    this.searchParams.searchType ="";
    this.searchParams.searchText ="";
    this.searchParams.searchLocation ="";
    this.searchEvent.emit(this.searchParams);
  }

}
