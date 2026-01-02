<template lang="">
    <div id="overlay-loader" class="h-100 d-flex justify-content-center align-items-center">
        <VueSpinner size="183" color="#4fc3f7"/>
    </div>
</template>
<script>
import { VueSpinner } from 'vue3-spinners';
export default {
    components: {VueSpinner},

}
</script>
<style>
    #overlay-loader {
        background-color: #101f30;
    }
</style>