<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Password">
                <br>
                <input type="text" v-model="user.name" placeholder="Name">
                <br>
                <input type="email" v-model="user.email" placeholder="Email">
                <br>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SignUp",

        data: function(){
            return {
                user: {
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                    account: {
                    lastChangeDate: (new Date()).toJSON().toString(),
                    isActive: true
                    }
                }       
            }
        },
        methods: {

            processSignUp: function(){
                axios.post(
                    "https://misionticbankbe1.herokuapp.com/user/",
                    this.user,
                    {headers: {}}
                )   

            .then((result) => {
                let dataSignUp = {
                    username: this.user.username,
                    token_access: result.data.access,
                    token_refresh: result.data.refresh,
                }

                this.$emit('completedSignUp', dataSignUp)

                })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.");
            });
            }
        }
    }
</script>

<style>
    .signUp_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        }
    .container_signUp_user {        
        border: 3px solid #ffffff;
        border-radius: 10px;
        background: #27272762;
        width: 30%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        }
    .signUp_user h2{
        color: #ffffff;
        }
    .signUp_user form{
        width: 70%;
        }
    .signUp_user input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
        }
    .signUp_user button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #6d6d6d59;
        border: 1px solid #E5E7E9;
        border-radius: 5px; 
        padding: 10px 25px;
        margin: 5px 0 25px 0;
        }
    .signUp_user button:hover{
        color: #E5E7E9;
        background:#5adacf81;
        border: 1px solid #283747;
        }
</style>