import { ObjectId } from "mongodb";

export default class User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;


  constructor(firstName: string, lastName: string, username: string, password: string) {
    this._id = new ObjectId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}