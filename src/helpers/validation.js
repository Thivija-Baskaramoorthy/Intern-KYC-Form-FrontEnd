import {extend} from "vee-validate";

import {
    required,
    email,
    alpha_spaces,
    numeric
} from 'vee-validate/dist/rules';


extend('email', email);

extend('required', {
    ...required,
    message: 'This field is required'
});

extend('numeric', {
    ...numeric,
    message: '{_field_} should be numeric'
});


extend("alpha_spaces", {
    ...alpha_spaces,
    message: "The {_field_} may only contain alphabetic characters as well as spaces",
});

extend('nic_val', {
    validate: value =>  {
        const length = value.length;

        if (length !== 10 && length !== 12) {
            return false;
        }
        //  old NIC (10 char)
        if (value.length === 10) {
            const birthYear =  parseInt(value.substring(0,2))
            const birthDay =  parseInt(value.substring(2,5))
            const identity = value.substring(5,9)
            const lastChar = value.charAt(9).toUpperCase();

            if ((birthYear < 50 || birthYear > 99)) {
                return false;
            }
            if ((birthDay < 1 || birthDay > 366) && (birthDay < 501 || birthDay > 866)) {
                return false;
            }
            if (!/^\d+$/.test(identity)) {
                return false;
            }
            if (lastChar !== 'V') {
                return false;
            }
        }
        //  new NIC (12 char)
        if (value.length === 12) {

            const birthYear = parseInt(value.substring(0,4))
            const birthDay =  parseInt(value.substring(4,7))
            const identity = value.substring(7,12)

            if ((birthYear < 1950 || birthYear > 2012)) {
                return false;
            }
            if ((birthDay < 1 || birthDay > 366) && (birthDay < 501 || birthDay > 866)) {
                return false;
            }
            if (!/^\d+$/.test(identity)) {
                return false;
            }
        }
        return true;
    },

    message: '{_field_} must be a valid National Identity Card number.'

});

extend('phone_number_validation', {
    validate: (value, { countryCode }) => {
        const length = value.length;
        const firstDigit = value.charAt(0);
        const secondDigit = value.charAt(1);

        if (countryCode === '+94') {

            if (length !== 9){
                return false;
            }
            if (firstDigit !== '7'){
                return false;
            }
            if (!['1', '2', '4', '5', '6', '7', '8'].includes(secondDigit)){
                return false;
            }
        } else {
            // other country codes
            if (length < 7 || length > 15) {
                return false;
            }
        }
        return true;
    },

    params: ['countryCode'],

    message: '{_field_} must be a valid phone number.'
});

/*
extend('phone_number_validation', {
    validate: (value, { countryCode }) => {
        const length = value.length;
        const firstDigit = value.charAt(0);
        const secondDigit= value.charAt(1);

        if (countryCode === +94) {
            if (length !== 9){
                return false
            }
            if (firstDigit !== 7){
                return false
            }
            if (secondDigit === 3 || secondDigit === 9){
                return false
            }

        }
        else {
            //  length between 7 and 15 for other countries
            if (length < 7 || length > 15) {
                return false;
            }
        }
        return true
    },

    params: ['countryCode'],

    message: '{_field_} must be a valid National Identity Card number.'

});
*/

/*extend('phone_number_validation', {
    validate: (value, { countryCode }) => {
        const length = value.length;

        if (countryCode === '+94') {
            // For Sri Lanka (+94) country code, validate length and first digit
            return /^[7][0-9]{8}$/.test(value);
        } else {
            // For other countries, validate length between 7 and 15
            return /^[0-9]{7,15}$/.test(value);
        }
    },

    params: ['countryCode'],

    message: (fieldName, { countryCode }) => {
        if (countryCode === '+94') {
            return '{_field_} must be a valid phone number starting with 7 and with 9 digits for Sri Lanka (+94) country code.';
        } else {
            return '{_field_} must be a valid phone number with 7 to 15 digits.';
        }
    }
});*/

