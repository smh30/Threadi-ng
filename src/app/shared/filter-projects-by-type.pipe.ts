import {Pipe, PipeTransform} from '@angular/core';
import {Project} from "../projects/model/project";

@Pipe({
  name: 'filterProjectsByType',

})
export class FilterProjectsByTypePipe implements PipeTransform {

  transform(projects: Project[], searchText: string, searchType: string): Project[] {


    console.log("in transform type="+ searchType +", text  ="+ searchText );
    if ((searchType == null || searchType === "") && (searchText == null || searchText == "")) {
      return projects;
    } else if ((searchType == null || searchType === "")) {
      return projects.filter(p => (p.description.includes(searchText) || p.title.includes(searchText)));
    } else if ((searchText == null || searchText == "")) {
      return projects.filter(p => p.type === searchType);
    } else {
      return projects.filter(p => p.type === searchType &&
        (p.description.includes(searchText) || p.title.includes(searchText)));
    }
  }


}
