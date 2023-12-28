# Admin bar

Admin bar is a plugin for Vue.js that adds a simple admin bar to your application.

## Features

Quickly navigate to the admin panel, edit the current page and more.

- Show admin bar for users with admin rights
- Show links to the admin panel and other links from the backend
- Show links to edit current page/article/post/resource

## Requirements

- Vue.js 2
- Vuex 3

## Installation

### NPM

```bash
npm install @cactus-galaxy/vue-admin-bar --save
```

## Usage

### Connect store

**IF** your App already has a Vuex store, you need to pass it to the plugin

```js
import Vue from 'vue';
import VueAdminBar from '@cactus-galaxy/vue-admin-bar';
import store from './path-to-your-store/store';   // your Vuex store

Vue.use(VueAdminBar, {
  store,
});
```

**ELSE** you need to create a new Vuex instance for the package

```js
import Vue from 'vue';
import Vuex from 'vuex';
import VueAdminBar from '@cactus-galaxy/vue-admin-bar';

Vue.use(Vuex);

// create Vuex store, if you don't have it
const store = new Vuex.Store();

Vue.use(VueAdminBar, {
  store,
});
```

`The application store module will be registered under the namespace 'adminBar'`

### Connect http-client (Axios)

> Currently only Axios is supported

We recommend creating one [axios instance](https://axios-http.com/docs/instance) and using it across the whole application and in stores.
From requests, we grab admin data via [interceptors](https://axios-http.com/docs/interceptors) and pass it to the admin bar store.

You may use the next setup for the Axios instance. Create file `src/utils/http.js`, configure axios instance and then export it.

```js
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import camelcaseObjectDeep from "camelcase-object-deep";

export const $http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'Accept': 'application/json',
  }
});

const getUserAuthToken = function () {
  return localStorage.getItem('user_token');
}

// configure request interceptor
$http.interceptors.request.use(() => {
  // add token to request headers
  const token = getUserAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// configure response interceptor
$http.interceptors.response.use(
  (response) => {
    response.data = camelcaseObjectDeep(response.data);

    return response;
  },
  (error) => {

    // handle errors

    return Promise.reject(camelcaseObjectDeep(error.response));
  }
);
```

And then use this instance in `main.js` and in stores for making requests

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueAdminBar from "vue-admin-bar";
import {$http} from "@/utils/https";

Vue.use(VueAdminBar, {
  axios: $http,
  store
})
```

For requests, where we need, from backend api append next structure. If you make multiple requests, all **links** will be stacked.

```json
{
  "data": [],
  "adminData": {
    "adminDashboard": {
      "url": "https://admin.example.com/admin",
      "title": "Dashboard"
    },
    "links": [
      {
        "url": "https://admin.example.com/admin/products/1/edit",
        "title": "Edit this product"
      }
    ]
  }
}
```

Links will be reset after each route change.

### Add to template

Now vue component is registered and you can use it in your app

```html

<template>
  <div>
    <!--...-->
    <admin-bar/>
    <!--...-->
  </div>
</template>
```

Next, we need to detect which user have access to admin bar. For example, we have an action in `profile` store which fetches user info:

```typescript
// profile/actions.ts
import $http from "@/utils/http";

export default {
  // other actions
  // ...
  fetchUserData: async ({commit}: ActionContext<State, RootState>) => {
    const response = await $http.get<{ data: User }>('v1/auth/me');

    const loggedInUser = response.data.data;

    commit('setUserData', loggedInUser);

    return response;
  }
  // ...
}
```

We need to call `adminBar/setCanBeRendered` and pass the state of the user access rights. For simplicity, we check `canSeeAdminHeader`

```diff
    const loggedInUser = response.data.data;
+    commit('adminBar/setCanBeRendered', loggedInUser.canSeeAdminHeader, {root: true})

    commit('setUserData', loggedInUser);
```
