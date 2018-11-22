import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-choosecompany',
  templateUrl: './choosecompany.component.html',
  styleUrls: ['./choosecompany.component.css']
})
export class ChoosecompanyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
   
  }
  onSubmit(){
    this.router.navigate(['./dashboard'])
  }

}
