import {Store} from "vuex";
import type {AxiosInstance} from "axios";

declare module 'vue-admin-bar' {
  import {PluginObject} from 'vue';

  export interface AdminBarInstallOptions {
    axios?: AxiosInstance;
    store?: Store;
    localStoreKey?: string;
  }

  declare const VueAdminBar: PluginObject<AdminBarInstallOptions>;

  export default VueAdminBar;
}
