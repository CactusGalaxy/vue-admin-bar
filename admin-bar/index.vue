<template>
  <container :visible="canBeRendered">
    <a
        v-if="adminHomeLink"
        :href="adminHomeLink.url"
        class="admin-bar-link admin-bar-link__main"
        target="_blank"
    >
      {{ adminHomeLink.title }}
    </a>

    <a
        v-for="link in links" :key="link.url"
        class="admin-bar-link admin-bar-link__navigate"
        :href="link.url"
        target="_blank"
    >
      <svg fill="#000000" width="15px" height="15px"
           viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><title>pencil</title>
          <path d="M0 32l12-4 20-20-8-8-20 20zM4 28l2.016-5.984 4 4zM8 20l12-12 4 4-12 12z"></path>
        </g>
      </svg>
      <span class="name">
        {{ link.title }}
      </span>
    </a>
  </container>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script src="./index.js"></script>
