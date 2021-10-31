<template>
 <div class= 'tabla'>
   <h2>Gestion de Productos</h2>
    <input type="checkbox" id="btn-modal">
  <label for="btn-modal" class="lbl-modal">Agregar Producto</label>
	<div class="modal">
		<div class="contenedor">
			<header>¡Bienvenidos!</header>
			<label for="btn-modal">X</label>
			<div class="contenido">
				<h3>Panel de Creacion de objetos</h3>
        <br>
        <form v-on:submit.prevent="processCreateProduct">
          <div class="contenedor-inputs">
            <input type="text" placeholder="Name" v-model="product.product_data.name"/>
            <br><br>
            <input type="number" placeholder="Price" v-model="product.product_data.price"/>
            <br><br>
            <input type="number" placeholder="Amount" min="0" step="1" v-model="product.product_data.amount"/>
            <br><br>
            <button type="submit">Guardar</button>
          </div>
        </form>
			</div>
		</div>
  </div>

     <input type="checkbox" id="btn-modal2">
  <label for="btn-modal2" class="lbl-modal2">Modificar  y Eliminar Productos</label>

  
	<div class="modal2">
		<div class="contenedor2">
			<header>¡Bienvenidos!</header>
			<label for="btn-modal2">X</label>
			<div class="contenido2">
				<h3>Panel de modificacion de objetos</h3>
        <br>
        <form v-on:submit.prevent="processUpdateProduct">
          <div class="contenedor-inputs2">
            <input type="number" placeholder="Id" min="1" step="1" v-model="id">
            <br><br>
            <input type="text" placeholder="Name" v-model="product.name">
            <br><br>
            <input type="number" placeholder="Price" v-model="product.price">
            <br><br>
            <input type="number" placeholder="Amount" min="1" step="1" v-model="product.amount">
            <br><br>
            <button type="submit">Editar</button>
            <button class="btn" type="button" v-on:click="productDelete">Eliminar</button>
            
          </div>
        </form>
			</div>
		</div>
	</div>
  <br><br>

    <div class="information">
   <table class="table-hover" >
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in listProduct" :key="producto.id">
                        <th scope="row">{{ producto.id}}</th>
                        <td>{{ producto.name }}</td>
                        <td>{{ producto.price }}</td>
                        <td>{{ producto.amount }}</td>
                    </tr>
            
                </tbody>
    </table>
    </div>
    <br>
    </div>
   

 
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "Account",
  data: function() {
    return {

      product: {
                user_id : 0,
                product_data : {
                    name   : "",
                    price  : "",
                    amount : "",
                },
                },
      delete: {
              id:""
      },
              
        listProduct:null,
        loaded: false,
    };
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
        createProduct: function(){
        this.$router.push({"name":"productcreate"})
        },

        loadUpdateProduct:function(data_table){
          //console.log(data_table);
        this.$router.push({"name":"updateProduct",params: {data:data_table.id + "*," + data_table.name + "*," 
                                                             + data_table.price + "*," + data_table.amount}});
        },


        processCreateProduct : async function(){
            if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit("logOut");
                    return;
                }
            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            this.product.user_id = userId;

            axios.post(
                'https://misionticbankbe1.herokuapp.com/product/create/',
                this.product,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                let dataProductCreated = {
                    "name" : this.product.product_data.name,
                    "price" : this.product.product_data.price,
                    "amount": this.product.product_data.amount
                }
                alert("producto agregado con exito")
                this.$router.push({"name":"account"})
                
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

        processUpdateProduct : async function(){
            if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit("logOut");
                    return;
                }
            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            axios.put(
                `https://misionticbankbe1.herokuapp.com/product/update/${userId}/${this.id}/`,
                this.product,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                alert("Producto Actualizado con Exito")
                this.$emit("completedProductCreate", this.$router.push({"name":"account"}));
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
        productDelete:async function(){
            if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit("logOut");
                    return;
                }
            await this.verifyToken();

            let token  = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id;

            axios.delete(
                `https://misionticbankbe1.herokuapp.com/product/remove/${userId}/${this.id}/`,
                {headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
              let dataeliminateproduct={
              }
                alert("Producto eliminado!");
                this.$router.push({name:"product"})
                //this.$emit("completedProductCreate", this.product);
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


    verifyToken: function() {
      return axios
        .post(
          "https://misionticbankbe1.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          alert("que esta pasando 3");
          this.$emit("logOut");
        });
    },
  
  },
    

  created:function(){
        let txt = this.$route.params.data;
        let dataShare = txt.split("*,");

        this.id     = dataShare[0];
        this.product.name   = dataShare[1];
        this.product.price  = dataShare[2];
        this.product.amount = dataShare[3];

        console.log(this.product);
        
    },
  created: async function() {
    this.getData();
  },
};

    
</script>

<style>

.tabla{
  background-color: rgba(0, 0, 0, 0.363);
}
    .tabla h2{
        color: rgb(255, 255, 255);
        align-content: center;
        text-align: center;
        font-size: 35px;
        
    }
    .information{
      
        align-content:space-around;
        text-align: center;
        display: flex;
        align-items: center;
        color:rgb(0, 0, 0);
        justify-content: center;
        

    }
    
    .table-hover{
        width: 600px;
        border-collapse: collapse;
        border: 2px solid black;
        background-color: white;
       
    }
    .table-hover th{
        border: 1px solid black;
        padding: 0;
    }
    
    .table-hover td{
        border: 1px solid black;
        padding: 0;
    }
    .table-hover thead{
        background-color: rgb(40, 41, 41);
        color: aliceblue;
    }
    .table-hover tbody{
        background-color: rgba(104, 221, 250, 0.692);
    }

    .table-hover tr:nth-child(even){
        background-color: rgba(149, 200, 212, 0.795);
        
    }
  




/* ventana modal 1 */
  .modal{
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.5);
	transition: all 500ms ease;
	opacity: 0;
	visibility: hidden;
}
#btn-modal:checked ~ .modal{
	opacity: 1;
	visibility: visible;
} 
.contenedor{
	width: 400px;
	height: 300px;
	margin: auto;
  border: 3px solid white;
  color: white;
	background: rgba(112, 112, 112, 0.815);
	box-shadow: 1px 7px 25px rgba(0,0,0,0.6);
	transition: all 500ms ease;
	position: relative;
	transform: translateY(-30%);
  justify-content: center;
  
}
#btn-modal:checked ~ .modal .contenedor{
	transform: translateY(0%);
} 
.contenedor header{
	padding: 10px;
	background: #5adacf81;
	color: rgb(0, 0, 0);
  align-content: center;
}
.contenedor label{
	position: absolute;
	top: 10px;
	right: 10px;
	color: rgb(0, 0, 0);
	font-size: 15px;
	cursor: pointer;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right:auto;
  
}

.contenido{
	width: 100%;
	padding: 10px; 
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right:auto;
}
.contenido h3{
	margin-bottom: 10px;
}
.contenido p{
	margin-bottom: 7px;
}
#btn-modal{
	display: none;
}
.lbl-modal{
	background: rgba(78, 78, 78, 0.404);
  border: 1px solid white;
	padding: 5px 30px;
	border-radius: 4px;
	cursor: pointer;
  color: white;
  font-size:25px;
  


}

.lbl-modal:hover{
  background-color: #5adacf81;
}



@media only screen and (min-width:320px) and (max-width:768px){
	.contenedor{
		width: 95%;
	}
}



/* ventana modal 2 */

  .modal2{
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal2{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.5);
	transition: all 500ms ease;
	opacity: 0;
	visibility: hidden;
}
#btn-modal2:checked ~ .modal2{
	opacity: 1;
	visibility: visible;
} 
.contenedor2{
	width: 400px;
	height: 300px;
	margin: auto;
  border: 3px solid white;
  color: white;
	background: rgba(112, 112, 112, 0.815);
	box-shadow: 1px 7px 25px rgba(0,0,0,0.6);
	transition: all 500ms ease;
	position: relative;
	transform: translateY(-30%);
}
#btn-modal2:checked ~ .modal2 .contenedor2{
	transform: translateY(0%);
} 
.contenedor2 header{
	padding: 10px;
	background: #5adacf81;
	color: rgb(0, 0, 0);
}
.contenedor2 label{
	position: absolute;
	top: 10px;
	right: 10px;
	color: rgb(0, 0, 0);
	font-size: 15px;
	cursor: pointer;

}

.contenido2{
	width: 100%;
	padding: 10px; 
  justify-content: center;
  text-align: center;
  margin-right:auto;
}
.contenido2 h3{
	margin-bottom: 10px;
}
.contenido2 p{
	margin-bottom: 7px;
}
#btn-modal2{
	display: none;
}
.lbl-modal2{
	background: rgba(78, 78, 78, 0.404);
  border: 1px solid white;
	padding: 5px 7px;
	border-radius: 4px;
	cursor: pointer;
  color: white;
  

  vertical-align: top;
  font-size: 25px;
}

.lbl-modal2:hover{
  background-color: #5adacf81;
}

@media only screen and (min-width:320px) and (max-width:768px){
	.contenedor2{
		width: 95%;
	}
}


/* ventana modal 3 */

  .modal3{
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal3{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.5);
	transition: all 500ms ease;
	opacity: 0;
	visibility: hidden;
}
#btn-modal3:checked ~ .modal3{
	opacity: 1;
	visibility: visible;
} 
.contenedor3{
	width: 400px;
	height: 300px;
	margin: auto;
  border: 3px solid white;
  color: white;
	background: rgba(112, 112, 112, 0.815);
	box-shadow: 1px 7px 25px rgba(0,0,0,0.6);
	transition: all 500ms ease;
	position: relative;
	transform: translateY(-30%);
}
#btn-modal3:checked ~ .modal3 .contenedor3{
	transform: translateY(0%);
} 
.contenedor3 header{
	padding: 10px;
	background: #e6ff56;
	color: rgb(0, 0, 0);
}
.contenedor3 label{
	position: absolute;
	top: 10px;
	right: 10px;
	color: rgb(0, 0, 0);
	font-size: 15px;
	cursor: pointer;
  justify-content: center;
  text-align: center;
  margin-right:auto;
}

.contenido3{
	width: 100%;
	padding: 10px; 
  justify-content: center;
  text-align: center;
  margin-right:auto;
}
.contenido3 h3{
	margin-bottom: 10px;
}
.contenido3 p{
	margin-bottom: 7px;
}
#btn-modal3{
	display: none;
}
.lbl-modal3{
	background: rgba(78, 78, 78, 0.404);
  border: 1px solid white;
	padding: 10px 15px;
	border-radius: 4px;
	cursor: pointer;
  color: white;
  justify-content: center;
  text-align: center;
  margin-right:auto;
  display: inline-block;
  vertical-align: top;
}

.lbl-modal3:hover{
  background-color: #bfda49b9;
}

@media only screen and (min-width:320px) and (max-width:768px){
	.contenedor3{
		width: 95%;
	}
}

    



</style>