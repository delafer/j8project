import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "$root/node_modules/@angular/router";

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss']
})
export class MessageboxComponent implements OnInit {

  @Input() name;
  @Input() text;
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  ngOnInit(): void {
  }

  toSettings() {

    this.router.navigate(['/home/settings']);
    this.activeModal.close(true);
  }

}
