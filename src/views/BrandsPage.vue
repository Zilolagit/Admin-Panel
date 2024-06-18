<script setup>
import { ref } from "vue";

import axiosCustom from "@/axiosConf";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ openclosed Modals~~~~~~~~~~~~~~~~~~~
const modaladd = ref(false);
function addmodal(item) {
  modaladd.value = item;
}

const modaldelete = ref(false);
function deletemodal(item) {
  modaldelete.value = item;
}

const modaledit = ref(false);
function editmodal(item){
  modaledit.value = item
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~Product view~~~~~~~~~~~~~~~~~~~~~~
const products = ref(null);
// async function fletchcard() {
//   const res = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands");
//   const data = await res.json();
//   products.value = data?.data;
// }
// fletchcard();

async function fletchcard() {
  const response = await axiosCustom.get('brands')
  products.value = response.data?.data;
}
fletchcard();



//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref("")
// ~~~~~~~~~~~~~~~~~~~~~~~~~ADD PRODUCT~~~~~~~~~~~~~~~~~~~~~~~
const Title = ref("");
const imagerasm = ref("");
function imagePicture(item) {
  imagerasm.value = item;
}





const addProduct = async ()=>{
  const formData = new FormData();
  formData.append("title", Title.value);
  formData.append("images", imagerasm.value);
  try {
     await axiosCustom.post(`brands`,formData, {
    });
        addmodal(false);
        fletchcard();
        Title.value = "";
        imagerasm.value = "";

  } catch (error) {
  }
}


//~~~~~~~~~~~~~~~~~~~~~ edit Product~~~~~~~~~~~~~~~~~~~~~~~~~


const inputTitle = ref("")
const inputimages = ref("")

function titleinput (item){
  inputTitle.value = item
}

function imageinput (item){
  inputimages.value = item
}
const data = ref(
  { 
    title:"",
    images:null
  }
);

const editProduct =(item) =>{
  idtovar.value = item.id
  inputTitle.value = item.title,
  inputimages.value = item.image_src
  onChange()
}
function onChange(){
   data.value.title = inputTitle.value,
   data.value.images =  inputimages.value
}

const editChangeProduct = async ()=>{
  onChange()
  editmodal(false)
 const formdata = new FormData();
 formdata.append('title',data.value.title);
 formdata.append('images',data.value.images)
  try {
     await axiosCustom.put(`brands/${idtovar.value}`,formdata, {
    });
        fletchcard();
  } catch (error) {
  }
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~DELET PRODUCT~~~~~~~~~~~~~~~~~~~~~~~~
const tovarid = (id) =>{
  idtovar.value = id
}

const deleteProduct = async ()=>{
  try {
    const response = await axiosCustom.delete(`brands/${idtovar.value}`)
    fletchcard();
    deletemodal(false)
  } 
  catch{

  }
}


</script>



<template>
  <div class="brandpages">
    <div class="brandpages__container">
      <div class="brandpages__container-add">
        <h3 class="brandpages__container-add-text">Qo'shish</h3>
        <button class="brandpages__container-add-btn" @click="modaladd = true">
          <svg
            class="btn-svg"
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="plus-circle"
            width="25px"
            height="25px"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"
            ></path>
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
          </svg>
        </button>
      </div>


      
      <div class="table__container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item">
              <td>{{ item?.title }}</td>
              <td>
                <img
                  :src="
                    'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    item.image_src
                  "
                  alt=""
                />
              </td>
              <td class="action">
                <button class="btn-edit" @click="editmodal(true),editProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  <!-- <img  class="edit w-[30px]" src="@/assets/icon/edit.svg" alt="edit"> -->
                  <span>EDIT</span>
                </button>

                <button class="btn-delete" @click="(modaldelete = true), tovarid(item.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  <span>DELETE</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Modal ADD~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <transition name="bounce">
    <div v-if="modaladd" class="modal__add">
      <div class="modal__add__container">
        <div class="closed" @click="modaladd = false">X</div>
        <h3>Tovar Qo'shish</h3>
        <form action="" @submit.prevent="addProduct">
          <input 
          required 
          type="text" 
          v-model="Title"
          placeholder="name" />
          <input
            class="inputimg"
            placeholder=""
            type="file"
            @input="imagePicture($event.target.files[0])"
            accept="image/*"
            required
          />
          <button type="addProduct">Add</button>
        </form>
      </div>
    </div>
  </transition>



  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~ Modal Delete~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <transition name="bounce">
    <div v-if="modaldelete" class="modal__delete">
      <div class="modal__delete__container">
        <h3>O'chirishni hohlaysizmi?</h3>
        <form action="" @submit.prevent="deleteProduct">
          <button class="btn__delete" type="deleteProduct">Delete</button>
          <div class="btn__cancel" @click="deletemodal(false)">Cancel</div>
        </form>
      </div>
    </div>
  </transition>



  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Modal EDIT~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <transition name="bounce">
    <div v-if="modaledit" class="modal__edit">
      <div class="modal__edit__container">
        <div class="closed" @click="modaledit = false">X</div>
        <h3>EDIT TOVAR</h3>
        <form action="" @submit.prevent="editChangeProduct">
          <input 
          required 
          type="text" 
          v-model="data.title"
          @input="titleinput($event.target.value)"
          placeholder="name" />
          <input
            class="inputimg"
            placeholder=""
            type="file"
            @input="imageinput($event.target.files[0])"
            accept="image/*"
            required
          />
          <div class="images">
            <img :src="
                    'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/' +
                     data.images
                  " alt="">
          </div>
          <button type="editChangeProduct">EDIT</button>
        </form>
      </div>
    </div>
  </transition>


</template>


<style lang="scss" scoped>
button{
  border:none;
  outline: none;
}
input{
  border: none;
  outline: none;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}


.brandpages{
    width: 100%;
    &__container{
          max-width: 1200px;
          width: 100%;
        &-add{
         display: flex;
         justify-content: space-between;
         align-items: center;
        &-text{
            color:red;
            font-family: Arial, Helvetica, sans-serif;
            animation: 2s neon-2 alternate-reverse infinite;
        }
        &-btn{
            cursor: pointer;
            padding: 10px 20px;
            border-radius: 8px;
            background: #1677FF;   
            transition: 1s;
            &:hover{
                background: aqua;
            }    
        }
        }     
    }
}

@keyframes neon-2 {
    0%{
      color:rgb(0, 8, 41);
    }
    100%{
      color:#1677FF;
    }
  }


</style>

  
