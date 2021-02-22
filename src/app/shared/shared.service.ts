import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "./enums";

@Injectable()
export class SharedService {

  isMobile$: BehaviorSubject<boolean>;
  currentTheme$: BehaviorSubject<string>;

  constructor() {
    this.currentTheme$ = new BehaviorSubject<string>(localStorage.getItem('theme') ?? Theme.LIGHT);
    this.isMobile$ = new BehaviorSubject<boolean>(window.innerWidth < 760);
  }

}
