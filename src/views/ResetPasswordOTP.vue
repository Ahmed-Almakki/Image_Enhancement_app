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
                        <InputOtp size="large" v-model="value"/>
                    </div>
                    <div class="w-100 mt-3">
                        <button class="btn btn-primary w-75" type="submit">Submit</button>
                    </div>
                    <div class="mt-3">
                        <p>Didn't recive the code? <span style="cursor: pointer; color: #000">Resend</span></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import InputOtp from 'primevue/inputotp';
export default {
    components: {InputOtp},
    data() {
        return {
            email: null,
            otp: null,
            otpp: 6,
            inpts: [],
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading
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