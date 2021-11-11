import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {createServer, Response} from "miragejs";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) {

  }

  /**
   * POST new user to server
   * @param user Object with name and email
   * @returns answer Object that contain server answer for a specific call
   */
  sendUser = (user: User): Observable<{ answer: string }> => {
    let myStorage: Storage = window.localStorage;     // get local storage object
    if(myStorage.getItem(user.email)){
      console.log(`Found ! >>> ${user.email}`);              // if storage exist - for log purpose
      console.log("getting answer from local storage...");   // if storage exist - for log purpose
      return new Observable<{answer: string}>(subscriber => {
        subscriber.next({ answer: (myStorage.getItem(user.email)) as string });   // return answer from local storage
      })
    }
    else{
      console.log(`Not Found ! >>> ${user.email}`);   // if storage not exist - for log purpose
      console.log("connecting to the server...");     // if storage not exist - for log purpose
      let url = 'result/' + user.name;
      // return this.http.post<{ answer: string }>(url, user);
      return new Observable<{answer: string}>(subscriber => {
        this.http.post<{ answer: string }>(url, user).subscribe((answer) => {
          myStorage.setItem(user.email, answer.answer);    // save answer to local storage
          subscriber.next(answer);       // return answer from server
        })
      })
    }
  }

}

/**
 * Interface for user details
 */
interface User {
  name: string;
  email: string;
}

/**
 * Mock Server - for POST
 */
createServer({
  routes() {

    this.post("/result/:name",
      (schema, request) => {
        return new Response(201, { }, { answer: 'yes' });     // send back a dummy response
      },
      { timing: 2000 });     // wait 2 seconds before sending response...

  },
})

