import { EmailsService } from "@/common/api.service";
import { FETCH_EMAIL} from "./actions.type";
import { SET_EMAIL } from "./mutations.type";
import {EmailsService} from "../common/api.service";

export const state = {
  email: {},
};

export const actions = {
  [FETCH_EMAIL](context, emailSlug) {
    return EmailsService.get(emailSlug)
      .then(({ data }) => {
        context.commit(SET_EMAIL, data.email);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_EMAIL](state, email) {
    state.email = email;
  },
};

export default {
  state,
  actions,
  mutations
};
