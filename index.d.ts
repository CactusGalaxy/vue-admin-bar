import {PluginFunction} from 'vue';
import {Store} from "vuex";
import type {AxiosInstance} from "axios";

// package configuration
export interface AdminBarInstallOptions {
  axios: AxiosInstance;
  store: Store<any>;
  localStoreKey?: string;
}

declare const VueAdminBar: PluginFunction<AdminBarInstallOptions>;

export default VueAdminBar;


// package data
export interface AdminLink {
  title: string;
  url: string;
}

export interface AdminBarData {
  adminDashboard: AdminLink;
  links: Array<AdminLink>;
}

export interface ResponseWithAdminData<T> {
  data: T;
  adminData: {
    adminDashboard: AdminLink;
    links?: Array<AdminLink>;
  };
}
