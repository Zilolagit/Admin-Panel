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
function editmodal(item) {
  modaledit.value = item;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~Product view~~~~~~~~~~~~~~~~~~~~~~
const products = ref([]);
async function fletchcard() {
  const response = await axiosCustom.get('cars')
  products.value = response.data?.data;
}
fletchcard();
//~~~~~~~~~~~IDTOVAR~~~//
const idtovar = ref("");

// ~~~~~~~~~~~~~~~~~~~~~category~~~~~~~~~~~~~~

const category = ref([]);
async function fletchcategory() {
  const response = await axiosCustom.get('categories')
  category.value = response.data?.data;
}
fletchcategory();

// ~~~~~~~~~~~~~~~~~~~~~brands~~~~~~~~~~~~~~
const brands = ref(null);
async function fletchbrand() {
  const response = await axiosCustom.get('brands')
  brands.value = response.data?.data;
}

fletchbrand();

// ~~~~~~~~~~~~~~~~~~~~~models~~~~~~~~~~~~~~
const models = ref(null);
async function fletchmodels() {
  const response = await axiosCustom.get('models')
  models.value = response.data?.data;
}
fletchmodels();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~location~~~~~~~~~~~~~~~~~~~~~

const location = ref(null);
async function fletchlocation() {
  const response = await axiosCustom.get('locations')
  location.value = response.data?.data;
}
fletchlocation();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~city~~~~~~~~~~~~~~~~~~~~~~

const city = ref(null);
async function fletchcity() {
  const response = await axiosCustom.get('cities')
  city.value = response.data?.data;

}
fletchcity();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~form select input~~~~~~~~~~~~~~~~~~~~~~~~~~~
const inputcategory = ref("");
function categoryinput(item) {
  inputcategory.value = item;

}
const inputbrand = ref("");
function brandinput(item) {
  inputbrand.value = item;
}
const inputmodel = ref("");
function modelinput(item) {
  inputmodel.value = item;
}
const inputlocation = ref("");
function locationinput(item) {
  inputlocation.value = item;
}
const inputcity = ref("");
function cityinput(item) {
  inputcity.value = item;
}
const inputpeople = ref("");
function peopleinput(item) {
  inputpeople.value = item;
}
const inputtransmission = ref("");
function transmissioninput(item) {
  inputtransmission.value = item;
}
const inputfuel = ref("");
function fuelinput(item) {
  inputfuel.value = item;
}
const inputimgcar = ref("");
function imagePicture1(item) {
  inputimgcar.value = item;
}
const inputimgmain = ref("");
function imagePicture2(item) {
  inputimgmain.value = item;
}

const inputimgcover = ref("");
function imagePicture3(item) {
  inputimgcover.value = item;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~form v-model input~~~~~~~~~~~~~~~~~~~~~~~
const inputcolor = ref("");
const inputyear = ref(null);
const inputseconds = ref("");
const inputspeed = ref("");
const inputmotor = ref("");
const inputdrive = ref("");
const inputlimit = ref("");
const inputdeposit = ref("");
const inputpremium = ref("");
const inputpriceead = ref("");
const inputpriceeadotd = ref("");
const inputpriceusd = ref("");
const inputpriceusdotd = ref("");
const inputinclusive = ref(false);

// ~~~~~~~~~~~~~~~~~~~~~~~~~ADD PRODUCT~~~~~~~~~~~~~~~~~~~~~~~

const addProduct = async () => {
  const formData = new FormData();
  formData.append("brand_id", inputbrand.value);
  formData.append("model_id", inputmodel.value);
  formData.append("city_id", inputcity.value);
  formData.append("color", inputcolor.value);
  formData.append("year", inputyear.value);
  formData.append("seconds", inputseconds.value);
  formData.append("category_id", inputcategory.value);
  formData.append("images", inputimgcar.value);
  formData.append("images", inputimgmain.value);
  formData.append("max_speed", inputspeed.value);
  formData.append("max_people", inputpeople.value);
  formData.append("transmission", inputtransmission.value);
  formData.append("motor", inputmotor.value);
  formData.append("drive_side", inputdrive.value);
  formData.append("petrol", inputfuel.value);
  formData.append("limitperday", inputlimit.value);
  formData.append("deposit", inputdeposit.value);
  formData.append("premium_protection", inputpremium.value);
  formData.append("price_in_aed", inputpriceead.value);
  formData.append("price_in_usd", inputpriceusd.value);
  formData.append("price_in_aed_sale", inputpriceeadotd.value);
  formData.append("price_in_usd_sale", inputpriceusdotd.value);
  formData.append("location_id", inputlocation.value);
  formData.append("inclusive", inputinclusive.value);
  formData.append("cover", inputimgcover.value);
  try {
    await axiosCustom.post(`cars`,formData, {
    })
        fletchcard();
        addmodal(false);

  } 
  catch{
    addmodal(false);
  }
};

//~~~~~~~~~~~~~~~~~~~~~ edit Product~~~~~~~~~~~~~~~~~~~~~~~~~




const data = ref({
  brand_id: "",
  model_id: "",
  city_id:"",
  category_id:"",
  color:"",
  year:null,
  seconds:"",

  images1:null,
  images2:null,
  max_speed:"",
  max_people:"",
  transmission:"",
  motor:"",
  drive_side:"",
  petrol:"",
  limitperday:"",
  deposit:"",
  premium_protection:"",
  price_in_aed:"",
  price_in_usd:"",
  price_in_aed_sale:"",
  price_in_usd_sale:"",
  location_id:"",
  inclusive:Boolean,
  cover:null

});
const indextovar = ref("")
const editProduct = (item,index) => {
   indextovar.value = index
   idtovar.value = item.id;
   inputbrand.value = item.brand_id
   inputmodel.value = item.model_id
   inputcity.value = item.city_id
   inputcategory.value = item.category_id
   inputcolor.value = item.color
   inputyear.value = item.year
   inputseconds.value = item.seconds

   inputimgcar.value = item.car_images[0].image.src
   inputimgmain.value = item.car_images[1].image.src
   inputspeed.value = item.max_speed
   inputpeople.value = item.max_people
   inputtransmission.value = item.transmission
   inputmotor.value = item.motor
   inputdrive.value = item.drive_side
   inputfuel.value = item.petrol
   inputlimit.value = item.limitperday
   inputdeposit.value = item.deposit
   inputpremium.value = item.premium_protection
   inputpriceead.value = item.price_in_aed
   inputpriceusd.value = item.price_in_usd
   inputpriceeadotd.value = item.price_in_aed_sale
   inputpriceusdotd.value = item.price_in_usd_sale
   inputlocation.value = item.location_id
   inputinclusive.value =item.inclusive
   inputimgcover.value = item.car_images[2].image.src
  onChange();

};

function onChange(){
   data.value.brand_id = inputbrand.value,
   data.value.model_id =  inputmodel.value
   data.value.city_id = inputcity.value,
   data.value.category_id = inputcategory.value,
   data.value.color =  inputcolor.value
   data.value.year = inputyear.value,
   data.value.seconds =  inputseconds.value
  
   data.value.images1 =  inputimgcar.value
   data.value.images2 = inputimgmain.value,
   data.value.max_speed =  inputspeed.value
   data.value.max_people = inputpeople.value,
   data.value.transmission =  inputtransmission.value
   data.value.motor = inputmotor.value,
   data.value.drive_side =  inputdrive.value,
   data.value.petrol = inputfuel.value,
   data.value.limitperday =  inputlimit.value,
   data.value.deposit = inputdeposit.value,
   data.value.premium_protection =  inputpremium.value,
   data.value.price_in_aed = inputpriceead.value,
   data.value.price_in_usd =  inputpriceusd.value,
   data.value.price_in_aed_sale = inputpriceeadotd.value,
   data.value.price_in_usd_sale = inputpriceusdotd.value,
   data.value.location_id = inputlocation.value,
   data.value.inclusive =  inputinclusive.value
   data.value.cover =  inputimgcover.value
  // console.log(data)
}

const editChangeProduct = async () => {
  
  onChange();
  const formData = new FormData();
  formData.append("brand_id", data.value.brand_id);
  formData.append("model_id", data.value.model_id);
  formData.append("city_id", data.value.city_id);
  formData.append("category_id", data.value.category_id);
  formData.append("color", data.value.color);
  formData.append("year", data.value.year);
  formData.append("seconds", data.value.seconds);
  formData.append("images", data.value.images1);
  formData.append("images", data.value.images2);
  formData.append("max_speed", data.value.max_speed);
  formData.append("max_people", data.value.max_people);
  formData.append("transmission", data.value.transmission);
  formData.append("motor", data.value.motor);
  formData.append("drive_side", data.value.drive_side);
  formData.append("petrol", data.value.petrol);
  formData.append("limitperday", data.value.limitperday);
  formData.append("deposit", data.value.deposit);
  formData.append("premium_protection", data.value.premium_protection);
  formData.append("price_in_aed", data.value.price_in_aed);
  formData.append("price_in_usd", data.value.price_in_usd);
  formData.append("price_in_aed_sale", data.value.price_in_aed_sale);
  formData.append("price_in_usd_sale", data.value.price_in_usd_sale); 
  formData.append("location_id", data.value.location_id);
  formData.append("inclusive", data.value.inclusive);
  formData.append("cover", data.value.cover);
  try {
    await axiosCustom.put(`cars/${idtovar.value}`,formData, {
    })
        editmodal(false);
        fletchcard();
  } 
  catch{

  }

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~DELET PRODUCT~~~~~~~~~~~~~~~~~~~~~~~~
const tovarid = (id) => {
  idtovar.value = id;
};
const deleteProduct = async ()=>{
  try {
    const response = await axiosCustom.delete(`cars/${idtovar.value}`)
    fletchcard();
    deletemodal(false);
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
              <th>Color</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Kategoriya</th>
              <th>lokatsiya</th>
              <th>action</th>
            </tr>
          </thead>


          <tbody>
            <tr v-for="(item,index) in products" :key="item">
              <td>{{ item?.color }}</td>
              <td>{{ item?.brand.title }}</td>
              <td>{{ item?.model.name }}</td>
              <td>{{ item?.category.name_en }}</td>
              <td>{{ item?.location.name }}</td>

             
              <td class="action">
                <button
                  class="btn-edit"
                  @click="editmodal(true), editProduct(item,index)"
                >
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

                <button
                  class="btn-delete"
                  @click="(modaldelete = true), tovarid(item.id)"
                >
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
    <div v-if="modaladd" class="modal__add-cars">
      <div class="modal__add-cars__container">
        <div class="closed" @click="modaladd = false">X</div>
        <h3>Add cars</h3>

        <form class="forma" action="" @submit.prevent="addProduct">
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Category</p></label
            >
            <select
              required
              name=""
              id=""
              @input="categoryinput($event.target.value)"
          
            >
      
             <option  v-for="item in category" :key="item" :value='item.id'>{{ item.name_en }}</option>  
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Brand</p></label
            >
            <select
              required
              name=""
              id=""
              @input="brandinput($event.target.value)"
            >
            <option  v-for="item in brands" :key="item" :value='item.id'>{{ item.title }}</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Model</p></label
            >
            <select
              required
              name=""
              id=""
              @input="modelinput($event.target.value)"
              
            >
            <option  v-for="item in models" :key="item" :value='item.id'>{{ item.name }}</option>
     
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Location</p></label
            >
            <select
              required
              name=""
              id=""
              @input="locationinput($event.target.value)"
            >
              <option v-for="item in location" :key="item" :value='item.id' >{{ item.name }}</option>
             
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>City</p></label
            >
            <select
              required
              name=""
              id=""
              @input="cityinput($event.target.value)"
            >
            <option v-for="item in city" :key="item" :value='item.id' >{{ item.name }}</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Color</p></label
            >
            <input
              class="colorinput"
              type="text"
              value=""
              v-model="inputcolor"
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Year</p></label
            >
            <input type="number" v-model="inputyear" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Seconds</p></label
            >
            <input type="number" v-model="inputseconds" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Speed</p></label
            >
            <input type="number" v-model="inputspeed" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Max People</p></label
            >
            <select
              required
              name=""
              id=""
              @input="peopleinput($event.target.value)"
            >
              <option value="" disabled selected hidden>Select People</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="auto">auto</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Motor</p></label
            >
            <input type="text" v-model="inputmotor" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Transmission</p></label
            >
            <select
              required
              name=""
              id=""
              @input="transmissioninput($event.target.value)"
            >
              <option value="" disabled selected hidden>
                Select transmission
              </option>
              <option value="Mechanics">Mechanics</option>
              <option value="Automatic box">Automatic box</option>
              <option value="Mechanics and Automatic">
                Mechanics and Automatic
              </option>
              <option value="Electric">Electric</option>
              <option value="defauld">defauld</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Drive Side</p></label
            >
            <input type="text" v-model="inputdrive" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Fuel</p></label
            >
            <select
              required
              name=""
              id=""
              @input="fuelinput($event.target.value)"
            >
              <option value="" disabled selected hidden>Select Fuel</option>
              <option value="Gas cylinder">Gas cylinder</option>
              <option value="Gasoline tank">Gasoline tank</option>
              <option value="Methane cylinder">Methane cylinder</option>
              <option value="Electric battery">Electric battery</option>
              <option value="defauld">defauld</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Limit Per Day</p></label
            >
            <input type="number" v-model="inputlimit" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Deposit</p></label
            >
            <input type="number" v-model="inputdeposit" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Premium Protection Price</p></label
            >
            <input type="text" v-model="inputpremium" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in AED</p></label
            >
            <input type="text" v-model="inputpriceead" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in AED (Otd)</p></label
            >
            <input type="text" v-model="inputpriceeadotd" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in USD</p></label
            >
            <input type="text" v-model="inputpriceusd" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in USD(Otd)</p></label
            >
            <input type="text" v-model="inputpriceusdotd" />
          </div>
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload car images</p></label
            >
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture1($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload the main image</p></label
            >
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture2($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload the cover image</p></label
            >
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture3($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Inclusive</p></label
            >
            <input class="chek" type="checkbox" v-model="inputinclusive" />
          </div>

          <br />

          <button class="cars__btn-add" type="addProduct">Add</button>
          <div class="cars__btn-cancel" @click="addmodal(false)">cancel</div>
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
    <div v-if="modaledit" class="modal__add-cars">
      <div class="modal__add-cars__container">
        <div class="closed" @click="modaledit = false">X</div>
        <h3>EDIT</h3>

        <form class="forma" action="" @submit.prevent="editChangeProduct">
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Category</p></label
            >
            <select
              required
              name=""
              id=""
              @input="categoryinput($event.target.value)"
             
            >
            <option value="" disabled selected hidden>{{ category[indextovar]?.name_en }}</option>
            <option  v-for="item in category" :key="item" :value='item.id'>{{ item?.name_en }}</option>  
            </select>
          </div>
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Brand</p></label
            >
            <select
              required
              name=""
              id=""
              @input="brandinput($event.target.value)"
            >
            <option value="" disabled selected hidden>{{ brands[indextovar]?.title }}</option>
            <option  v-for="item in brands" :key="item" :value='item.id'>{{ item?.title }}</option>  
    
            </select>
          </div>
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Model</p></label
            >
            <select
              required
              name=""
              id=""
              @input="modelinput($event.target.value)"
            >
            <option value="" disabled selected hidden>{{ models[indextovar]?.name }}</option>
            <option  v-for="item in models" :key="item" :value='item.id'>{{ item?.name }}</option>  

            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Location</p></label
            >
            <select
              required
              name=""
              id=""
              @input="locationinput($event.target.value)"
            >
            <option value="" disabled selected hidden>{{ location[indextovar]?.name }}</option>
            <option  v-for="item in location" :key="item" :value='item.id'>{{ item?.name }}</option>  
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>City</p></label
            >
            <select
              required
              name=""
              id=""
              @input="cityinput($event.target.value)"
            >
            <option value="" disabled selected hidden>{{ city[indextovar]?.name }}</option>
            <option  v-for="item in city" :key="item" :value='item.id'>{{ item?.name }}</option>  
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Color</p></label
            >
            <input
              class="colorinput"
              type="text"
              value=""
              v-model="inputcolor"

            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Year</p></label
            >
            <input type="number"  v-model="inputyear" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Seconds</p></label
            >
            <input type="number" v-model="inputseconds" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Speed</p></label
            >
            <input type="number" v-model="inputspeed" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Max People</p></label
            >
            <select
              required
              name=""
              id=""
              @input="peopleinput($event.target.value)"
            >
              <option value="" disabled selected hidden>{{inputpeople}}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="auto">auto</option>
            </select>
          </div>

         <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Motor</p></label
            >
            <input type="text" v-model="inputmotor" />
          </div>
 
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Transmission</p></label
            >
            <select
              required
              name=""
              id=""
              @input="transmissioninput($event.target.value)"
            >
              <option value="" disabled selected hidden>
              {{ inputtransmission }}
              </option>
              <option value="Mechanics">Mechanics</option>
              <option value="Automatic box">Automatic box</option>
              <option value="Mechanics and Automatic">
                Mechanics and Automatic
              </option>
              <option value="Electric">Electric</option>
              <option value="defauld">defauld</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Drive Side</p></label
            >
            <input type="text" v-model="inputdrive" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Fuel</p></label
            >
            <select
              required
              name=""
              id=""
              @input="fuelinput($event.target.value)"
            >
              <option value="" disabled selected hidden>{{inputfuel}}</option>
              <option value="Gas cylinder">Gas cylinder</option>
              <option value="Gasoline tank">Gasoline tank</option>
              <option value="Methane cylinder">Methane cylinder</option>
              <option value="Electric battery">Electric battery</option>
              <option value="defauld">defauld</option>
            </select>
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Limit Per Day</p></label
            >
            <input type="number" v-model="inputlimit" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Deposit</p></label
            >
            <input type="number" v-model="inputdeposit" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Premium Protection Price</p></label
            >
            <input type="number" v-model="inputpremium" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in AED</p></label
            >
            <input type="text" v-model="inputpriceead" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in AED (Otd)</p></label
            >
            <input type="text" v-model="inputpriceeadotd" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in USD</p></label
            >
            <input type="text" v-model="inputpriceusd" />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Price in USD(Otd)</p></label
            >
            <input type="text" v-model="inputpriceusdotd" />
          </div>
          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload car images</p></label>
              <img :src="
                    'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    data.images1
                  " alt="">
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture1($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload the main image</p></label>
              <img :src="
                    'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    data.images2
                  " alt="">
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture2($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Upload the cover image</p></label>
              <img :src="
                    'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/' +
                    data.cover
                  " alt="">
            <input
              class="inputimg"
              placeholder=""
              type="file"
              @input="imagePicture3($event.target.files[0])"
              accept="image/*"
              required
            />
          </div>

          <div class="forma__card">
            <label for="">
              <span>*</span>
              <p>Inclusive</p></label
            >
            <input class="chek" type="checkbox" v-model="inputinclusive" />
          </div>

          <br />

          <button class="cars__btn-add" type="editChangeProduct" @click="editChangeProduct()">editt</button>
          <div class="cars__btn-cancel" @click="editmodal(false)" >cancel</div>
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
@keyframes neon-2 {
    0%{
      color:rgb(0, 8, 41);
    }
    100%{
      color:#1677FF;
    }
  }
</style>