<template>
  <div id="app" class="app">
      <div class="header">
          <h1>VAYJEL STORE</h1>
        <nav>
          <button v-if="is_auth" v-on:click="loadHome"> Panel vendedor </button>
          <button v-if="is_auth" v-on:click="loadAccount"> Panel Administrador</button>
          <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button>
        </nav>
        
      </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>VAYJEL STORE</h2>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'App',
    data: function(){
      return{
        is_auth: false
      }
    },
    components: {
    },
    methods:{
      verifyAuth: function() {
        this.is_auth = localStorage.getItem("isAuth") || false;
          if (this.is_auth == false)
            this.$router.push({ name: "logIn" });
          else
            this.$router.push({ name: "home" });
        },
      loadLogIn: function(){
        this.$router.push({name: "logIn"})
      },
      loadSignUp: function(){
        this.$router.push({name: "signUp"})
      },
      completedLogIn: function(data) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("username", data.username);
        localStorage.setItem("token_access", data.token_access);
        localStorage.setItem("token_refresh", data.token_refresh);
        alert("Autenticación Exitosa");
        this.verifyAuth();
        },
      completedSignUp: function(data) {
        alert("Registro Exitoso");
        this.completedLogIn(data);
        },

      loadHome: function() {
        this.$router.push({ name: "home" });
      },
      loadAccount: function () {
        this.$router.push({ name: "account" });
        },
      logOut: function () {
        localStorage.clear();
          alert("Sesión Cerrada");
            this.verifyAuth();
        },
     

      


    },

      created: function(){
        this.verifyAuth()
      },

      
  }
</script>

<style>

  body{
    margin: 0 0 0 0;
    background-image: url(assets/imagenazul.jpg);
    background-size:contain;
    
  }
  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;
    background-color: #27272779 ;
    color:#ffffff ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family:Sunday Best;
    font-size:18px;

  }

  .header h1{
    width: 20%;
    text-align: center;
  }
  .header nav{
    height: 100%;
    width: 20%;    
    display: flex;
    justify-content:end;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #7e7e7e54;
    border  : 1px solid #E5E7E9;
    display: flex;
    border-radius: 6px;
    padding: 5px 20px;
    

  } 

  .header nav button:hover{
    color: #ffffff;
    background: #5adacf81;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    height: 75vh;
    margin: 0%;
    padding: 0%;
    
    
  }
  .footer{
    margin:0;
    padding:0;
    width: 100%;
    height: 11vh;
    min-height: 100px;
    background-color: #27272779 ;
    color: #E5E7E9;
    
    position: fixed;
    }

  .footer h2{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      }
</style>