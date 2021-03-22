import axios from '@/api';

// recupere les todos d'une todolist 
export async function fetchTodos({commit}, todolist) {
  const current = todolist.id;

  let msg = '';

  try {
    let response = await axios.get(`todos/${current}`);
    commit("setTodos", response.data); 
    commit("setCurrent", current);
  } catch (err) {
    msg = "Une erreur est survenu lors du chargement de la todolist. Status : " + err.response.status;
  }
  return msg;
}

// charge une todolist de l'api puis on la stock dans le state via mutations.js (avec commit)
export async function fetchTodolist({commit}) {
  
  commit("setTodos", '');
  commit("setCurrent", 0);

  let msg = '';
  try {
    let response = await axios.get("todolists");
    commit("setTodolists", response.data);
  } catch(err) {
    msg = "Une erreur est survenu lors du chargement des todolists. Status : " + err.response.status;
  }
  return msg;
}


export async function createTodolist({commit}, title) {
  const name = title;
  
  let msg = '';

  try {
    let response = await axios.post("todolist", {name});
    commit('addTodolist', response.data);
  } catch(err) {
    msg = "Une erreur est survenu lors de la création de la todolist. Status : " + err.response.status;
  }
  return msg;
}

export async function createTodo({commit}, todo) {
  const name = todo.name;
  const completed = todo.completed;
  const todolist_id = todo.todolist_id;

  let msg = '';

  try {
    let response = await axios.post("todo", {name, completed, todolist_id});
    commit('addTodos', response.data);
  } catch (err) {
    msg = "Une erreur est survenu lors de la creation de la todo. Status : " + err.response.status;
  }
  return msg;
}

export async function setCompleted({commit}, todo) {
  const name = todo.name;
  const completed = todo.completed;
  const todolist_id = todo.todolist_id;

  const todo_id = todo.id;

  let msg = '';

  try {
    let response = await axios.post(`completeTodo/${todo_id}`, {name, completed, todolist_id});
    commit('setCompleted', response.data);   
  } catch (err) {
    msg = "Une erreur est survenu lors de la complétion de la todo. Status : " + err.response.status;
  }
  return msg;
}

export async function modifyTodo({commit}, todo) {
  const name = todo.name;
  const completed = todo.completed;
  const todolist_id = todo.todolist_id;

  const todo_id = todo.id;

  let msg = '';

  try {
    let response = await axios.patch(`todo/${todo_id}`, {name, completed, todolist_id});
    commit('setName', response.data);
  } catch (err) {
    msg = "Une erreur est survenu lors de la modification de la todo. Status : " + err.response.status;
  }
  return msg;
}

export async function deleteTodolist({commit}, id) {
  const todolist_id = id;

  let msg = '';

  try {
    await axios.delete(`todolist/${todolist_id}`);
    commit("deleteTodolist", todolist_id);
  } catch (err) {
    msg = "Une erreur est survenu lors de la suppression de la todolist. Status : " + err.response.status;
  }
  return msg;
}

export async function deleteTodo({commit}, id) {
  const todo_id = id;

  let msg = '';

  try {
    await axios.delete(`todo/${todo_id}`);
    commit("deleteTodo", todo_id);
  } catch (err) {
    msg = "Une erreur est survenu lors de la creation de la suppression de la todo. Status : " + err.response.status;
  }
  return msg;
}

export function setCurrent({commit}, current) {
  commit("setCurrent", current);
}