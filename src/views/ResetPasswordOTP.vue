<template>
    <LoaderComp v-if="loading" /> 
    <div v-else id="sectt" class="d-flex justify-content-center align-items-center w-100 p-5 h-100">
        <div class="container-fluid d-flex align-items-center justify-content-center container-password">
            
            <Transition :name="transitionName" mode="out-in">
                
                <form v-if="formStep === 'email'" @submit.prevent="SubmitRest()" key="email">
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

                <form v-else-if="formStep === 'otp'" @submit.prevent="Submitotp()" key="otp">
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

                <form v-else-if="formStep === 'confirm'" @submit.prevent="ConfirmResetPassword()" key="confirm">
                    <div class="content mb-3 w-75 text-sm-center">
                        <div>
                            <h2>Reset Password</h2>
                            <p>Create a new strong password for your account.</p>
                        </div>
                        <div class="form-floating mt-5">
                            <input type="password" class="form-control" id="passInput" v-model="password" placeholder="Password" required>
                            <label for="passInput">Password</label>
                        </div>
                         <div class="w-100 mt-3">
                            <button class="btn btn-primary w-75" type="submit">
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                </form>

            </Transition>

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
            // STATE MANAGEMENT
            formStep: 'email', // Options: 'email', 'otp', 'confirm'
            transitionName: 'slide-email', // Controls direction

            email: null,
            password: null,
            confirmPassword: null,
            
            otp_value: null,
            timerCounter: 60,
            timerEnable: false,
            isSubmitted: false,
            token: null,
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
            // TRANSITION: Email -> OTP (Left to Right)
            this.transitionName = 'slide-otp';
            this.formStep = 'otp';
            
            this.$http.post('reset_passowrd/', {email: this.email}).then((res) => {
                console.log('inside the reset', res)
            })
        },
        Submitotp() {
            this.isSubmitted = true
            this.$http.post('check_otp/', {otp: this.otp_value, email: this.email}).then((res) => {
                if (res.data?.status == true) {
                    // TRANSITION: OTP -> Confirm (Right to Left - Progressing forward)
                    this.transitionName = 'slide-email'; 
                    this.formStep = 'confirm';
                    this.token = res.data?.data?.token
                    console.log('the token is ', this.token, res.data)
                }
            }).catch((error) => {
                this.$toast.error(`${error.response?.data?.message}`)
                this.otp_value = null
                this.isSubmitted = false
                
                if (error.response?.data?.message == 'Too many attempt' || error.response?.data?.message == 'OTP expired') {
                    // TRANSITION: Error -> Back to Email (Right to Left)
                    this.transitionName = 'slide-email';
                    this.email = null
                    this.formStep = 'email';
                }
            })
        },
        ConfirmResetPassword(){
            this.$http.post('confirm_password/', {
                token: this.token,
                password: this.password
            }).then((res) => {
                console.log('Password reset successfully', res);
                this.$router.push('/login');
            }).catch(err => {
                console.error(err);
            });
        },
        resendPassword() {
            this.timerEnable = true
            this.$http.post('resend_password/', {email: this.email}).then((res) => {
                console.log('the resend is working', res)
            })
        },
    }
}
</script>

<style scoped>
#sectt {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: black;
    text-shadow: none;
    background-color: #214970;
    overflow-x: hidden;
}
.container-password {
   width: 30%;
}
:deep(.p-inputotp-input) {
    background-color: #e7e5f3;
    border: 2px solid #ced4da;
    color: #212529;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
}

/* --- TRANSITIONS --- */

.slide-email-enter-active,
.slide-email-leave-active,
.slide-otp-enter-active,
.slide-otp-leave-active {
  transition: all 0.5s ease;
}

/* 1. RIGHT TO LEFT (Used for Email & Confirm) */
.slide-email-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-email-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* 2. LEFT TO RIGHT (Used for OTP) */
.slide-otp-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-otp-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>