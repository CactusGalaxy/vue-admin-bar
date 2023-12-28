import {mapGetters, mapMutations} from "vuex";

import Container from "./container.vue";

export default {
  name: "admin-bar",
  components: {
    Container,
  },
  computed: {
    ...mapGetters({
      adminBarData: 'adminBar/adminBarData',
      canBeRendered: 'adminBar/canBeRendered',
    }),
    links() {
      return this.adminBarData.links;
    },
    dashboardLink() {
      return this.adminBarData.adminDashboard;
    },
  },
  watch: {
    // reset links after route changed
    ['$route']() {
      this.resetLinks()
    }
  },
  methods: {
    ...mapMutations({
      resetLinks: 'adminBar/resetLinks',
    }),
  }
}
