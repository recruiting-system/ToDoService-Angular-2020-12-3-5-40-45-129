import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

  constructor(private httpClinet: HttpClient) { }

  public GetAll(): Observable<Array<ToDoItem>> {
    return this.httpClinet.get<Array<ToDoItem>>("/ToDoItem");
  }

  public Create(todoItem: ToDoItem): Observable<ToDoItem> {
    return this.httpClinet.post<ToDoItem>("/ToDoItem",
      todoItem,
      httpOptions);
  }

  public Delete(id: number): Observable<any> {
    return this.httpClinet.delete(`/ToDoItem?id=${id}`);
  }
}
