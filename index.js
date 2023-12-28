import AdminBar from "./admin-bar/index.vue";
import camelcaseObjectDeep from "camelcase-object-deep";

let storeKey = 'admin_bar_isOpen';

const setStateToLocalStore = (state) => {
  localStorage.setItem(storeKey, state ? '1' : '0')

  return state
}

const getStoredStatus = () => {
  return localStorage.hasOwnProperty(storeKey)
    ? !!localStorage.getItem(storeKey)
    : false
}

const adminBarModule = {
  namespaced: true,
  state: {
    adminBarData: null,
    isOpen: getStoredStatus(),
    canBeRendered: false,
  },
  getters: {
    adminBarData: (state) => state.adminBarData,
    isOpen: (state) => state.isOpen,
    canBeRendered: (state) => state.canBeRendered,
  },
  mutations: {
    pushAdminData(state, data) {
      let currentLinks = [];
      if (!data.resetLinks) {
        currentLinks = state.adminBarData?.links || [];
      }
      const newLinks = data.links || [];

      currentLinks.push(...newLinks)

      // unique links by url
      currentLinks = currentLinks.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.url === item.url
        )))

      state.adminBarData = {
        adminHome: data.adminHome,
        links: currentLinks
      };
    },
    setAdminBarStatus(state, status) {
      state.isOpen = setStateToLocalStore(status)
    },
    setCanBeRendered(state, status) {
      state.canBeRendered = !!status
    },
  }
}

let installed = false

function install(Vue, options) {
  if (!options.store) {
    console.error('[AdminBar] Please provide a vuex store!!');
    return;
  }
  if (!options.axios) {
    console.error('[AdminBar] Please provide a axios!!');
    return;
  }

  if (installed) return;

  installed = true

  Vue.component(AdminBar.name, AdminBar)

  options.store.registerModule('adminBar', adminBarModule);

  if (options.axios) {
    options.axios.interceptors.response.use((response) => {

      if (response.data) {
        const data = camelcaseObjectDeep(response.data)
        if (data.adminData) {
          options.store.commit('adminBar/pushAdminData', data.adminData)
        }
      }

      return response
    })
  }

  if (options.localStoreKey) {
    storeKey = options.localStoreKey
  }
}

export default install
