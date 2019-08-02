import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular TODO App';

  store = {
    todos: [
      { id: 1, title: "Task 1", completed: false, edit: false },
      { id: 2, title: "Task 2", completed: false, edit: false }
    ]
  }

  addTodo(newTodo: HTMLInputElement) {
    var todo = {
      id: +new Date(),
      title: newTodo.value,
      completed: false,
      edit: false  //todo:
    }
    this.store.todos.push(todo);
    this.log(this.store.todos);
    return false;
  }

  deleteTodo(id) {
    let confirm = window.confirm(`Are you sure you want to delete the todo?`);
    if (!confirm) return;
    var newTodos = this.store.todos.filter((todo) => {
      return todo.id != id;
    });

    this.store.todos = newTodos;
  }

  toggleEdit(id) {
    var todoEdit = this._findTodo(id);
    todoEdit.edit = !todoEdit.edit;
    this.log("edit: ", todoEdit);
  }

  editTodo(event, id, newTitle) {
    if (event.which === 27) {
      this.toggleEdit(id);
      return;
    }

    if (event.which === 13) {
      var found = this._findTodo(id);
      found.title = newTitle;
      this.toggleEdit(id);
    }
  }

  _findTodo(id) {
    var todoItem = this.store.todos.find((todo) => {
      return todo.id == id;
    });
    return todoItem;
  }

  log(...args) {
    for (var i = 0; i < args.length; i++) {
      console.log(JSON.stringify(args[i]));
    }
  }
}