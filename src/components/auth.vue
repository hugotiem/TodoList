<template>
  <div id="title" class="absolute text-white left-1/2 text-5xl">
    <label>"Todolost App".</label>
  </div>
  <div id="app" class="flex w-full h-full">
    <div id="login" class="bg-white p-5 rounded-lg">
      <h1>CONNEXION</h1>
      <div>
        <label for="email">Email :</label>
        <br>
        <input type="email" name="email" v-model="loginId.email">
        <br>
        <label for="password">Mot de passe : </label> 
        <br>
        <input type="password" name="password" v-model="loginId.password">
      </div>
      <div class="btn login-btn rounded-lg bg-purple-50" @click="toLogin">
        <label>Se connecter</label>
      </div>
      <div class="error">
        {{ this.logError }}
      </div>
    </div>    

    <div id="sign-up" class="bg-white p-5 rounded-lg">
      <h1>INSCRIPTION</h1>
      <div>
        <label for="name">Nom :</label>
        <br>
        <input type="text" name="name" v-model="signUp.name">
        <br>
        <label for="email">Email :</label>
        <br>
        <input type="email" name="email" v-model="signUp.email">
        <br>
        <label for="password">Mot de passe : </label> 
        <br>
        <input type="password" name="password" v-model="signUp.password">
      </div>
      <div class="btn login-btn rounded-lg  bg-purple-50" @click="toRegister">
        <label>S'inscrire</label>
      </div>
      <div class="error">
        {{ this.regError }}
      </div>
    </div>
  </div>

</template>

<script>
import{ mapActions } from 'vuex';

export default {
  name: 'Auth',

  data () {
    return {
      loginId: {
        email: '',
        password: '',
      },

      signUp: {
        name: '',
        email: '',
        password: '',
      },

      logError: null,
      regError: null,
    }
  },

  methods: {
    // recupere action login register from store/account.actions.js
    ...mapActions("account", ["login", "register"]),

    
    async toLogin() {
      if(this.loginId.email != '' && this.loginId.password != ''){
        const msg = await this.login(this.loginId);
        this.logError = msg;        
      }
    },
    async toRegister() {
      if(this.signUp.name != '' && this.signUp.email != '' && this.signUp.password != ''){
        const msg = await this.register(this.signUp);
        this.regError = msg;
      }
    }
  },
}
</script>

<style>
  #title {
    transform: translate(-50%);
    margin-top: 50px;
  }

  #login, #sign-up {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
    margin-left: auto;
  }

  #login input, #sign-up input {
    border: none;
    border-bottom: 1px rgb(207, 207, 207) solid;
    margin-bottom: 10px;
  }

  .login-btn {
    /* background: rgb(236, 236, 236); */
    width: 200px;
    margin-left: 50%;
    transform: translate(-50%);

    transition-property: background;
    transition-duration: .2s;
  }

  .login-btn:hover {
    background: rgb(202, 202, 202);
  }

  .error {
    color: red;
  }
</style>