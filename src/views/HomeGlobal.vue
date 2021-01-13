<template>
  <div class="home-global">
    <RwvEmailList type="all" />
  </div>
</template>
<script>
import RwvEmailList from "@/components/EmailList";

export default {
  name: "rwv-home-global",
  components: {
    RwvEmailList
  }
};
</script>
