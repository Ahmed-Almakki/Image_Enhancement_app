<template>
    <LoaderComp v-if="loading"/>
    <div v-else id="sect" class="h-100 w-100 d-flex justify-content-center align-items-center fs-4">
        <div class="container-fluid w-75 border-2 rounded rounded-2 p-4 bg-body-secondary text-center">
            <p>Go to Your Email and Activate Your Acount</p>
            <p>Enjoy High Resolution Image</p>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        loading() {
            return this.$store.state.loading
        }
    }
}
</script>
<style>
    #sect {
        background: linear-gradient(135deg, #0c1f32 0%, #1a3a5f 50%, #0c1f32 100%);
        color: white
    }
</style>