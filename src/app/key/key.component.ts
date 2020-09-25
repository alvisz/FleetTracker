import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {KeyService} from '../services/key.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass']
})
export class KeyComponent {

  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private Key: KeyService) {
  }

  keyForm = new FormGroup({
    key: new FormControl('')
  })

  submit(): void{
    let apiKey = this.keyForm.get("key").value;
    this.Key.setKey(apiKey);
    this.status.emit(true);
  }

}
