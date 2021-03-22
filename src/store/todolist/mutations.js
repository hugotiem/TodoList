export function addTodos(state, todo){
  state.todos.push(todo);
}

export function setTodos(state, todos) {
  if(todos == undefined) {
    todos = [];
  }
  state.todos = todos;
  
}

export function setTodolists(state, todolists){
  state.todolists = todolists;
}

export function addTodolist(state, todolist) {
  state.todolists.push(todolist);
}

export function setCompleted(state, todo_data) {
  const todo = state.todos.find(todo => todo.id == todo_data.id);
  todo.completed = todo_data.completed;
}

export function setName(state, todo_data) {
  const todo = state.todos.find(todo => todo.id == todo_data.id);
  todo.name = todo_data.name;
}

export function deleteTodolist(state, id){
  const todolist =  state.todolists.find(todolist => todolist.id == id);
  state.todolists.splice(state.todolists.indexOf(todolist), 1);
}

export function deleteTodo(state, id) {
  const todo = state.todos.find(todo => todo.id == id);
  state.todos.splice(state.todos.indexOf(todo), 1);
}

export function setCurrent(state, index) {
  state.current = index;
}
