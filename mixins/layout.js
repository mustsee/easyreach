import headerMenu from "@/components/header";
import footerPage from "@/components/footer";

import data from "@/assets/data/menu.js";

export default {
  components: {
    headerMenu,
    footerPage
  },
  data() {
    return {
      list: data.menu
    }
  }
}