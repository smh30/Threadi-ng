import {Pipe, PipeTransform} from '@angular/core';
import {Project} from "../projects/model/project";


/**
 * This custom Pipe is used in the Projects component page to filter the complete list of projects
 * according to the search parameters which have been entered into the search component
 * by the user.
 */
@Pipe({
  name: 'filterProjects',

})
export class FilterProjectsPipe implements PipeTransform {

  /**
   * Implements the required transform() method of the PipeTransform class
   * @param projects: the complete list of projects which exists in the projects component
   * @param searchText: the text by which the user wants to filter
   * @param searchType: the project type by which the user wants to filter
   */
  transform(projects: Project[], searchText: string, searchType: string): Project[] {

    if ((searchType == null || searchType === "") && (searchText == null || searchText == "")) {
      //if no search terms are entered, return the projects list unchanged
      return projects;
    } else if ((searchType == null || searchType === "")) {
      /* if no type is specified (but text is), filter the list to only return those projects which
      contain the text in their title or description*/
      return projects.filter(p => (p.description.includes(searchText) || p.title.includes(searchText)));
    } else if ((searchText == null || searchText == "")) {
      /* if no text is specified, but type is, filter the projects list to only return those
      projects whose type match that specified
       */
      return projects.filter(p => p.type === searchType);
    } else {
      /* if both type and text are specified, filter the projects list by both
       */
      return projects.filter(p => p.type === searchType &&
        (p.description.includes(searchText) || p.title.includes(searchText)));
    }
  }

}
