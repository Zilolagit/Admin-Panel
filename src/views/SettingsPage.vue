<template>
  <h2>Settings</h2>
  <main class="setmain">
    <div class="modal-bacround" :class="{'modalactive':modaladd}" v-if="modaladd">
      <div class="modal__menu">
        <form class="modal-title-x" @submit.prevent="submit">
          <p>Qo'shish</p>
          <button @click="modaladd=false" :class="{'modal-bacround':!modaladd}" class="exec" ><img src="@/assets/images/xxxx.svg" alt=""></button>
        </form>
        <div class="name-en-inp-info">
          <p>name_en</p>
          <input required
            type="text"
            v-model="usernameEN"
            placeholder="name en">
          
        </div>
        <div class="name-en-inp-info">
          <p>name_ru</p>
          <input required
            type="text"
            v-model="usernameRU"
            placeholder="name ru">
        </div>
        <div class="name-en-inp-info">
          <p>upload image</p>
          <input type="file"
            @input="imagePicture($event.target.files[0])"
            accept="image/*"
            required
            placeholder="files">
        </div>
        <button @click="categoryCreate()" class="btn-add" type="submit">ADD</button>
      </div>
    </div>
    <div class="contend-search">
    <form action="">
      <button class="search__btn"><img class="search__img" src="../assets/images/search.svg" alt=""></button>
      <input type="text"  v-model="searchText" placeholder="large size"
    </form>

  </div>

  <table class="tabbleSetings">
    <thead class="setings__thead">
      <tr>
        <th class="setin__th">
          englishcha
        </th>
        <th class="setin__th">
          ruscha
          
        </th>
        <th class="setin__th">
          rasmlar
        </th>
        <th class="setin__th">
            O'zgartirish/O'chirish
          </th>
          <th class="th__contend"><button @click="modaladd=true"  class="contendAdd" >contend add</button></th>
      </tr>
    </thead>
    <tbody class="setings__tbody" v-for="item in products " :key="index">
      <tr>
        <td class="setings__td">
          {{ item.name_en }}
        </td>
        <td class="setings__td">
          {{ item.name_ru }}
        </td>
        <td class="setings__td">
          <img :src="`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`"
 alt="">
        </td>
        <td  class="edit-delit-cont">
          
          <button @click="(modaledit=true),editTovar(item)" class="img-edit-btn">
            <img class="img-edit"src="@/assets/images/bx-edit-alt.svg" alt="">
            <p>o'zgartirish</p>
          </button>
          <button @click="(modaldelete = true), handleok(item.id)" class="img-delete-btn">
            <img class="img-delete" src="@/assets/images/bxs-trash.svg" alt="">
            <p>o'chirish</p>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modall-add" v-if="modaledit" :class="{'modall-add-active':modaledit}">
    
      <form @submit.prevent="submit"  class="modal__add-content">
        <button  class="modall-add-close" @click="modaledit = false"><img src="@/assets/images/xxxx.svg" alt=""></button>
        <h3>O'zgartirish</h3>
        <input required
            type="text"
            v-model="data.name_en"
            @input="name_eninput($event.target.value)">
        <input required
            type="text"
            v-model="data.name_ru"
            @input="name_ruinput($event.target.value)"
            placeholder="name ru">
            <img class="edid-img" :src="'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/'+data.images" alt="">
        <input  required 
          type="file" 
          accept="image/*"
          @input="filesiput($event.target.files[0])">
        <button class="modall__qoshish" @click="editcategory()"
          type="submit">Qo'shish</button>
      </form>
    
  </div>


  <div class="modall-add" v-if="modaldelete" :class="{'modal-dell-active':modaldelete}">
    <div class="">
<form @submit.prevent="submit" class="delete__modal">
 
  <h3 >O'chirish</h3>
  <div class="btn-orq-uchir">
  <button @click="deletetovar(),(modaldelete = false)" type="submit">o'chirish</button>
  <button @click="(modaldelete = false)" type="submit">orqaga</button>
</div>
</form>
    </div>
  </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
// import CounterStore from '@/stores/counter.js'

import router from "@/router";
import apiPost from "../../api";
// const Counter = CounterStore()
//  const category = (event)=>{
//          fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')

//  }
// function submit(){

//   console.log(usernameEN.value,usernameRU.value,imagerasm.value)

// }
const modaladd = ref(false);
const products = ref(null);
const modaledit = ref(false);
const modaldelete = ref(false);
// const loginModal = ref(false)
const searchText = ref("")

function addmodal(item){
  modaladd.value = item
}
function editmodal(item){
  modaledit.value = item
}
async function fletchcard() {
 try {
  const res = await apiPost.getCatigories()
  products.value = res.data?.data
  
 } catch (error) {
  console.error(error);
 }
}
fletchcard();





const usernameEN = ref("");
const usernameRU = ref("");
const imagerasm = ref("");
function imagePicture(item) {
  imagerasm.value = item;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzIzOTQ2NSwiZXhwIjoxNzQ4Nzc1NDY1fQ.UEt1SCrKYagMGsSwD17emgwNH6JR7b1kvwI-ulXfanE";

const categoryCreate = () => {
  const formData = new FormData();
  formData.append("name_en", usernameEN.value);
  formData.append("name_ru", usernameRU.value);
  formData.append("images", imagerasm.value);
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
    method: "POST",
    body: formData,
    headers: {
      // 'Content-type' : 'application/json; charset= UTF-8',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if(res.success){
        addmodal(false)
        fletchcard();
       usernameEN.value = "";
       usernameRU.value = "";
       imagerasm.value = "";
       
      }
   
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const idtovar = ref("");
const handleok = (id) => {
  idtovar.value = id;
  console.log(idtovar.value);
};

const data = ref(
  { 
    name_en:"",
    name_ru:"",
    images:null
  }
);

const nameeninput = ref("")
const nameruinput = ref("")
const fileinput = ref(null)
function name_eninput(item){
  nameeninput.value = item
}
function name_ruinput (item){
  nameruinput.value = item
}
function filesiput (item){
  fileinput.value= item
}


const editTovar = (item) => {
  idtovar.value = item.id
  data.value.name_en = item.name_en
  data.value.name_ru = item.name_ru
  data.value.images = item.image_src
  console.log(data.value)
};
function onchange (){
  data.value.name_en = nameeninput.value
  data.value.name_ru = nameruinput.value
  data.value.images = fileinput.value
}



const editcategory = () =>{

  onchange ()
   const formData = new FormData();
   formData.append('name_en', data.value.name_en)
   formData.append('name_ru', data.value.name_ru)
   formData.append('images', data.value.images)

 fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${idtovar.value}`,{

      headers: {
        // 'Content-type' : 'application/json; charset= UTF-8',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body:formData
 }).then((res) => res.json()).then(res=>{

    fletchcard()
    editmodal(false)
   
  
 }).catch(error =>{
  console.log(error)
 })

}
const deletetovar = () => {
 
  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${idtovar.value}`,
    {
      method: "DELETE",
      headers: {
        'Content-type' : 'application/json; charset= UTF-8',
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json)
    .then((data) => {
      fletchcard();
      setLoading=false
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const username =ref("")
const password = ref("");

const login = ref('')
const paroll = ref('')
function  openHome(){
      if(CounterStore.logintext == CounterStore.login && CounterStore.paroltext == CounterStore.parol){
        // CounterStore.text1active = true,
        // CounterStore.text2active = false,
        CounterStore.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzIzOTQ2NSwiZXhwIjoxNzQ4Nzc1NDY1fQ.UEt1SCrKYagMGsSwD17emgwNH6JR7b1kvwI-ulXfanE"      
        setTimeout(() => {
          router.push('/home');
          CounterStore.logintext = ""
          CounterStore.paroltext = null
        }, 1000); 

      } else {
        // CounterStore.text1active = false,
        // CounterStore.text2active = true,
        CounterStore.token = ""
      }
    }
    //  const {loading,setLoading} = ref(false)  
     
     
//      const searchProduct = computed(() => {
//   return products?.value?.filter((item) =>
//     item.name.toLowerCase()?.includes(searchText.value.toLowerCase())
//   );
// });
</script>

<style lang="scss" scoped >
* {
    margin: 0 auto;
}




/* // form button {
//     background-color: darkgray;
//     border-radius: 10px 0 0 10px;
// } */
.setmain{
  form {
    display: flex;
    
    
}

input {
    padding: 10px;
    
}

.setings__td {
    width: 300px;
    border-radius: 10px;
    padding: 10px;
   
   
}

.setin__th {
    width: 300px;
    border-radius: 10px;
    padding: 10px;
    background-color: darkgrey;
}


.setings__tbody {
    background-color: #e4f0f5;
}

.setings__thead {
    border-bottom: 2px solid rgb(160, 160, 160);
    text-align: center;
    
    color: #000;
}

.tabbleSetings img {
    width: 150px;
    height: 150px;
    object-fit: cover;
}

.modal-bacround {
    position:fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
   transform: scale(0);
    left: 100%;
    bottom: 0;
    transition: 0.5s;
}

.modalactive {
    left: 0;
    transform: scale(1);
    transition: 0.5s;
}

.modal__menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 30px;
    padding: 30px;
    width: 300px;
    height: 500px;
}

.modal-title-x {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.name-en-inp-info input {
    width: 250px;
    
}

.btn-add {
    background-color: blue;
    padding: 10px;
    font-weight: 50px;
    border: none;
    border-radius: 10px;
    text-align: end;
}

.exec {
    background-color:red;
    border: none;
    padding: 5px;
    border-radius: 5px;
    
    top: 10px;
    right: 0;
}

.th__contend {
    border: none;
    background: none;
}

.contendAdd {
    background-color: blue;
    border: none;
    padding: 20px;
    border-radius: 10px;
    filter: drop-shadow(0px 0px 10px #7FFF00);
}

.contendAdd:hover {
    transform: scale(1.2);
}

.img-edit {
    width: 30px;
    height: 30px;
}
.img-delete {
    width: 30px;
    height: 30px;
}

.modall-add {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 100%;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: none;
    justify-content: center;
    align-items: center;
transition: 0.5s;
}

.modal-dell-active {
    display: flex;
top: 0;
transition: 0.5s;
}

.modall-add-active {
    display: flex;
top: 0;
transition: 0.5s;
}

.modal__add-content {
    display: flex;
  justify-content: space-between;
    flex-direction: column;
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 30px;
    height: 500px;
}

 

button {
    
    img {
        width: 10px;
        height: 10px;
    }
}

.delete__modal {
    background-color: #fff;
    padding: 30px;
    flex-direction: column;
    position: relative;
    gap: 30px;
    border-radius: 30px;
}

.modall-add-close {
    position: absolute;
    top: 20px;
    right: 30px;
}

.modall__qoshish {
    padding: 10px;
    background-color: chartreuse;
}
.modall__qoshish:hover {
    padding: 10px;
    background-color: darkorange;
}

.btn-orq-uchir {
    display: flex;
    gap: 10px;

    button {
        padding: 10px;
    }
}



.edid-img {
    width: 150px;
    height: 150px;
}

.contend-login {
    display: flex;
    justify-content: space-between;
    padding: 30px;
}

.login-text {
    padding: 20px;
    background-color: #2c5e77;
    border: none;
    filter: drop-shadow(0px 0px 10px #000);
    border-radius: 10px;
}

.login-text:hover {
    transform: scale(1.2);
    background-color: aquamarine;
    color: #fff;
}

.login-back {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 100%;
    display: none;
}

.login-bacc-add {
    display: flex;
    transform: 0.5s;
    right: 0;
}

.login-container {
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
position: relative;
border-radius: 30px;
    button {
        padding: 10px;
    }
}

.exec-login {
    background-color: red;
    position: absolute;
    top: 35px;
    right: 30px;
    border: none;
    border-radius: 10px;
}

.login-btns {
    background-color: green;
    border: none;
    border-radius: 10px;
}

.edit-delit-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    gap: 30px;
}

.img-edit-btn {
    height: 100px;
    img {
      width: 30px;
      height: 50px
    }
}

.img-delete-btn {
    height: 100px;
    width: 80px;
    img {
      width: 30px;
      height: 50px
    }
}

.img-delete-btn:hover {
    background-color: red;
    p {
        color: #fff;
    }
}

.img-edit-btn:hover {
    background-color: green;
    p {
        color: #fff;
    }
}

.search__img {
    width: 30px;
    height: 30px;
    background: none;
}

.search__btn {
    background: none;
}

.contend-search {
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-start;
}
}



</style>