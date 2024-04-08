<template>
  <div id="app">
    <header-comp></header-comp>
    <nav>
<!--      <router-link to="/">Home</router-link> -->

    </nav>
    <router-view/>
    <footer-comp></footer-comp>
  </div>
</template>


<script>
import footerComponent from "@/components/FooterComponent.vue";
import headerComponent from "@/components/Header Component.vue";
import ApplicationComponent from "@/views/ApplicationView.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import ApplicationView from "@/views/ApplicationView.vue";
import UploadImageComponent from "@/components/UploadImageComponent.vue";
import UploadImageApplicationView from "@/views/UploadImageApplicationView.vue";
import PreviewView from "@/views/PreviewView.vue";
import CongratulationsModal from "@/components/CongratulationsModal.vue";
import GetOtpModal from "@/components/GetOtpModal.vue";
import './helpers/validation.js';
import countDownComponent from "@/components/countDownComponent.vue";

export default {
  data(){
    return{

    };
  },

  components:{
    ApplicationComponent,
    'footer-comp': footerComponent,
    'header-comp': headerComponent,
    'application-view': ApplicationView,
    'modal-comp': ModalComponent,
    'imageUploader-comp':UploadImageComponent,
    'imageUpload-view': UploadImageApplicationView,
    'preview-view': PreviewView,
    'congratulations-modal': CongratulationsModal,
    'getOtp-modal': GetOtpModal,
    'count-down': countDownComponent,



  },
  methods:{

  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   align-items: center;

/*  text-align: center;*/
 /* color: #2c3e50;*/
}


.material-symbols-outlined {
   font-variation-settings:
       'FILL' 0,
       'wght' 400,
       'GRAD' 0,
       'opsz' 24
 }

</style>
