<template>
  <ul id="todolist">
    <div class="w-full flex justify-between">
      <div class="text-gray-300">
        <label v-if="isSelected">Il reste {{ remaining }} todo(s) à faire.</label>
      </div>
      <div class="flex">  
        <div :class="{selected: this.filter === 'all'}" class="btn" v-on:click="setFilter('all')">
          <label>All</label>
        </div>      
        <div :class="{selected: this.filter === 'todo'}" class="btn" v-on:click="setFilter('todo')">
          <label>Todo</label>
        </div>
        <div :class="{selected: this.filter === 'done'}" class="btn" v-on:click="setFilter('done')">
          <label>Done</label>
        </div>

      </div>
    </div>
    <li v-if="isSelected">
      <input type="text" name="newTodo" class="newTodo" v-on:keyup="toAdd" v-model="newTodo" placeholder="Ex: Aller faire le projet d'App Mobile.">
      <div @click="add" class="btn rounded-lg">
        <label>Ajouter</label>
      </div>
    </li> 
    <div style="margin-top: 50px; opacity: .5" v-else>
      <label>Veuillez sélectionner une todolist pour y voir son contenu.</label>
    </div>
    <li v-for="todo in this.todosByfilter" :key="todo.id">
      <todo :todo="todo"></todo>
    </li>
  </ul>
 
  
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'; 
import Todo from './Todo';

export default {
 
  name: 'TodoList',
  components: {
    Todo,
  },

  data() {
    return {
      newTodo: '',
      filter: 'all',
    }
  },

  methods: {

    toAdd: function (event) {
      if(event.key == 'Enter'){
        this.add();
      }
    },
    
    add: async function () {
      if(this.newTodo != ''){
        const result = await this.createTodo({
          name: this.newTodo, 
          completed: 0, 
          todolist_id: this.getCurrent
        });
        this.newTodo = '';
        if(result != '') {
          alert(result);
        }
      }
    },

    setFilter: function (type) {
      this.filter = type;
    },

    //recupere actions from store/todolist/actions.js
    //recupere actions from store/account/actions.js
    ...mapActions("todolist", ["createTodo", "setCompleted"]),
    ...mapActions('account', ['logout']),
  },

  computed:{
    //recupere actions from store/todolist/getters.js
    ...mapGetters("todolist", ["getTodolist", "getCurrent"]),

    todosByfilter: function () {
      let todolist = this.getTodolist;
      
      if(this.filter === "done") {
        
        return todolist.filter(todo => todo.completed);
      } else if (this.filter === "todo") {
        return todolist.filter(todo => !todo.completed);
      }
      return todolist;
    },

    remaining () {
      return this.getTodolist.filter(todo => !todo.completed).length;
    },

    isSelected: function () {
      return this.getCurrent != 0;
    }
  },
}
</script>

<style>
  #todolist {
    width: 100%;
  } 

  .selected {
    border-bottom: 2px black solid;
  }  

  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin: 10px;
    border-bottom: 1px rgb(212, 212, 212) solid;
  }
  
  .newTodo {
    width: 100%;
    border: none;
  }

  input:focus {
    outline: none;
  }

  .btn {
    width: 100px;
    cursor: pointer;
    padding: 5px;
    transition-property: background, color;
    transition-duration: .2s;
  }
  
  .btn label {
    cursor: pointer;
    width: 100%;
  }
</style>