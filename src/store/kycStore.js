import { defineStore } from "pinia";

export const useCustomerDataStore = defineStore("customerData", {
    state: () => ({
            title: "",
            full_name: "",
            country_code:"",
            phone_number: "",
            contact_number:"",
            email: "",
            nic: "",
            nationality: "",
            selfie: "",
            nic_front: "",
            nic_rear: "",
            otp_input:""
    }),


    /*actions: {
            setImageData(base64ImageData) {
                    this.imageData = base64ImageData;
            }
    }*/
});
