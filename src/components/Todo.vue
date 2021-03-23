<template >
  <input type="checkbox" v-model="completed" :name="todo.name" v-if="!isModifying"> 
  <label :for="todo.name" v-if="!isModifying">{{todo.name}}</label>
  <input type="text" name="modify" v-model="newName" v-on:keyup="eventHandler" v-else class="newTodo">
  <div v-if="!isModifying" class="btns">
    <div @click="toModify()" class="rounded-lg cursor-pointer p-2 text-opacity-30 opacity-30 hover:opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="15">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
      </svg>
    </div>
    <div class="rounded-lg cursor-pointer p-2 text-opacity-30 opacity-30 hover:opacity-100" @click="deleteTodo(todo.id)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="15">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  </div>
  <div class="p-1 cursor-pointer opacity-60 hover:opacity-100 hover:text-green-600" v-else @click="modify">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="23" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
 
export default {
  name: "Todo",

  props: {
    todo: {type: Object}, // prop passé par le parent (dans TodoList.vue)
  },

  data () {
    return {
      completed: Boolean(this.todo.completed),
      isModifying: false,
      newName: this.todo.name,
      
    }
  },

  watch: {
    completed: async function (bool) {
      // console.log("on entre dans la fonction");
      // console.log(bool);
      const data = {
        name: this.todo.name,
        completed: bool,
        id: this.todo.id,
        todolist_id: this.getCurrent,
      };
      // console.log("fonction setCompleted va etre exectuté");
      const result = await this.setCompleted(data);
      console.log(result);
    },

  },

  methods: {
    //recupere actions from store/todolist/actions.js
    ...mapActions("todolist", ['setCompleted', 'modifyTodo', 'deleteTodo']),

    eventHandler: function (event) {
      if(event.key == 'Enter'){
        this.modify();
      }
    },

    toModify: function () {
      this.isModifying = !this.isModifying;
    },

    modify: async function () {
      const data = {
        name: this.newName,
        completed: this.todo.completed,
        id: this.todo.id,
        todolist_id: this.getCurrent,
      };

      const result = await this.modifyTodo(data);
      console.log(result);
      this.toModify();
      
    },
  },

  computed: {
    //recupere getters from store/todolist/getters.js
    ...mapGetters('todolist', ["getCurrent", "getFilter"]),
  }
}
</script>

<style>
  .btns {
    display: flex;
  }

  .delete-btn {
    width: auto !important;
    position: relative;
    margin-right: 10px;
  }


  .delete-btn span {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transform: rotate(45deg);
    display: block;
    height: 2px;
    width: 20px;
    background: grey;
  }

  #span-mirror {
    transform: rotate(-45deg);
  }

  .valid-btn {
    background: rgb(182, 255, 182);
  }

  .valid-btn:hover {
    background: rgb(0, 202, 0);
    color:white;
  }
</style>