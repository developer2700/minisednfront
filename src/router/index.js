import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeGlobal")
        },
      ]
    },
    {
      name: "email",
      path: "/emails/:slug",
      component: () => import("@/views/Email"),
      props: true
    },
    {
      name: "email-edit",
      path: "/editor/:slug?",
      props: true,
      component: () => import("@/views/EmailEdit")
    }
  ]
});
