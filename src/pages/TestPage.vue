<template>
<!--  <Suspense>
    <template #default >
      <TestComponent/>
    </template>

    <template #fallback>
      Loading...
    </template>
  </Suspense>-->

  <div>
    1
    <TestComponent k="5"></TestComponent>
  </div>
</template>

<script>

import TestComponent from "@/pages/TestComponent";
export default {
  name: "TestPage",
  components: {TestComponent},

}
</script>

<style scoped>

</style>