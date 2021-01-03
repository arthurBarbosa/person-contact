import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../components/person/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements OnInit {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  save(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person);
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  favorite(person: Person): Observable<any>{
    return this.http.patch(`${this.url}/${person.id}/favorite`, null);
  }
}
