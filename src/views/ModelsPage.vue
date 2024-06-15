<template>
  <div class="models">
    <a-table :columns="columns" :dataSource="data" bordered :pagination="{ pageSize: 7 }">
      <template #headerCell="{ column }">
        <template v-if="column.dataIndex === 'action'">
          <div class="header-action">
            <span>{{ column.title }}</span>
            <a-button type="primary" @click="addNewBrand = true">
              Add brand
            </a-button>
          </div>
        </template>
        <template v-else>
          <span>{{ column.title }}</span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <span>{{ record.name }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'brand'">
          <span>{{ record.brand_title }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="action-buttons">
            <a-button type="primary" @click="editBrand(record)">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="font-size: 20px;">
                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
              </svg>
            </a-button>
            <a-button type="primary" danger style="margin-left: 15px;" @click="deleteBrand(record)">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="font-size: 20px;">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <a-modal v-model:open="addNewBrand" title="Add new model" @ok="handleOk">
    <a-form layout="vertical" style="margin-top: 20px;">
      <a-form-item
      label="Model Name"
      :rules="[{ required: true}]"
    >
    <a-input v-model:value="modelName" placeholder="Model Name" />
    </a-form-item>
    <a-form-item
      label="Brand Name"
      :rules="[{ required: true}]"
    >
    <a-select
      ref="select"
      v-model:value="modelSelect"
      style="width: 100%"
    >
      <a-select-option v-for="brand in brands" :key="brand.id" :value="brand.id"> {{ brand.title }} </a-select-option>
    </a-select>
    </a-form-item>

    </a-form>
    </a-modal>
  <a-modal v-model:open="showEdit" title="Edit model" @ok="editModel">
    <a-form layout="vertical" style="margin-top: 20px;">
      <a-form-item
      label="Model Name"
      :rules="[{ required: true}]"
    >
    <a-input v-model:value="editName" placeholder="Model Name" />
    </a-form-item>
    <a-form-item
      label="Brand Name"
      :rules="[{ required: true}]"
    >
    <a-select
      ref="select"
      v-model:value="editSelect"
      style="width: 100%"
    >
      <a-select-option v-for="brand in brands" :key="brand.id" :value="brand.id"> {{ brand.title }} </a-select-option>
    </a-select>
    </a-form-item>

    </a-form>
    </a-modal>
  <a-modal v-model:open="showDelete" title="Delete model" @ok="deleteModel">
    <h3 style="font-size: 22px;">Are you sure you want to delete </h3>
</a-modal>
</template>

<script setup>
import axiosCustom from '@/axiosConf';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const addNewBrand = ref(false)
const showEdit = ref(false)
const data = ref([])

const modelName = ref("")
const modelSelect = ref("")
const brandTitle = ref("")

const editName = ref("")
const editSelect = ref("")
const editId = ref(null)
const showDelete = ref(false)
const deleteId = ref(null)

const brands = ref([])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    className: 'column-money',
    dataIndex: 'brand',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

function editBrand(record) {
  showEdit.value = true
  console.log(record);
  editName.value = record.name
  editSelect.value = record.brand_id
  editId.value = record.id
}
function deleteBrand(record) {
  brandTitle.value = record.name
  deleteId.value = record.id
  showDelete.value= true
}

async function getAllModels() {
  const response = await axiosCustom.get("models/")
  data.value = response.data.data
  data.value.reverse()
  const models = await axiosCustom.get("brands/") 
  brands.value = models.data.data
}

onMounted( async () => {
  getAllModels()
})

async function handleOk() {
  try {
    const response = await axiosCustom.post("models/", {
      name: modelName.value,
      brand_id: modelSelect.value
    })
    const newModel = response.data.data
    newModel.brand_title = brands.value.find(brand => brand.id === modelSelect.value).title
    data.value.unshift(newModel)
    toast.success("Added new model successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    addNewBrand.value = false
    modelName.value = ""
    modelSelect.value = ""
  }catch(error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
  }
} 
async function editModel() {
  try {
    const response = await axiosCustom.put(`models/${editId.value}/`, {
      name: editName.value,
      brand_id: editSelect.value,
    })
    toast.success("Model is edited successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    showEdit.value = false
    getAllModels()
  }catch(error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
  }
} 
async function deleteModel() {
  try {
    const response = await axiosCustom.delete(`models/${deleteId.value}/`)
    toast.success("Model is deleted successfully", {
      autoClose: 2000,
      theme: "colored"
    });
    showDelete.value = false
    getAllModels()
  }catch(error) {
    toast.error(`Error: ${error}`, {
      autoClose: 2000,
      theme: "colored"
    });
  }
} 



</script>

<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
th.column-money,
td.column-money {
  text-align: right !important;
}

.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style>
