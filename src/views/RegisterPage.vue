<template>
    <div id="sect" class="d-flex flex-column justify-content-center align-items-center w-100 p-5">
        <div class="container-fluid w-25 border-2 p-4 text-center bg-danger rounded rounded-4">
          <div class="content mb-3">
            <div class="log_hdr text-center">
              <h2>Registeration</h2>
            </div>
            <div class="mt-5">
              <form @submit.prevent="Register()">

                <div class="form-floating mb-5">
                  <input type="text" class="form-control" id="floatingInputname" v-model="form.first_name" placeholder="First Name">
                  <label for="floatingInputname">First Name</label>
                </div>
                
                <div class="form-floating mb-5">
                  <input type="text" class="form-control" id="floatingInputlast" v-model="form.last_name" placeholder="username">
                  <label for="floatingInputlast">Last Name</label>
                </div>
                <div class="form-floating mb-5">
                  <input type="text" class="form-control" id="floatingInputuser" v-model="form.username" placeholder="username">
                  <label for="floatingInputuser">User Name</label>
                </div>
                <div class="form-floating mb-5">
                  <input type="email" class="form-control" id="floatingInput" v-model="form.email" placeholder="name@example.com">
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-5">
                  <input type="password" class="form-control" id="floatingPassword" v-model="form.password" placeholder="Password">
                  <label for="floatingPassword">Password</label>
                </div>
                <!-- forget and remeber section -->
                <div class="d-flex justify-content-between mb-5">
                  <div class="form-check fs-5 pe-auto">
                    <input class="form-check-input" type="checkbox" value="" id="checkDefault">
                    <label class="form-check-label" for="checkDefault">
                      Remeber Me
                    </label>
                  </div>
                  <a href="#" class="text-decoration-none fs-5">Forget password?</a>
                </div>
                <!-- SignUp-->
                <div class="d-grid col-12 mb-5">
                  <button class="btn btn-outline-primary btn-lg" type="submit">Sign Up</button>
                </div>
              </form>

              <!--OR singup with google part-->
              <div class="mb-5 line col-12 col-sm position-relative">
                <h4 class="d-inline">OR</h4>
              </div>
              <div class="d-grid col-12 mb-5">
                <button class="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center gap-3 border-2" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                  </svg>
                  <span>
                    Sign in with Google
                  </span>
                </button>
              </div>
              <div class="text-center fs-5">
                <sapn>D'not have an account? </sapn><router-link to="/login" class="text-decoration-none">Login</router-link>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form :{first_name: '', last_name: '', password: null,
        email: null, is_active: false, username: ''
      }
    }
  },
  methods: {
    Register() {
      this.$http.post('v1/register', this.form).then((res) => {
        console.log('register response', res.data)
        this.$router.push('/activate')
      }).catch((error) => console.log('the error is because of the ', error))
    }
  },
    
}
</script>
<style>
 #sect {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: black;
    text-shadow: none;
    background-color: #0c1f32;
 }
 .log_hdr h2 {
  font-size: 2rem;
  font-weight: 700;
 }

 .line::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -1%;
  width: 40%;
  height: 1px;
  background-color: rgb(44, 40, 40);
 }
 .line::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -1%;
  width: 40%;
  height: 1px;
  background-color: rgb(44, 40, 40);
 }

 #sect > div {
  box-shadow: 0 0 25px gray;
 }

</style>