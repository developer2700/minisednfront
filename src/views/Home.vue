<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">MiniSend</h1>
        <p>Transactional email app.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-12">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'home' }"
                  exact
                  class="nav-link"
                  active-class="active"
                >
                  Filters
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { FETCH_EMAILS} from "@/store/actions.type";

  export default {
    name: "home",
    mounted() {
      // this.$store.dispatch(FETCH_EMAILS);
    },
    computed: {
      ...mapGetters(["isAuthenticated"]),
    }
  };
</script>
