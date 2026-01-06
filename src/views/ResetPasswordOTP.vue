<template lang="">
    <LoaderComp v-if="loading" /> 
    <div v-else id="sectt" class="d-flex justify-content-center align-items-center w-100 p-5 h-100">
        <div class="container-fluid d-flex align-items-center justify-content-center container-password">
            <form v-if="otp === null || otp === false" @submit.prevent="SubmitRest()">
                <div class="content mb-3 w-75 text-sm-center">
                    <div>
                        <h2>Forget Password</h2>
                        <p>No worries! Enter your email address below and we'll send you a link to reset your password</p>
                    </div>
                    <div class="form-floating mt-5">
                      <input type="email" class="form-control" id="floatingInput" v-model="email" placeholder="name@example.com" required>
                      <label for="floatingInput">Email address</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>
                </div>
            </form>

            <form v-else @submit.prevent="Submitotp()">
                <div class="content mb-3 w-75 text-sm-center">
                    <div>
                        <i class="bi bi-envelope-at" style="font-size: 4rem"></i>
                        <h2>Enter Verification number</h2>
                        <p>Make sure to write the correct number and also you Wrote the correct email Address</p>
                    </div>
                    <div class="form-floating my-5 d-flex justify-content-center align-items-center gap-3 text-center border-2">
                        <InputOtp size="large" v-model="otp_value"/>
                    </div>
                    <div class="w-100 mt-3">
                        <button class="btn btn-primary w-75" type="submit">
                            <span v-if="!isSubmitted">Submit</span>
                            <VueSpinner v-else size="15" color="white" />
                        </button>
                    </div>
                    <div class="mt-3">
                        <p>
                            Didn't recive the code? 
                            <span v-if="!timerEnable" style="cursor: pointer; color: #fff; font-weight: bold; text-decoration: underline" @click="resendPassword()">
                                Resend
                            </span>
                            <span v-else style="color: #000">
                                Resend Code in {{this.timerCounter}} s
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { VueSpinner } from 'vue3-spinners';
import InputOtp from 'primevue/inputotp';
export default {
    components: {InputOtp, VueSpinner},
    data() {
        return {
            email: null,
            otp: null,
            otpp: 6,
            inpts: [],
            timerCounter: 60,
            timerEnable: false,
            otp_value: null,
            isSubmitted: false,
        }
    },
    watch: {
        timerEnable(value) {
            if (value) {
                setTimeout(() =>{
                    this.timerCounter--;
                }, 1000)
            }
        },
        timerCounter: {
            handler(value) {
                if (value > 0 && this.timerEnable) {
                    setTimeout(() => {
                        this.timerCounter--;
                    }, 1000)
                } else {
                    this.timerEnable = false
                    this.timerCounter = 60
                }
            }
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading
        }
    },
    methods: {
        SubmitRest() {
            this.otp = true
            this.$http.post('reset_passowrd/', {email: this.email}).then((res) => {
                console.log('inside the reset', res)
            })
        },
        resendPassword() {
            console.log('this email', this.email)
            this.timerEnable = true
            this.$http.post('resend_password/', {email: this.email}).then((res) => {
                console.log('the resend is working', res)
            })
        },
        startTimer() {
            if (this.timerId) return;

            this.timerEnable = true;
            this.timerId = setInterval(() => {
                if (this.timerCounter > 0) {
                    this.timerCounter--;
                } else {
                    clearInterval(this.timerId);
                    this.timerId = null;
                    this.timerEnable = false;
                    this.timerCounter = 60;
                }
            }, 1000);
        }, 
        Submitotp() {
            console.log('the otp value is', this.otp_value, typeof this.otp_value)
            this.isSubmitted = true
            this.$http.post('check_otp/', {otp: this.otp_value}).then((res) => {
                console.log('the res is ', res)
            }).catch(() => {
                this.$toast.error('Make Sure you write the correct code')
                this.otp_value = null
                this.isSubmitted = false
            })
        }
    }
}
</script>
<style scoped>
    #sectt {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: black;
    text-shadow: none;
    background-color: #214970;
 }
 .container-password {
    width: 30%;
 }
    /* 1. Target the actual input box inside InputOtp */
    :deep(.p-inputotp-input) {
        background-color: #e7e5f3; /* White background */
        border: 2px solid #ced4da; /* Bootstrap gray border */
        color: #212529; /* Text color */
        width: 40px; /* Optional: Adjust width */
        height: 40px; /* Optional: Adjust height */
        font-size: 1.2rem;
    }

    /* 2. Style for when you click/focus the input */

 
</style>