import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import CreateVacancy from "./views/CreateVacancy.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "home",
      component: Home,
    },
    {
      path: "/createvacancy",
      name: "createvacancy",
      component: CreateVacancy
    }
  ]
});
