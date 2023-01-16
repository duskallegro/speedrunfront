<template>
  <div>
    {{JSON.stringify(this.stuff)}}
  </div>
</template>

<script>
export default {
name: "MoreTestComponent",

props: {
  stuff: {
    type: Object,
    default: function ()  {
      return {}
    }
  }
}
}
</script>

<style scoped>

</style>