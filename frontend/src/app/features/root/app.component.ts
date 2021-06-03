import {Component, OnInit} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

export class Event {
  name: string;
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portal';

  messages: string[] = [];

  private subject = webSocket('ws://localhost:4300/push');

  ngOnInit(): void {
    console.log('start');
    this.subject.next({message: 'message'}); // <- ping first message
    this.subject.next({message: 'message2'});
    this.subject.subscribe(message => {       // <- listen messages from server
      const event = message as Event;
      this.messages.push(event.name + ' #' + event.count);
    });
    console.log('done');
  }


}
