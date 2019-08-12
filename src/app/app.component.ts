import { Component } from '@angular/core';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular TODO App';

  store = {
    todos: [
      new Todo({ id: 1, title: "Task 1", completed: false, edit: false }),
      new Todo({ id: 2, title: "Task 2", completed: false, edit: false })
    ],
    filteredTodos: [],
    // {todoId: <>,  bookmarked: true/false}
    bookmarks: []
  }


  filterAction = "all";

  noTodoMessage = `There are no todos for selected filter!`;

  constructor() {
    this.store.filteredTodos = [...this.store.todos];
  }

  addTodo(newTodo: HTMLInputElement) {
    var todo = new Todo({
      id: +new Date(),
      title: newTodo.value,
      completed: false,
      edit: false  //todo:
    });
    
    this.store.todos.push(todo);
    this.log(this.store.todos);
    this.changeFilter(this.filterAction);
    return false;
  }

  deleteTodo(id) {
    let confirm = window.confirm(`Are you sure you want to delete the todo?`);
    if (!confirm) return;
    var newTodos = this.store.todos.filter((todo) => {
      return todo.id != id;
    });

    this.store.todos = newTodos;
    this.changeFilter(this.filterAction);
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

  _isTodoBookmarked(todoId) {
    //console.log(`checking bookmark status...`)
    var todoItem = this.store.bookmarks.find((bm) => {
      return bm.todoId == todoId;
    });

    return todoItem;
  }

  toggleBookmark(todoId) {
    var bookmark = this.store.bookmarks.find((bm) => {
      return bm.todoId == todoId;
    });

    if (!bookmark) {
      this.store.bookmarks = [{ todoId: todoId, bookmarked: true }, ...this.store.bookmarks]
    } else {
      this.store.bookmarks = this.store.bookmarks.filter((b) => {
        return b.todoId != todoId
      })
    }

    console.log("bm:", this.store.bookmarks);
  }

  toggleCompleted(id) {
    var found = this._findTodo(id);
    found.completed = !found.completed;
    console.log(`toggle todo ${id} to ${found.completed}`);
  }

  onFilterChange(event) {
    var action = event.target.name.toLowerCase();
    this.filterAction = action;
    this.changeFilter(action);
  }

  changeFilter(action) {
    switch (action) {
      case "all":
        this.store.filteredTodos = [...this.store.todos];
        break;
      case "completed":
        this.store.filteredTodos = this.store.todos.filter((todo) => {
          return todo.completed;
        });
        break;
      case "bookmarked":
        this.store.filteredTodos = this.store.todos.filter((todo) => {
          if (this._isTodoBookmarked(todo.id))
            return todo;
        });
        break;
    }
    console.log(this.store.filteredTodos);
  }

  log(...args) {
    for (var i = 0; i < args.length; i++) {
      console.log(JSON.stringify(args[i]));
    }
  }
}