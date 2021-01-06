import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../person/person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  constructor(
    public dilogRef: MatDialogRef<PersonDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public person: Person
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dilogRef.close();
  }

}
