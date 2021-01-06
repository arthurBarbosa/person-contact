import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatoPerson } from '../components/person/paginatorPerson';
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

  getAllPersons(page, size): Observable<PaginatoPerson> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
    return this.http.get<PaginatoPerson>(`${this.url}?${params.toString()}`);
  }

  favorite(person: Person): Observable<any> {
    return this.http.patch(`${this.url}/${person.id}/favorite`, null);
  }

  upload(person: Person, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${person.id}/image`, formData, { responseType: 'blob' });
  }
}
