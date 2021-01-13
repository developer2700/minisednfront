import { EmailsService } from "@/common/api.service";
import { FETCH_EMAILS } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  UPDATE_EMAIL_IN_LIST
} from "./mutations.type";

const state = {
  emails: [],
  isLoading: true,
  emailsCount: 0
};

const getters = {
  emailsCount(state) {
    return state.emailsCount;
  },
  emails(state) {
    return state.emails;
  },
  isLoading(state) {
    return state.isLoading;
  },
};

const actions = {
  [FETCH_EMAILS]({ commit }, params) {
    commit(FETCH_START);
    return EmailsService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { emails, emailsCount }) {
    state.emails = emails;
    state.emailsCount = emailsCount;
    state.isLoading = false;
  },
  [UPDATE_EMAIL_IN_LIST](state, data) {
    state.emails = state.emails.map(email => {
      if (email.slug !== data.slug) {
        return email;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      email.attachments = data.attachments;
      return email;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
