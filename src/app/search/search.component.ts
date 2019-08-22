import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEvent:EventEmitter<string> = new EventEmitter<string>();

  searchText: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitSearch(){
    //alert("search submitted, text="+ this.searchText);

    this.searchEvent.emit(this.searchText);
    // let url="http://localhost:8082/listings/type/"+this.searchText;
    // this.http.get(url).subscribe(
    //   res=>{
    //     alert(res);
    //     //will need to do this in a service and do a notification when it changes
    //   },
    //   err=>{
    //     alert("an error has occurred with search")
    //   }
    // )
  }

}
