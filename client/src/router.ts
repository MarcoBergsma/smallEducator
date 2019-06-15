import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import CreateCourse from "./views/CreateCourse.vue";

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
      path: "/createcourse",
      name: "createcourse",
      component: CreateCourse
    }
  ]
});
