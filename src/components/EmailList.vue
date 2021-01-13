<template>
  <div>
    <div class="row align-items-center">
      <div class="col-sm-3 my-1">
        <input
          type="text"
          class="form-control"
          v-model="sender"
          placeholder="Sender"
        />
      </div>
      <div class="col-sm-3 my-1">
        <input
          type="text"
          class="form-control"
          v-model="recipient"
          placeholder="Recipient"
        />
      </div>
      <div class="col-sm-3 my-1">
        <input
          type="text"
          class="form-control"
          v-model="subject"
          placeholder="Subject"
        />
      </div>
      <div class="col-sm-3 my-1">
        <select class="form-control"
          v-model="status">
          <option disabled hidden>Status</option>
          <option>Posted</option>
          <option>Sent</option>
          <option>Failed</option>
        </select>

      </div>

    </div>
    <div v-if="isLoading" class="email-preview">Loading emails...</div>
    <div v-else>
      <div v-if="emails.length === 0" class="email-preview">
        No emails are here... yet.
      </div>
      <VPagination :pages="pages" :currentPage.sync="currentPage" />
      <RwvEmailPreview
        v-for="(email, index) in emails"
        :email="email"
        :key="email.subject + index"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvEmailPreview from "./VEmailPreview";
import VPagination from "./VPagination";
import { FETCH_EMAILS } from "../store/actions.type";

export default {
  name: "RwvEmailList",
  components: {
    RwvEmailPreview,
    VPagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      sender: '',
      recipient: '',
      status: '',
      subject: '',
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      if (this.subject) {
        filters.subject = this.subject;
      }
      if (this.status) {
        filters.status = this.status;
      }
      if (this.recipient) {
        filters.recipient = this.recipient;
      }
      if (this.sender) {
        filters.sender = this.sender;
      }
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.emailsCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.emailsCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["emailsCount", "isLoading", "emails"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchEmails();
    },
    type() {
      this.resetPagination();
      this.fetchEmails();
    },
    sender() {
      this.resetPagination();
      this.fetchEmails();
    },
    recipient() {
      this.resetPagination();
      this.fetchEmails();
    },
    status() {
      this.resetPagination();
      this.fetchEmails();
    },
    subject() {
      this.resetPagination();
      this.fetchEmails();
    }
  },
  mounted() {
    this.fetchEmails();
  },
  methods: {
    fetchEmails() {
      this.$store.dispatch(FETCH_EMAILS, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
