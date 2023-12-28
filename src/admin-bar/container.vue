<template>
  <div v-if="visible">
    <!--floating button-->
    <button class="admin-bar-floating" v-show="!isOpen" @click="showHeader">
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22 8.976C22 7.72287 21.9342 6.64763 21.7345 5.74916C21.5323 4.83933 21.1798 4.05065 20.5646 3.43543C19.9494 2.82021 19.1607 2.46772 18.2508 2.26552C17.3524 2.06584 16.2771 2 15.024 2L8.976 2C7.72287 2 6.64763 2.06584 5.74916 2.26552C4.83933 2.46772 4.05065 2.82021 3.43543 3.43543C2.82021 4.05065 2.46772 4.83933 2.26552 5.74916C2.06584 6.64762 2 7.72287 2 8.976L2 9C2 10.1046 2.89543 11 4 11L20 11C21.1046 11 22 10.1046 22 9L22 8.976Z"
            fill="#323232"/>
        <path
            d="M22 15.024C22 16.2771 21.9342 17.3524 21.7345 18.2508C21.5323 19.1607 21.1798 19.9494 20.5646 20.5646C19.9494 21.1798 19.1607 21.5323 18.2508 21.7345C17.3524 21.9342 16.2771 22 15.024 22L15 22C13.8954 22 13 21.1046 13 20L13 15C13 13.8954 13.8954 13 15 13L20 13C21.1046 13 22 13.8954 22 15L22 15.024Z"
            fill="#323232"/>
        <path
            d="M2 15.024C2 16.2771 2.06584 17.3524 2.26552 18.2508C2.46772 19.1607 2.82021 19.9494 3.43543 20.5646C4.05065 21.1798 4.83933 21.5323 5.74915 21.7345C6.64762 21.9342 7.72287 22 8.976 22L9 22C10.1046 22 11 21.1046 11 20L11 15C11 13.8954 10.1046 13 9 13L4 13C2.89543 13 2 13.8954 2 15L2 15.024Z"
            fill="#323232"/>
      </svg>
    </button>

    <transition name="component-fade" mode="out-in">
      <div class="admin-bar" v-if="isOpen">
        <div class="admin-bar__wrap container">
          <div class="admin-bar__start">
            <slot></slot>
          </div>

          <div style="display: flex; justify-content: center; align-items: center;">
            <!--close button-->
            <button style="margin-left: 20px;" @click="hideHeader">
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#1C274C"
                        stroke-width="1.5"/>
                <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C"
                      stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "container",
  props: {
    visible: Boolean,
  },
  computed: {
    ...mapGetters({
      isOpen: 'adminBar/isOpen',
    }),
  },
  methods: {
    ...mapMutations({
      setAdminBarStatus: 'adminBar/setAdminBarStatus',
    }),
    showHeader() {
      this.setAdminBarStatus(true)
    },
    hideHeader() {
      this.setAdminBarStatus(false)
    },
  }
}
</script>

<style lang="scss" scoped>
$black: #4F4F4F;
$white: #fff;

$trans--regular: 0.3s;
$Arial: "Arial", sans-serif;

.admin-bar {
  background-color: #e7e7ff;

  &__wrap {
    display: flex;
    min-height: 45px;
    box-sizing: border-box;
    font-family: $Arial;
    align-items: center;
    justify-content: space-between;
  }

  &__start {
    display: flex;
    gap: 20px;
  }

  &-floating {
    position: fixed;
    z-index: 2000;
    right: 20px;
    bottom: 20px;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    border: 1px solid $black;
    background-color: $white;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 255, .2);
    transition: box-shadow $trans--regular ease-in-out, scale $trans--regular ease-in-out;

    &:hover {
      box-shadow: 4px 4px 1px 1px rgba(0, 0, 255, .1);
      scale: 1.1;
    }
  }
}
</style>
