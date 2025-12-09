<script>
export default {

    mounted() {
        this.$http.get('get_token').then(() => {
            console.log(localStorage)
        })
    }
    
}
</script>
<style lang="">
    
</style>