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
  },
  watch: {
    adminBarData() {
      this.adminHomeLink = this.adminBarData.adminHome
      this.links = this.adminBarData.links
    },
    ['$route']() {
      this.pushAdminData({
        adminHome: this.adminHomeLink,
        resetLinks: true,
      })
    }
  },
  data() {
    return {
      adminHomeLink: null,
      links: [],
    }
  },
  methods: {
    ...mapMutations({
      pushAdminData: 'adminBar/pushAdminData',
    }),
  }
}
