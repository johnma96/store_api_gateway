<template>



<div class="paneles">
    <div>
    <h1>Venta de productos</h1>
    
    <form id="formulario1" v-on:submit.prevent="addTable">
        <div class="botones1" id="botones1">
            <input type="text" placeholder="Id del producto" id="id" name="id" class="idproducto">       
            <input type="number" placeholder="Cantidad" id="cantidad" name="cantidad" class="cantidad">
            <button type="submit" class="agregar">Agregar</button>
            <br><br>
        </div>

        <div class="container-payment-method">
           
            <select id="combo" name="combo">
                <option value="Metodo de pago " selected>Metodo de pago</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta Debito"> Tarjerta Debito</option>
                <option value="Tarjeta Credito"> Tarjeta Credito </option>
            </select>
        </div>
    </form>
    <br>
 

    <div class="container-table" >
       <table class="tablafact" id="tabla1">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                </tr>    
            </thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
      
        </table>
    </div>
            <div class="information2">
            <br><br>
                <table class="table-hover2" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in listProduct" :key="producto.id">
                        <th scope="row">{{ producto.id}}</th>
                        <td>{{ producto.name }}</td>
                     
                    </tr>
            
                </tbody>
    </table>
    </div>
    </div>
    <div>
    <div class="container-button">
        <button type="submit" class="botonF" v-on:click="sendInvoice" >Registrar venta</button>
        <br>
    </div>
    </div>

</div>
 
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
    name: "Invoicing",

    data: function() {
        return {
            invoice:{
                date:(new Date()).toJSON().toString(),
                paymentMethod:"",
                user:0,
                sales:[],
            },
            listProduct:null,
        }
    },

    methods: {
           getData: async function() {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        alert("que  esta pasando 1");
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios
        .get(
          `https://misionticbankbe1.herokuapp.com/product/${userId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((result) => {
          this.listProduct = result.data;
          this.loaded      = true;
          console.log(result);
        })
        .catch(() => {
          alert("que esta pasando 2");
          this.$emit("logOut");
        });
        },

        addTable: async function(){
            

            const form= document.getElementById("formulario1");
            let transacciondata=new FormData(form);

            let product = this.verifyProduct(transacciondata.get("id"));

            if (product == null){
                alert("Id de producto no valido");
                return
            }

            //console.log(typeof(product.price));

            let transacciontable = document.getElementById("tabla1");
            let newtransaccionrow = transacciontable.insertRow(-1);
            
            let newcell= newtransaccionrow.insertCell(0)
            newcell.textContent = transacciondata.get("id");

            newcell= newtransaccionrow.insertCell(1)
            newcell.textContent = product.name;

            newcell= newtransaccionrow.insertCell(2)
            newcell.textContent = product.price;

            newcell= newtransaccionrow.insertCell(3)
            newcell.textContent = transacciondata.get("cantidad");

            newcell= newtransaccionrow.insertCell(4)
            newcell.textContent = product.price * parseInt(transacciondata.get("cantidad"));
        
        },
        sendInvoice: async function(){
            let sel = document.getElementById("combo");
            this.invoice.paymentMethod = sel.options[sel.selectedIndex].text;

            let table = $('#tabla1').tableToJSON({ 
                ignoreColumns: [1,4],
                });

            table.shift();
            
            let tableEdit = table.map(product => {
                return{
                    product:parseInt(product.Id,10),
                    cost:parseFloat(product["Precio unitario"]),
                    amount:parseInt(product.Cantidad,10)
                    }});

            if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit("logOut");
                    return;
                }
            await this.verifyToken();

            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            this.invoice.user = userId;
            this.invoice.sales = tableEdit;

            console.log(this.invoice);

            axios.post(
                'https://misionticbankbe1.herokuapp.com/invoice/create/',
                this.invoice,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                alert("Factura registrada");
            })
            .catch((error) => {
                console.log("Error");
                if(error.response.status == "401") {
                    alert("Usted no está autorizado para realizar esta operación.");
                }
                else if(error.response.status == "400"){
                    alert("La transacción no se pudo procesar correctamente.\nRevise todos los datos e intente de nuevo.");
                }
            })
        },

        verifyToken: async function(){
                return axios.post(
                        'https://misionticbankbe1.herokuapp.com/refresh/',
                        {refresh: localStorage.getItem("token_refresh")},
                        {headers:{}}
                    )
                    .then((result) => {
                        localStorage.setItem("token_access", result.data.access);
                    })
                    .catch((error) => {
                        this.$emit("logOut");
                    })
            },

        verifyProduct: function(product_id){

            for (let x in this.listProduct){
                if (this.listProduct[x]["id"] == product_id){
                    return (this.listProduct[x]);
                }
            }
            return null
        },

        getData: async function() {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit("logOut");
                return;
            }
            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            axios
                .get(
                `https://misionticbankbe1.herokuapp.com/product/${userId}/`,
                { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                this.listProduct = result.data;
                })
                .catch(() => {
                this.$emit("logOut");
                });
        },
    },

    created: function() {
    this.getData();
    },
}

</script>

<style>

    .paneles{
        background-color: rgba(0, 0, 0, 0.452);
    }

    .paneles h1{
        color: white;
        text-align: center;
    }

    .tablafact{
        color: rgb(0, 0, 0);
    }


    .container-table{
      
        align-content:space-around;
        text-align: center;
        display: flex;
        align-items: center;
        color:rgb(0, 0, 0);
        justify-content: first baseline;
        

    }
    
    .tablafact{
        width: 600px;
        border-collapse: collapse;
        border: 2px solid black;
        background-color: white;
        
       
    }
    .tablafact th{
        border: 1px solid black;
        padding: 0;
    }
    
    .tablafact td{
        border: 1px solid black;
        padding: 0;
    }
    .tablafact thead{
        background-color: rgb(40, 41, 41);
        color: aliceblue;
    }
    .tablafact tbody{
        background-color: rgba(104, 221, 250, 0.692);
    }

    .tablafact tr:nth-child(even){
        background-color: rgba(149, 200, 212, 0.795);
        
    }


        .information2{
      
        align-content:center;
        text-align: center;
        display: flex;
        align-items:center;
        color:rgb(0, 0, 0);
        justify-content:space-around;
        

    }
    
    .table-hover2{
        width: 200px;
        
        border-collapse: collapse;
        border: 2px solid black;
        background-color: white;
       
       
    }
    .table-hover2 th{
        border: 1px solid black;
        padding: 0;
    }
    
    .table-hover2 td{
        border: 1px solid black;
        padding: 0;
    }
    .table-hover2 thead{
        background-color: rgb(40, 41, 41);
        color: aliceblue;
    }
    .table-hover2 tbody{
        background-color: rgba(104, 221, 250, 0.692);
    }

    .table-hover2 tr:nth-child(even){
        background-color: rgba(149, 200, 212, 0.795);
        
    }

    .container-button{
        justify-content:center;
    }

    .botonF{
    color: #E5E7E9;
    background: #28dce254;
    border  : 2px solid #E5E7E9;
    font-size: 20px;
    border-radius: 6px;
    padding: 20px 40px;
    justify-content: center;
    align-content: center;
    }

    .botonF:hover{
    color: #ffffff;
    background: #00000028;
    border: 1px solid #E5E7E9;
    }

    .idproducto{
        border:1px solid rgba(0, 0, 0, 0.849);
        background-color:rgba(248, 248, 248, 0.774);
        color:black;
    }
    .cantidad{
        border: 1px solid  rgba(0, 0, 0, 0.849) ;
        background-color:rgba(248, 248, 248, 0.774);
        color:black;

    }
    .agregar{
     color: #E5E7E9;
    background: #28dce254;
    border  : 2px solid #E5E7E9;
    font-size: 15px;
    border-radius: 6px;
    padding: 2px 5px;
    justify-content: center;
    align-content: center;

    }
    .agregar:hover{
    color: #ffffff;
    background: #00000028;
    border: 2px solid #E5E7E9;
    }

    .container-payment-method select{
    appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none
    }

    .container-payment-method select::-ms-expand {
    display: none;
    }

    .container-payment-method {
    max-width: 280px;
	position: relative;

    }
    .container-payment-method select{
    display: inline-block;
	width: 150px;
	cursor: pointer;
  	padding: 5px 10px;
  	height: 30px;
  	outline: 0; 
  	border: 0;
	border-radius: 0;
	background: #f0f0f0;
	color: #7b7b7b;
	font-size: 15px;
	color: #999;
	font-family: 
	'Quicksand', sans-serif;
	border:2px solid rgba(0,0,0,0.2);
    border-radius: 12px;
    position: relative;
    transition: all 0.25s ease;
    }

    .container-payment-method select:hover{
	background: #8aebee;
    }

    .container-payment-method i{
	position: absolute;
	right: 20px;
	top: calc(50% - 13px);
	width: 16px;
	height: 16px;
	display: block;
	border-left:4px solid #2AC176;
	border-bottom:4px solid #2AC176;
	transform: rotate(-45deg); /* Giramos el cuadrado */
	transition: all 0.25s ease;
    }
 
    .container-payment-method:hover i{
	margin-top: 3px;
        }



</style>