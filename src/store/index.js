import Vue from "vue";
import Vuex from "vuex";

import home from "./home.module";
import auth from "./auth.module";
import email from "./email.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    auth,
    email,
  }
});
