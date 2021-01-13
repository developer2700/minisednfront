import Vue from "vue";
import {
  EmailsService,
  ArticlesService,
  CommentsService,
  FavoriteService
} from "@/common/api.service";
import {
  FETCH_EMAIL,
  EMAIL_PUBLISH,
  EMAIL_EDIT,
  EMAIL_DELETE,
  EMAIL_RESET_STATE,
} from "./actions.type";
import {
  RESET_STATE,
  SET_EMAIL,
  UPDATE_EMAIL_IN_LIST,
} from "./mutations.type";

const initialState = {
  email: {
    author: {},
    subject: "",
    sender: "",
    recipient: "",
    text: "",
    html: "",
    attachments: []
  },
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_EMAIL](context, emailSlug, prevEmail) {
    // avoid extronuous network call if article exists
    if (prevEmail !== undefined) {
      return context.commit(SET_EMAIL, prevEmail);
    }
    const { data } = await EmailsService.get(emailSlug);
    context.commit(SET_EMAIL, data.email);
    return data;
  },
  [EMAIL_PUBLISH]({ state }) {
    return EmailsService.create(state.email);
  },
  [EMAIL_DELETE](context, slug) {
    return EmailsService.destroy(slug);
  },
  [EMAIL_EDIT]({ state }) {
    return EmailsService.update(state.email.id, state.email);
  },
  [EMAIL_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_EMAIL](state, email) {
    state.email = email;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  email(state) {
    return state.email;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
