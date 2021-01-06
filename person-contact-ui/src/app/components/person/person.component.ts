
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PersonService } from 'src/app/services/person.service';
import { Person } from './person';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  formData: FormGroup;
  person: Person;
  persons: Person[] = [];

  displayedColumns: string[] = ['image', 'id', 'name', 'email', 'favorite'];

  totalElements = 0;
  page = 0;
  size = 14;
  pageSizeOptions: number[] = [14]

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.createForm();

    this.getAllPersons(this.page, this.size);
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
      this.snackBar.open('Pessoa salva com sucesso', 'Sucesso',{
        duration:2000
      })
      this.formData.reset();
    })
  }

  getAllPersons(page = 0, size = 0) {
    this.personService.getAllPersons(page, size).subscribe(response => {
      this.persons = response.content;
      this.totalElements = response.totalElements
      this.page = response.number;
    })
  }

  favorite(person: Person) {
    this.personService.favorite(person).subscribe(response => {
      person.favorite = !person.favorite;
    })
  }

  uploadImage(event, person) {
    const files = event.target.files;
    if (files) {
      const image = files[0];
      const formData: FormData = new FormData();
      formData.append('image', image);
      this.personService
        .upload(person, formData)
        .subscribe(response => this.getAllPersons(this.page, this.size));
    }

  }

  viewDetailPerson(person: Person) {
    this.dialog.open(PersonDetailComponent, {
      width: '400px',
      height: '450px',
      data: person
    })
  }

  paginator(event: PageEvent) {
    this.page = event.pageIndex;
    this.getAllPersons(this.page, this.size);
  }

}
