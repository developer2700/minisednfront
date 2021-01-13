<template>
  <div class="email-page">
    <div class="banner">
      <div class="container">
        <h1>{{ email.subject }}</h1>
      </div>
    </div>
    <div class="container page">
      <div class="row email-content">
        <div class="col-xs-12">
          <div><strong>Sender: </strong> <span v-text="email.sender"></span></div>
          <div><strong>Recipient: </strong> <span v-text="email.recipient"></span></div>
          <div><strong>Date: </strong> <span v-text="email.created_at"></span></div>
          <div><strong>Status: </strong> <span v-text="email.status"></span></div>
          <ul class="tag-list">
            <li v-for="(attachment, index) of email.attachments" :key="attachment + index">
              <RwvTag
                :name="attachment.filename"
                className="tag-default tag-pill tag-outline"
              ></RwvTag>
            </li>
          </ul>
          <div v-text="email.text"></div>
          <div v-html="email.html"></div>

        </div>
      </div>
      <hr />

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvTag from "@/components/VTag";
import { FETCH_EMAIL } from "@/store/actions.type";

export default {
  name: "rwv-email",
  props: {
    slug: {
      required: true
    }
  },
  components: {
    RwvTag
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_EMAIL, to.params.slug),
    ]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
