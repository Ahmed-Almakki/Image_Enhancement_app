<template lang="">
    <div>
        
    </div>
</template>
<script>
export default {
    mounted() {
        (() => {
            const {uid, token} = this.$route.query
            console.log(`uid is ${uid}\tand token ${token}`)
            this.$http.post('v1/activate-account', {uid, token}).then((res) => {
                this.$store.dispatch('login', res.data.data)
                this.$router.push('/')
            }).catch((error) => console.log('in the activate page eror', error))
        })()
    }
}
</script>
<style lang="">
    
</style>