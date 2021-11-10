import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReverseService } from './reverse.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  userName: string = "";           // user name
  userNameReverse: string = "";    // user name - reversed

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reverse: ReverseService
  ) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name');    // get name parameter
    if(typeof name === "string"){
      this.userName = name;                                      // set user name
      this.userNameReverse = this.reverse.reverseString(name);   // set reversed user name
    }
  }

  /**
   * Navigate back to form page
   */
  backToHomePage = (): void => {
    this.router.navigateByUrl("home").then((state) => {
      if(!state){
        window.alert("There was an error in navigation. pls try again in a few moments.");  // if navigation fails
      }
    });
  }

}
