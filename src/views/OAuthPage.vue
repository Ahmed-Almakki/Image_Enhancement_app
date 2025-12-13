<template>
    <div class="h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-grow text-primary " style="width: 10rem; height: 10rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {

    mounted() {
        this.$http.get('get_token').then(() => {
            this.$router.push('/')
        })
    }
    
}
</script>
<style>
    
</style>