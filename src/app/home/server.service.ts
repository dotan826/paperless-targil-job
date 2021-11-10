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
   * @returns user the response body contains user details - and then this service save it to local storage
   */
  sendUser = (user: User): Observable<User> => {
    let url = 'result/' + user.name;
    return this.http.post<User>(url, user);
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
        return new Response(201, { }, request.requestBody);     // send back a dummy response
      },
      { timing: 2000 });     // wait 2 seconds before sending response...

  },
})

