import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from './person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService) { }
  person: Person = new Person();

  ngOnInit(): void {

    this.person.email = 'joãorosa@devmaster.com'
    this.person.favorite = true;
    this.person.name = 'João'
    this.personService.save(this.person).subscribe(data => {
      console.log(data);
    })
  }

}
