<template>
  <div class="image-application">
    <div class="header">
      <p style="font-weight: bold">KYC Form</p>
    </div>
    <div class="message">
      <p>Please enter your valid Name & email address to use all of our features.</p>
    </div>
    <div class="image-content">
      <form >
        <div class="columns is-centered is-multiline is-mobile">
<!--        <b-field grouped>-->
<!--          <b-field expanded>-->
            <div class ="column is-half">
            <UploadImageComponent
                :StoredImage=" customerData.nic_front"
                :upload-message="uploadMessage"
                :upload-message1="uploadMessage1"
                :image-label=" 'NIC/DL Front Image'"
                @cropped-image="handleFrontImageUrl">
            </UploadImageComponent>
            </div>
            <div class ="column is-half">
            <UploadImageComponent
                :StoredImage="customerData.nic_rear"
                :upload-message="uploadMessage"
                :upload-message1="uploadMessage1"
                :image-label=" 'NIC/DL Rear Image'"
                @cropped-image="handleRearImageUrl">
            </UploadImageComponent>
            </div>
<!--          </b-field>-->
<!--        </b-field>-->
<!--        <b-field>-->
          <div class ="column is-half">
          <UploadImageComponent
              :StoredImage="customerData.selfie"
              :image-label=" 'Selfie'"
              @cropped-image="handleSelfieImageUrl"
          >
          </UploadImageComponent>
          </div>
<!--        </b-field>-->
        </div>
      </form>
    </div>
      <div class="buttons">
        <b-button @click="goToApplicationView"  class="back-button">Back</b-button>
        <b-button @click="goToPreview"  class="next-button">Next</b-button>
      </div>
</div>
</template>

<script>
import UploadImageComponent from "@/components/UploadImageComponent.vue";
import {useCustomerDataStore} from "@/store/kycStore";
import PreviewView from "@/views/PreviewView.vue";
export default {
  setup() {
    const customerData = useCustomerDataStore();

    return {
      customerData,
    };
  },

  name: "UploadImageApplicationView",
  components: {
    UploadImageComponent
  },

  data(){
    return{
      uploadMessage: 'Drop your image here',
      uploadMessage1: 'or',
      imageData: this.StoredImage
    }
  },



  methods:{
    goToApplicationView() {
      this.$router.push("/");
    },

    goToPreview() {
      this.$router.push("/preview");
    },

    handleFrontImageUrl(e){
      console.log("front image -------------->", e)
      this.customerData.nic_front = e
    },
    handleRearImageUrl(e){
      console.log("rear image -------------->", e)
      this.customerData.nic_rear = e
    },
    handleSelfieImageUrl(e){
      console.log("selfie image -------------->", e)
      this.customerData.selfie = e
    },
  },
}

</script>

<style scoped>

.image-application {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  justify-content: space-between;
  margin: 10px;

}
form {
  margin-left: 20%;
  margin-right: 20%;
  //margin-bottom: 2%;
  margin-top: 2%;
}
.header {
  font-size: 30px;
  color: #f54d4d;
  font-weight: bold;
  margin-bottom: 5px;
}

.message {
  font-size: 15px;
  text-align: center;
  width: 400px;
  margin-bottom: 20px;
  background-color: transparent;
  font-weight: 400;
  line-height: 30px;

}

.buttons {
  display: flex;
  margin-left: 50%;
  margin-bottom: 5%;
}

.next-button {
  background-color: #f54d4d;
  color: white;
  //width: 30%;
}

.back-button {
  //width: 20%;
  border-color: black;
  margin-right: 4%;
}
.image-content{
  align-items: center;
}
</style>
