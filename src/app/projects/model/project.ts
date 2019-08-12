import {User} from "./user";

export interface Project {
  id: string;
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
