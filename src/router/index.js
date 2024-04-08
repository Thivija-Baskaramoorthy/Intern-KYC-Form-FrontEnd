import Vue from 'vue'
import VueRouter from 'vue-router'
import ApplicationView from "@/views/ApplicationView.vue";
import UploadImageApplicationView from "@/views/UploadImageApplicationView.vue";
import PreviewView from "@/views/PreviewView.vue";

Vue.use(VueRouter)

const routes = [
   {
    path: '/',
    name: 'home',
    component: ApplicationView
   },

  {
    path: '/upload-images',
    name: 'upload-images',
    component: UploadImageApplicationView
  },


  {
        path: '/preview',
        name: 'preview-application',
        component: PreviewView
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
