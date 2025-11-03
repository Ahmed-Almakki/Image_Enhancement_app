<template>
  <div class="back">
    <div class="first d-flex justify-content-between align-items-center">
      <div class="logo ps-3 ">
        <h1>Enhanca-viosa</h1>
      </div>
      <div class="d-flex gap-3 pe-3">
        <div :class="{'parent-active': $route.path === '/'}">
          <router-link to="/" class="navb_child"><span>Home</span></router-link>
        </div>
        <div :class="{'parent-active': $route.path === '/about'}">
          <router-link to="/about" class="navb_child"><span>About</span></router-link>
        </div>
      </div>
    </div>
    <div class="second d-flex flex-column align-items-center">
      <div>
        <p>
          Transform your ordinary images into stunning, high-resolution masterpieces with a single click.
        </p>
      </div>
      <div>
        <button button type="button" class="btn btn-outline-warning btn-lg">Upload Image</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
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
    width: 80%;
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
    font-size: clamp(2rem, 3vw, 1.5rem);
    line-height: 1.6;
    text-align: center;
    padding: 1rem
  }

</style>