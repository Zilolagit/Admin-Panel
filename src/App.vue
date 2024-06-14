<template>
  <div class="layout" v-if="route.path != '/login'">
    <div class="layout__left">
      <div :style="{ width: state.collapsed ? '80px' : '256px' }">
        <div class="logo">
          <template v-if="state.collapsed">
            <img src="/favicon.svg" alt="logo" class="logo-image" />
          </template>
          <template v-else>
            <h3>AvtozoomAdmin</h3>
          </template>
        </div>
        <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
          style="height: 100vh; font-weight: 500; font-size: 16px;"
          :inline-collapsed="state.collapsed"
          :items="items"
          @click="handleMenuClick"
        ></a-menu>
      </div>
    </div>
    <div class="layout__top" :style="{ width: state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)' }">
      <a-button
        type="primary"
        @click="toggleCollapsed"
      >
        <MenuUnfoldOutlined v-if="state.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="logOut">
              <LogoutOutlined />
              Logout
          </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        Admin
        <UserOutlined />
      </a-button>
    </a-dropdown>
    </div>
    <div class="layout__view" :style="{ width: state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)' }">
      <RouterView />
    </div>
  </div>

  <div class="login" v-else>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { reactive, watch, h } from "vue";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShopOutlined,
  HomeFilled,
  SettingOutlined,
  CarOutlined,
  BankOutlined,
  AimOutlined,
  UserOutlined,
  LogoutOutlined,
  GoldOutlined,
} from "@ant-design/icons-vue";

const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});


const items = reactive([
  {
    key: "1",
    icon: () => h(HomeFilled),
    label: "Dashboard",
    title: "Dashboard",
    path: "/"
  },
  {
    key: "2",
    icon: () => h(SettingOutlined),
    label: "Settings",
    title: "Settings",
    path: "/settings"
  },
  {
    key: "3",
    icon: () => h( ShopOutlined),
    label: "Brands",
    title: "Brands",
    path: "/brands"
  },
  {
    key: "4",
    icon: () => h(GoldOutlined),
    label: "Models",
    title: "Models",
    path: "/models"
  },
  {
    key: "5",
    icon: () => h(AimOutlined),
    label: "Locations",
    title: "Locations",
    path: "/locations"
  },
  {
    key: "6",
    icon: () => h(BankOutlined),
    label: "Cities",
    title: "Cities",
    path: "/cities"

  },
  {
    key: "7",
    icon: () => h(CarOutlined),
    label: "Cars",
    title: "Cars",
    path: "/cars"
  },
]);

const route = useRoute();
const router = useRouter();

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};

const handleMenuClick = (item) => {
  const menuItem = items.find((i) => i.key === item.key);
  if (menuItem && menuItem.path) {
    router.push(menuItem.path);
  }
};

function logOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  toast.success("You are logged out successfully", {
    autoClose: 2000,
    theme: "colored"
  })
  setTimeout(() => {
      router.replace("/login");
  }, 500);

}

import { onBeforeMount } from 'vue';

// Add this within your setup script
onBeforeMount(() => {
  updateSelectedKeys();
});

router.afterEach(() => {
  updateSelectedKeys();
});

function updateSelectedKeys() {
  const currentPath = route.path;
  const menuItem = items.find(item => item.path === currentPath);
  if (menuItem) {
    state.selectedKeys = [menuItem.key];
  } else {
    state.selectedKeys = [];
  }
}

import { onMounted } from 'vue';

onMounted(() => {
  const storedKeys = localStorage.getItem('selectedKeys');
  if (storedKeys) {
    state.selectedKeys = JSON.parse(storedKeys);
  }
});

watch(
  () => state.selectedKeys,
  (newValue) => {
    localStorage.setItem('selectedKeys', JSON.stringify(newValue));
  }
);

</script>

<style scoped lang="scss">

* {
  font-family: "Roboto", sans-serif;
}

.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.layout {
  &__left {
      top: 0;
      position: fixed;
      left: 0;
      background-color: #091119;
      opacity: 1;
      height: 100vh;
      overflow: hidden;
      h3 {
        font-size: 25px;
      }
    }

  .logo {
    text-align: center;
    padding: 16px;
    color: white;

    .logo-image {
      max-width: 100%;
      height: auto;
    }
  }
  &__top {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    background-color: #fff;
    border: 1px solid #E2E2E2;
    padding: 10px 15px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
 }
 &__view {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 9;
  height:calc(100vh);
  background-color: #E3EFFE;
  padding: 25px;
  overflow-y:auto ;
 }
}
</style>
