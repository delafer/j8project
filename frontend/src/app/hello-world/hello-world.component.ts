import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ElementMenu} from "./element-menu";

@Component({
  selector: 'app-root',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {


  constructor() {
     this.menu = [
         new ElementMenu('http://www.yandex.ru', 'Поиск'),
         new ElementMenu( 'http://www.mail.ru', 'Почта', "Проверить почту" )
     ];
  }

  text;
  textValue: string;
  name = new FormControl("Sasha");
  menu: ElementMenu [];

massive;
    edutBaranyPoPoliu(anyName) {
      this.text = "Быстро!";
      console.log('я ебу что писать');



      alert (`иди на хуй ${anyName}`);
    }


  ngOnInit(): void {
      //alert('Я загрузилась!');

    this.massive = ['Nastya'];
  }
}
