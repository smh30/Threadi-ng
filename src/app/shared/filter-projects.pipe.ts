import { Pipe, PipeTransform } from '@angular/core';
import {Project} from "../projects/model/project";

@Pipe({
  name: 'filterProjects'
})
export class FilterProjectsPipe implements PipeTransform {

  transform(projects: Project[], text: string): Project[] {
    if(text == null || text === ""){
      return projects;
    }
    //todo add search in other than description
    return projects.filter(p => p.description.includes(text));
  }

}
