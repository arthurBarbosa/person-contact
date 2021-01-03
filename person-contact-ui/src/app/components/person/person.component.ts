import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { Person } from './person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  formData: FormGroup;
  person: Person;
  persons: Person[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'favorite'];

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.createForm();

    this.getAllPersons();
  }

  createForm() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    const formValues = this.formData.value;
    this.person = formValues;
    this.personService.save(this.person).subscribe(response => {
      let list: Person[] = [...this.persons, response]
      this.persons = list
    })
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe(response => {
      this.persons = response;
    })
  }

  favorite(person: Person) {
    this.personService.favorite(person).subscribe(response => {
      person.favorite = !person.favorite;
    })
  }



}
