<template>
  <div class="preview-page">
    <div class = "header is-centered">
      <p style="font-weight: bold">KYC Form</p>
    </div>
    <div class="message is-mobile">
      <p style="justify-content: center">Please enter your valid Name & email address to using all of our feature </p>
    </div>

    <div class ="preview-content">
      <form>
        <div class="columns is-centered is-multiline is-mobile is-desktop ">
          <div class ="column is-3 ">
<!--          <b-field grouped>-->
            <b-field label="Title:" expanded>
              <b-select v-model="customerData.title" placeholder="Mr">
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="miss">Miss</option>
              </b-select>
            </b-field>
          </div>
          <div class ="column is-9 ">
            <b-field label="Full Name:" expanded>
              <b-input v-model="customerData.full_name" placeholder="Cr Kumarasingha" type="text" required/>
            </b-field>
          </div>
<!--          </b-field>-->
<!--          <b-field grouped>-->
          <div class ="column is-half">
            <b-field label="Mobile Number:" expanded>
              <b-input v-model="customerData.contact_number" placeholder="Autofill" type="text" required/>
            </b-field>
          </div>
          <div class ="column is-half">
            <b-field label="Email:" expanded>
              <b-input v-model="customerData.email" type="text" placeholder="crkumarasinha47@gmail.com" required/>
            </b-field>
          </div>
<!--          </b-field>-->
<!--          <b-field grouped>-->
          <div class ="column is-half">
            <b-field label="NIC Number:" expanded>
              <b-input v-model="customerData.nic" type="text" required/>
            </b-field>
          </div>

          <div class ="column is-half">
            <b-field label="Nationality:" expanded>
              <b-select v-model="customerData.nationality">
                <option value="sl">Sri Lankan</option>
                <option value="other">Other</option>
              </b-select>
            </b-field>
          </div>
<!--          </b-field>-->
<!--          <b-field grouped>-->
          <div class ="column is-half">
            <b-field label="NIC/DL Front Image">
            <div id="image-container">
              <div class="column is-centered">
                <br>
                <img
                     :src=" 'data:image/png;base64,'+ customerData.nic_front"
                     alt="Uploaded Front Image"
                     id="preview-image">
              </div>
            </div>
            </b-field>
          </div>

          <div class ="column is-half">
            <b-field label="NIC/DL Rear Image">
            <div id="image-container">
              <div class="column is-centered">
                <br>
                <img
                    :src="'data:image/png;base64,'+ customerData.nic_rear"
                    alt="Uploaded Image"
                    id="preview-image">
              </div>
            </div>
            </b-field>

            </div>

          <div class ="column is-half">
            <div class ="column is-half">
              <b-field label="Selfie Image">
                <div id="image-container">
                  <div class="column is-centered">
                    <br>
                    <img
                        :src="'data:image/png;base64,'+ customerData.selfie"
                        alt="Uploaded Image"
                        id="preview-image">
                  </div>
                </div>
              </b-field>

          </div>
<!--          </b-field>-->

          <div class="buttons">
            <b-button @click="goToImageUpload" class="back-button">Back</b-button>
            <b-button @click="submitDetails" type="submit" :disabled="isLoading" class="submit-button">Submit</b-button>
            <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true">
              <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
            </b-loading>
          </div>

        </div>
        </div>
      </form>

    </div>
    <CongratulationsModal :is-active="submissionSuccessModalActive"  :active="submissionSuccessModalActive" @close="submissionSuccessModalActive = false" >

    </CongratulationsModal>
  </div>
</template>

<script>
import UploadImageComponent from "@/components/UploadImageComponent.vue";
import {Customer} from "@/helpers/classes/customer";
import {useCustomerDataStore} from "@/store/kycStore";
import CongratulationsModal from "@/components/CongratulationsModal.vue";
import NetworkManager from "@/helpers/classes/apiRequest";


export default {
  setup(){
    const customerData = useCustomerDataStore();
    return {
      customerData
    };
  },

  name: "PreviewView",
  components: {
    CongratulationsModal,
    UploadImageComponent
  },

  data(){
    return{
      Customer: new Customer(),
      isLoading: false,
      isFullPage: true,
      submissionSuccessModalActive: false,


    }
  },

  props:{
    imageLabel: {
      type: String
    },
    onSaveSuccess:{
      type: Function,
    },
    StoredImage: {
      type: String,

    }

  },

  methods:{
    submitDetails() {
      this.isLoading = true;

      const requestBody = {
        title:this.customerData.title,
        fullname:this.customerData.full_name,
        phone_number: this.customerData.contact_number,
        email: this.customerData.email,
        nic:this.customerData.nic,
        nationality:this.customerData.nationality,
        selfie:this.customerData.selfie,
        nic_rear:this.customerData.nic_rear,
        nic_front:this.customerData.nic_front
      };

      NetworkManager.apiRequest('SubmitCustomerData/SubmitData', requestBody, response=>{
        console.log('submit', response.data);
        this.submissionSuccessModalActive = true;
      })
          /*.then(response => {
            console.log('submit', response.data);
            this.submissionSuccessModalActive = true;
          })*/
          .catch(error => {
            console.error('Error Submission:', error);
            this.submissionSuccessModalActive = false;
          })
          .finally(() => {
            this.isLoading = false;
          });
    },

      /*this.$axios
          .post("https://localhost:7036/api/SubmitCustomerData/SubmitData", requestBody)
          .then(response => {
            console.log("Customer Data Added", response.data);
            this.$buefy.notification.open("Details Saved!!");
            this.submissionSuccessModalActive = true;

          })
          .catch(error => {
            console.error("Error adding student:", error);
            this.$buefy.notification.open("Saving Error!");
            // this.submissionSuccessModalActive = true;
          })
          .finally(() => {
            this.isLoading = false
          });
    },*/

    goToImageUpload() {
      this.$router.push("/upload-images");
    },

  },
  mounted() {
    console.log("Preview", this.customerData.nic_rear)
  }

}
</script>



<style scoped>
.preview-page{/*

  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  //height: 500px;
  position: relative;
  padding: 20px;
  justify-content: space-between;
  justify-items: center;*/
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  justify-content: space-between;
  margin: 50px;
}

.header{
  font-size: 30px;
  font-style: normal;
  align-content: center;
  align-items: center;
  color: #F54D4D;
  font-weight: bold;
  margin-bottom: 5px;
}

.message{
  font-size: 15px;
  text-align: center;
  width: 400px;
  margin-bottom: 20px;
  background-color: transparent;
}

.buttons{
  margin-top: 20px;
  //display: flex;
  align-content: flex-end;
  align-items: flex-end;
  margin-bottom: 5px;
}

.submit-button {
  background-color: #f54d4d;
  color: white;
}
.preview-content{
  align-items: center;
  justify-content: space-between ;
}
#image-container {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  width: 100%;
  height:50%;
  background-color: #e5e1e1;

}

</style>
