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

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    const formValues = this.formData.value;
    this.person = formValues;
    this.personService.save(this.person).subscribe(response => {
      this.persons.push(response);
      console.log(this.persons);
    })
  }

}
