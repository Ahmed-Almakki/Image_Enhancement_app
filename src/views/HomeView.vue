<template>
  <div class="back">
    <div class="first d-flex justify-content-between align-items-center">
      <div class="logo ps-3 ">
        <h1>Enhanca-viosa</h1>
      </div>
        <div :class="{'parent-active': $route.path === '/login'}" class="boarder border-5 ms-5 log">
          <router-link v-if="!currentUser" to="/login" class="navb_child"><span>Login</span></router-link>
          <div v-else class="d-flex justify-content-between gap-5 align-self-lg-start">
            <span class="fs-4">Welcome {{ currentUser.first_name }}</span>
            <i @click="Logout()" class="bi bi-box-arrow-right fs-3" style="cursor: pointer;"></i>
          </div>
        </div>
    </div>
    <div class="second d-flex flex-column align-items-center">
      <div>
        <p>
          Transform your ordinary images into stunning, high-resolution masterpieces with a single click.
        </p>
      </div>
      <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="d-none"
      @change="handleFile"
    />
      <div>
        <button @click="openFilePicker" type="button" class="btn btn-outline-warning btn-lg">Upload Image</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return {
      file: null,
      fileName: ""
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    openFilePicker() {
      if(this.$store.state.currentUser) {
        this.$refs.fileInput.click()
      } else {
        this.$router.push('/login')
      }
    },

    handleFile(event) {
      const file = event.target.files[0]
      if (!file) return

      this.file = file
      this.fileName = file.name

      this.$Upload('v1/upload', {title: this.fileName, file: this.file}).then((res) => {
        console.log('response fromt dan', res)
      })
    },
    Logout(){
      this.$http.post('logout/').then((res) => {
        this.$store.dispatch('logout')
        console.log('successfully loged out', res.data)
        this.$router.push('/')
      })
    }
  }
}
</script>
<style scoped>
  .back {
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url('@/assets/image.png');
    position: relative;
    background-size: cover;
    background-position: center 20%;
    overflow: hidden;
  }

  .back::before {
    content: "";
    position: absolute;
    background: inherit;
    inset: 0;
    filter: brightness(2.3);
    z-index: 0;
  }
  .first {
    width: 90%;
    margin:auto;
    height: 20%;
    position: sticky;
    margin-top: 10px;
  }

  .navb_child {
    color: #FFD700;
    font-size: medium;
    text-decoration: none;
  }

  .parent-active {
    border-bottom: 1px solid yellow;
    height: 100%;
  }

  span {
    font-size: x-large;
  }
  h1 {
    font-size: 100px;
  }

  .second {
    position: absolute;
    width: 50%;
    height: 40vh;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .second p {
    font-size: clamp(3rem, 3vw, 1.5rem);
    line-height: 1.6;
    text-align: center;
    padding: 1rem
  }

  .log {
    border-color: #FFD700;
  }

</style>