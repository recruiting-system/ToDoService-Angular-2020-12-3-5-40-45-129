import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public updatingToDoItem: ToDoItem;
  public selectedTodoItem: ToDoItem;
  private currentId: number = 0;
  public getAllFailMessage: string;

  private _todoItems: Array<ToDoItem>;

  constructor(private todoStore: TodoStoreService,
    private todoHttpService: TodoHttpService) {
    this._todoItems = todoStore.GetAll();
    this.updatingToDoItem = new ToDoItem(-1, "", "", false);
    this.selectedTodoItem = new ToDoItem(-1, "", "", false);
    this.getAllFailMessage = "";
    //this.currentId = this.todoItems.length;
  }

  public get todoItems(): Array<ToDoItem> {
    const allTodoItem = new Array<ToDoItem>();
    this.todoHttpService.GetAll().subscribe(todoItems => {
      allTodoItem.push(...todoItems);
    },
      error => {
        this.getAllFailMessage = "Get all fail because webapi error";
      });
    return allTodoItem;
  }

  public SetUpdatingTodoItemId(id: number): void {
    const foundTodoItem = this.todoStore.FindById(id);

    if (foundTodoItem !== undefined) {
      this.updatingToDoItem = Object.assign({}, foundTodoItem);
    }
  }

  public Create(todoItem: ToDoItem) {
    this.todoHttpService.Create(todoItem).subscribe(todoItem => {
      console.log(todoItem);
    });
  }

  public UpdateTodoItem(updateTodoItems: ToDoItem): void {
    this.todoStore.Update(updateTodoItems);
  }

  public DeleteTodoItem(id: number): void {
    this.todoHttpService.Delete(id).subscribe((response) => {
      console.log(response);
    },
      error => {
        console.log(error)
      })
  }

  public SetSelectedTodoItemId(id: number): void {
    this.selectedTodoItem = this.todoStore.FindById(id);
  }
}
