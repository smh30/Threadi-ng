import {User} from "./user";

export interface Project {
  projectID: number;
  title: string
  description: string;
  type: string;
  creator: User;

  // constructor(
  //   id: string,
  //   title: string,
  //   description: string,
  //   type: string
  // );

}
