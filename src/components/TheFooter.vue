<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        MiniSend
      </router-link>
      <span class="attribution">
        Transactional email app
        <a rel="noopener noreferrer" target="blank" href="https://www.linkedin.com/in/mohammad2700/"
          >linkedin</a
        >
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
