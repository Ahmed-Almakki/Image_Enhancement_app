<template>
  <LoaderComp v-if="loading" />
    <div v-else id="sect" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 p-5">
        <div class="container-fluid w-25 border border-2 p-5 text-center bg-body-secondary sect_card  rounded rounded-4">
          <div class="content mb-3">
            <div class="log_hdr text-center">
              <h2>Login</h2>
            </div>
            <div class="mt-5">
              <form @submit.prevent="Login()">
                <div class="form-floating mb-5">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="cred.email" required>
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-5">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="cred.password" required>
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
                <!-- SignIn-->
                <div class="d-grid col-12 mb-5">
                  <button class="btn btn-outline-primary btn-lg" type="submit">
                    <span v-if="!submit">Sign In</span>
                    <VueSpinnerIos v-else color="white" size="15" />
                  </button>
                </div>
              </form>
              <!-- Change this part -->
              <div class="mb-5 line col-12 position-relative text-center">
                <h4 class="d-inline-block m-0">OR</h4>
              </div>

              <!-- Improve Google button styling -->
              <div class="d-grid col-12 mb-5">
                <button class="btn btn-outline-dark btn-lg d-flex align-items-center justify-content-center gap-3 border-2" type="button" @click="Oauth()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                  </svg>
                  <span class="fw-medium">Sign in with Google</span>
                </button>
              </div>
              <div class="text-center fs-5">
                <sapn>D'not have an account? </sapn><router-link to="/register" class="text-decoration-none pointer-event" href="#">SignUp</router-link>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { VueSpinnerIos } from 'vue3-spinners';
export default {
  components: {VueSpinnerIos},
  data() {
    return {
      cred: {email: null, password: null},
      submit: false
    }
  },
  methods: {
    Login() {
      this.submit = true
      this.$http.post('v1/login', this.cred).then((res) => {
        console.log('res this ', res.data)
        this.$store.dispatch('login', res.data.data)
        this.$router.push('/')
      })
      .catch((error) => {
        this.$toast.error(`${error.response?.data?.message}`)
        this.submit = false
      })
    },
    Oauth() {
      this.$http.get('v2/state').then((res) => {
        console.log('ressd', res.data)
        window.location.href = res.data.data
      }).catch((error) => console.log('there is some error', error))
    },
    getToken() {
      this.$http.get('get_token/').then(() => {
        console.log('done done done')
      })
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  mounted() {
    this.getToken();
  }
}
</script>
<style>
#sect {
    font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #e8f4f8;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #0c1f32 0%, #1a3a5f 50%, #0c1f32 100%);
    position: relative;
    overflow: hidden;
}

/* Add subtle texture overlay */
#sect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
}

.log_hdr h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #e8f4f8 0%, #a8d0e6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
}

/* Enhanced glow effect for the container */
#sect > div {
    box-shadow: 
        0 0 35px rgba(76, 130, 225, 0.4),
        0 0 65px rgba(76, 130, 225, 0.2),
        0 0 100px rgba(76, 130, 225, 0.1),
        inset 0 0 20px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(255, 255, 255, 0.05) !important;
}

/* Improved text colors */
.content {
    color: #e8f4f8;
}

.form-floating label {
    color: #a8d0e6;
    font-weight: 500;
}

.form-control {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #e8f4f8;
}

.form-control:focus {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(76, 130, 225, 0.6);
    box-shadow: 0 0 15px rgba(76, 130, 225, 0.3);
    color: #e8f4f8;
}

.form-control::placeholder {
    color: #a8d0e6;
}

/* Improved OR divider */
.line::before,
.line::after {
    background: linear-gradient(90deg, transparent 0%, rgba(168, 208, 230, 0.6) 50%, transparent 100%);
}

.line h4 {
    color: #a8d0e6;
    font-weight: 600;
    font-size: 1.1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Enhanced buttons */
.btn-outline-primary {
    border-color: #4c82e1;
    color: #4c82e1;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-outline-primary:hover {
    background: #4c82e1;
    border-color: #4c82e1;
    box-shadow: 0 0 20px rgba(76, 130, 225, 0.4);
    transform: translateY(-2px);
}

.btn-outline-dark {
    border-color: rgba(255, 255, 255, 0.3);
    color: #e8f4f8;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}

.btn-outline-dark:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    color: #ffffff;
}

/* Links and text improvements */
.text-decoration-none {
    color: #4c82e1 !important;
    font-weight: 500;
    transition: all 0.3s ease;
}

.text-decoration-none:hover {
    color: #6ba1ff !important;
    text-shadow: 0 0 10px rgba(76, 130, 225, 0.5);
}

.form-check-label {
    color: #a8d0e6;
    font-weight: 500;
}

/* Google icon color */
.bi-google {
    color: #4285f4;
}
</style>