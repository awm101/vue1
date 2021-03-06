import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./views/TutorialsList")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./views/Tutorial")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddTutorial")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;