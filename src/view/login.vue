<template>
  <div class="h-screen w-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <auth></auth>
  </div>
</template>

<script>
import Auth from '@/components/auth.vue';

export default {
  components: {
    Auth,
  }
}
</script>

<style>

</style>