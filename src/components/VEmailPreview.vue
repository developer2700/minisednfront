<template>

    <div class="card">
      <div class="card-header">
        <h5 class="pull-lg-left" v-text="email.subject"/>
        <span class="pull-lg-right"><span class="date-posted">{{ email.created_at | date }}</span></span>
      </div>
      <div class="card-block">
        <span v-html="'<b>Sender: </b>'+email.sender"/>
        <span v-html="' <b>Recipient: </b>'+email.recipient"/>
        <span v-html="' <b>Status: </b>'+email.status"/>

        <p class="card-text">{{ email.text }}</p>
      </div>
      <div class="card-footer">
        <rwv-email-actions
          :email="email"
        ></rwv-email-actions>
      </div>
    </div>

</template>

<script>
  import RwvEmailActions from "@/components/EmailActions";

  export default {
    name: "RwvEmailPreview",
    components: {
      RwvEmailActions
    },
    props: {
      email: {type: Object, required: true}
    },
  };
</script>
