import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * Controller for the search component, which allows users to select the parameters by which to filter the
 * list of projects displayed on the main page
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /**
   * Defines an event type which can be emitted by this component, allowing other components to be notified
   * that something has happened.
   */
  @Output() searchEvent: EventEmitter<object> = new EventEmitter<object>();

  /**
   * An model which holds the search parameters which are selected/entered by the user: both are empty
   * strings by default
   */
  searchParams = {
    searchText: "",
    searchType: "",
  };

  /**
   * Defines whether the search form is displayed or collapsed - toggled by the showSearch method
   */
  isDisplayed: boolean = false;

//no constructor parameters required
  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Called when the search form is submitted. Uses the EventEmitter defined above as searchEvent to emit an
   * event containing the search parameters, which is then captured in the Projects component template
   * which performs the actual filtering of the projects list
   */
  submitSearch() {
    this.searchEvent.emit(this.searchParams);

  }

  //todo is it quick to make this happen without submit??

  /**
   * Called when the "clear filters" button is clicked. Restores both search parameters to empty string
   * and emits a search event, thus restoring the full list of projects to the page
   */
  clearParams() {
    this.searchParams.searchType = "";
    this.searchParams.searchText = "";
    this.searchEvent.emit(this.searchParams);
  }

  /**
   * Toggles the visibility of the search form
   */
  showSearch() {
    this.isDisplayed = !this.isDisplayed;
  }

}
