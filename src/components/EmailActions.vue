<template>
  <!-- Used when user is also author -->
  <span>
    <router-link class="btn btn-sm btn-outline-warning" :to="editEmailLink">
      <i class="ion-edit"></i> <span>&nbsp;Edit Email</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <router-link class="btn btn-sm btn-outline-primary" :to="viewEmailLink">
      <i class="ion-view"></i> <span>&nbsp;View Email</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteEmail">
      <i class="ion-trash-a"></i> <span>&nbsp;Delete Email</span>
    </button>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import {
  EMAIL_DELETE,
} from "@/store/actions.type";

export default {
  name: "RwvEmailActions",
  props: {
    email: { type: Object, required: true },
  },
  computed: {
    editEmailLink() {
      return { name: "email-edit", params: { slug: this.email.id } };
    },
    viewEmailLink() {
      return { name: "email", params: { slug: this.email.id } };
    },
  },
  methods: {
    async deleteEmail() {
      try {
        await this.$store.dispatch(EMAIL_DELETE, this.email.id);
        // this.$router.push("/");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
