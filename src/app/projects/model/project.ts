import {User} from "./user";

/**
 * The model for Project objects in the front end.
 * Includes all fields required for displaying project
 * Equivalent to the Project class on the back end.
 */
export interface Project {
  projectID: number;
  title: string
  description: string;
  type: string;
  creator: User;
  projectImage: File;


  constructor(
    id: string,
    title: string,
    description: string,
    type: string
  );

}
