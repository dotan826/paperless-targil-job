import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReverseService {

  constructor() { }

  /**
   * Get name and reverse it
   *
   * @param name name to reverse
   * @returns string reversed name
   */
  reverseString = (name: string) => {
    let nameSplit = name.split("");    // split
    let nameReverse = nameSplit.reverse();      // reverse
    let nameJoin = nameReverse.join("");        // join
    return nameJoin;
  }

}
