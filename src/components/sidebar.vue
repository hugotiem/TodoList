<template>
  
  <ul id="list">
    <label for="">TodoLists</label>
    <li class="active:bg-gray-200" :id="`todolist_${todolist.id}`" v-for="todolist in getTodolists" :key="todolist.id" @click="displayTodos(todolist)">
      <label>{{todolist.name}} </label>
      <div class="rounded-lg cursor-pointer p-2 text-opacity-30 opacity-30 hover:opacity-100" @click="this.deleteTodolist(todolist.id)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="15">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
    </li>
    <li>
      <input class="w-3/4" type="text" v-model="this.name">
      <div @click="add" class="cursor-pointer">
        <label class="cursor-pointer">Ajouter</label>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sidebar',

  data() {
    return {
      name: '',
    }
  },

  methods: {

    add: async function () {
      if(this.name != ''){
        let result = await this.createTodolist(this.name);
        this.name = '';
        if(result != '') {
          alert(result);
        }
      }
    },

    displayTodos: async  function (todolist) {
      const previus = document.querySelector('.selected');
      if(null != previus) {
        previus.classList.remove('selected');
      }
      const result = await this.fetchTodos(todolist);
      if(result != '') {
        alert(result);
      }
      const div = document.querySelector(`#todolist_${todolist.id}`);
      div.classList.add('selected');
    },

    //recupere actions from store/todolist/actions.js
    ...mapActions("todolist", ["fetchTodolist", "fetchTodos", "createTodolist", "deleteTodolist"]),
  },

  async mounted() {
    const result = await this.fetchTodolist();
    if(result != '') {
      alert(result);
    }
  },

  computed: {
    //recupere getters from store/todolist/getters.js
    ...mapGetters("todolist", ["getTodolists", "getCurrent"]),
  },
}

</script>

<style>

  #list label {
    text-align: start;
  }

  .selected {
    border-bottom: 2px black solid;
  }
</style>