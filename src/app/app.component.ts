import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular TODO App';

  todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false }
  ];

  addTodo(newTodo: HTMLInputElement) {
    var todo = {
      id: +new Date(),
      title: newTodo.value,
      completed: false
    }
    this.todos.push(todo);
    this.log(this.todos);
    return false;
  }

  log(o) {
    console.log(JSON.stringify(o));
  }
}