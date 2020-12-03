import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';

export const routes: Routes = [
  { path: "", component: ListTodoitemComponent },
  { path: "create", component: CreateTodoitemComponent },
  { path: "edit/:id", component: UpdateTodoItemComponent },
  { path: "detail/:id", component: TodoitemDetailComponent },
];

// <router-outlet></router-outlet>

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
