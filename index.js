import AdminBar from "./admin-bar/index.vue";
import camelcaseObjectDeep from "camelcase-object-deep";
import _ from "lodash";

let storeKey = 'admin_bar_isOpen';

const setStateToLocalStore = (state) => {
  localStorage.setItem(storeKey, state ? '1' : '0');

  return state;
};

const getStoredStatus = () => {
  return localStorage.hasOwnProperty(storeKey)
    ? !!localStorage.getItem(storeKey)
    : false;
};

const adminBarModule = {
  namespaced: true,
  state: {
    adminBarData: {},
    isOpen: getStoredStatus(),
    canBeRendered: false,
  },
  getters: {
    adminBarData: (state) => state.adminBarData,
    isOpen: (state) => state.isOpen,
    canBeRendered: (state) => state.canBeRendered,
  },
  mutations: {
    resetLinks(state) {
      state.adminBarData = {
        adminDashboard: state.adminBarData.adminDashboard,
        links: []
      };
    },
    pushAdminData(state, data) {
      let currentLinks = state.adminBarData?.links || [];

      const newLinks = data.links || [];

      currentLinks = _(currentLinks)
        .push(...newLinks)
        .filter()
        .uniqBy('url')
        .value()

      state.adminBarData = {
        adminDashboard: data.adminDashboard || state.adminBarData.adminDashboard,
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
};

let installed = false;

const setAdminData = (response, options) => {
  if (!response.data) {
    return;
  }

  const data = camelcaseObjectDeep(response.data)

  if (!data.adminData) {
    return;
  }

  options.store.commit('adminBar/pushAdminData', {
    adminDashboard: data.adminData.adminDashboard,
    links: data.adminData.links,
  })
};

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

  options.axios.interceptors.response.use((response) => {
    setAdminData(response, options);

    return response
  })

  if (options.localStoreKey) {
    storeKey = options.localStoreKey
  }
}

export default install
