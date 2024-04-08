<template>
  <b-modal id="modal-p"
           :active.sync="isActive"
           :width="400"
           :can-cancel="false"
           class="custom-modal" >
    <div class="modal-card">

      <div class="header-box" >
        <p style="font-weight: bolder; color: white">LOGIN OR REGISTER</p>
<!--        <button class="close-button" @click="">×</button>-->
      </div>

      <div class="popup-content">
        <p style="color: black"  >Just need phone number to login or create account</p>
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(continueClicked)" >
        <div class="column is-desktop is-mobile ">
        <b-field label="Contact Number" >
          <ValidationProvider name="Country Code" rules="required" v-slot="{ errors }">
          <b-select v-model="countryCode">
            <option value='+94' >+94</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>

          </b-select>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider name="Phone Number" rules="required|phone_number_validation: countryCode" v-slot="{ errors }">
            <b-input  v-model="phoneNumber" type="number" placeholder="Enter mobile number"></b-input>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

        </b-field>
<!--        <section>-->
          <div class="buttons">
            <div class ="column  is-left"><b-button class="back-button" @click="">Back</b-button></div>
            <div class ="column is-right"><b-button type="submit" class="submit-button" @click="continueClicked">Continue</b-button></div>
          </div>
<!--        </section>-->
      </div>
        </form>
        </ValidationObserver>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {Customer} from "@/helpers/classes/customer";
import { useCustomerDataStore} from "@/store/kycStore";
import { ValidationProvider } from 'vee-validate';
import NetworkManager from "@/helpers/classes/apiRequest";
import {CountryCode} from "@/helpers/classes/countryCode";


export default {
  name: "ModalComponent",
  components:{
    ValidationProvider
  },

  setup() {

    const customerData = useCustomerDataStore();
    return {
      customerData,


    };
  },

  data(){
    return{
      isLoading: false,
      Customer : new Customer(),
      countryCode : '',
      phoneNumber: '',
      contactNumber: '',
      CountryCode:[
        new CountryCode(+94, '+94'),
        new CountryCode(+1, '+1'),
        new CountryCode(+33, '+33'),


      ],
      NetworkResponse:[],



    }
  },

  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    contactNumber:{
      type: String,

    },
    /*hideBackdrop: {
      type: Boolean,
      default: true,
    },*/




  },

  methods: {
    continueClicked(value) {
      this.contactNumber = this.countryCode + this.phoneNumber;
      this.$emit('updateContactNumber', this.contactNumber);
      this.isLoading = true;

      const requestBody = {
        phone_number: this.customerData.contact_number,
      };

      NetworkManager.apiRequest("otpAuth/RequestOTP", requestBody, response => {
        console.log("Phone number requested", response);
        if (response.status_code === 200) {
          this.$emit("continue", value);
          this.$buefy.notification.open("Otp sent");
        }
      }).catch(error => {
        console.error("Error requesting OTP:", error);
        this.$buefy.notification.open("Error requesting OTP");
        this.isActive = true;
      }).finally(() => {
        this.isLoading = false;
      });
      console.log('click to  navigate to the Otp modal')
    },
    /*closeModal() {
      // this.$emit("close");
      console.log('close phone modal')
      this.isActive=false
    },*/

    /*continueClicked(value) {
      this.contactNumber = this.countryCode + this.phoneNumber;
      this.$emit('updateContactNumber', this.contactNumber);

      // this.$emit("continue", value);
      this.isLoading=true;

      const requestBody = {
        phone_number: this.customerData.contact_number,
      };


      this.$axios
          .post("https://localhost:7036/api/otpAuth/RequestOTP",requestBody)
          .then(response => {
            console.log("Phone number requested",response.data);
            if (response.status === 200) {
              this.$emit("continue", value);
              this.$buefy.notification.open("Otp sent");

            }
          })
          .catch(error => {
            console.error("Error adding student:", error);
            this.$buefy.notification.open("Enter Phone number !");
            this.isActive=true
          })
          .finally(()=>{
            this.isLoading=false
          });
      console.log('click to  navigate to the Otp modal')
    },*/
  }
}
</script>

<style scoped>
.custom-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  background-color: white;
  border-radius: 5px;
  height: 400px;
  width: 400px;
  justify-content: space-between;
}

.header-box {
  background-color: #F54D4D;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  display: flex;
}

.close-button {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.popup-content {
  padding: 30px;
  height: 370px;
  text-align: center;

}

.popup-content h2 {
  margin-bottom: 10px;
}

.popup-content input {
  margin-bottom: 10px;
}

.popup-content button:hover {
  background-color: #F54D4D;
}

.buttons {
  margin-top: 20px;
  display: flex;
  align-content: flex-end;
  align-items: flex-end;
  justify-items: right;
  margin-bottom: 5px;
}

.submit-button {
  background-color: #f54d4d;
  color: white;
}
</style>
