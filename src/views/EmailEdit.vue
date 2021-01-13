<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors" />
          <form @submit.prevent="onPublish(email.id)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="email.subject"
                  placeholder="Email Subject"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="email.sender"
                  placeholder="What's sender email?"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="email.recipient"
                  placeholder="What's Recipient email?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="email.text"
                  placeholder="Write your email text "
                >
                </textarea>
              </fieldset>

              <fieldset class="form-group">
                <wysiwyg v-model="email.html" placeholder="Write your email html " />
              </fieldset>

              <fieldset class="form-group">
                <vue-dropzone ref="myVueDropzone" id="dropzone"
                              v-on:vdropzone-success="sendingEvent"
                              v-on:vdropzone-removed-file="dropzoneRemovedFile"
                              :options="dropzoneOptions"></vue-dropzone>
              </fieldset>



            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Email
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import WysIwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapGetters } from "vuex";
import store from "@/store";
import RwvListErrors from "@/components/ListErrors";
import { API_URL, MAX_FILE_UPLOAD_SIZE } from "@/common/config";

import {
  EMAIL_PUBLISH,
  EMAIL_EDIT,
  FETCH_EMAIL,
  EMAIL_RESET_STATE
} from "@/store/actions.type";

export default {
  name: "RwvEmailEdit",
  components: {
    RwvListErrors ,
    wysiwyg: WysIwyg.component,
    vueDropzone: vue2Dropzone
  },
  props: {
    previousEmail: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Reset state if user goes from /editor/:id to /editor
    // The component is not recreated so we use to hook to reset the state.
    await store.dispatch(EMAIL_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the email
    await store.dispatch(EMAIL_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_EMAIL,
        to.params.slug,
        to.params.previousEmail
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(EMAIL_RESET_STATE);
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {},
      dropzoneOptions: {
        url: API_URL+'/upload-file',
        thumbnailWidth: 150,
        maxFilesize: MAX_FILE_UPLOAD_SIZE,
        addRemoveLinks:true,
        acceptedFiles:'image/*,application/pdf,.psd,application/*,text/*,.csv',
        headers: { "My-Awesome-Header": "header value" }
      }
    };
  },
  mounted() {
    // load uploaded attachments and display then on dropzone
    this.email.attachments.forEach((attachment) => {
      let file_url = API_URL+'/uploads/'+attachment.filename;
      let mockFile = {id: attachment.id, name: attachment.filename, size: 526};
      this.$refs.myVueDropzone.manuallyAddFile(mockFile, file_url);
    });
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    onPublish(slug) {
      let action = slug ? EMAIL_EDIT : EMAIL_PUBLISH;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "email",
            params: { slug: data.email.id }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    sendingEvent (file, response) {
      this.email.attachments.push({ filename : response.filename});
    },
    dropzoneRemovedFile (file, error, xhr) {
      this.email.attachments = this.email.attachments.filter((attachment) => attachment.filename != file.name)
    },

  }
};
</script>
