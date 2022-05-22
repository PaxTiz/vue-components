<template>
  <div>
    <h1>Form Builder</h1>
    <form @submit.prevent="onSubmit" class="form">
      <div v-for="item in items" :key="item.name" class="form-group">
        <div v-if="Array.isArray(item.children)" class="form-row">
          <FormBuilderItem
            v-for="childItem in item.children"
            :key="childItem.name"
            :form="form"
            :item="childItem"
            :error="errors[childItem.name]"
            @on-input="onInput"
            @on-select-file="onSelectFile"
          />
        </div>
        <FormBuilderItem
          v-else
          :form="form"
          :item="item"
          :error="errors[item.name]"
          @on-input="onInput"
          @on-select-file="onSelectFile"
        />
      </div>
      <button class="form-button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import FormBuilderItem from "./FormBuilderItem.vue";

export default {
  name: "FormBuilder",
  components: { FormBuilderItem },
  data: () => ({
    form: {},
    errors: {},
  }),

  props: {
    items: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },

  created() {
    for (const [key, value] of Object.entries(this.model)) {
      this.form[key] = value;
      this.errors[key] = null;
    }
  },

  methods: {
    onSubmit() {
      for (const item of this.items) {
        if (!this.validateItems(item.children ?? [item])) {
          return;
        }
      }

      this.$emit("submit", this.form);
    },

    validateItems(items) {
      let canSubmit = true;
      for (const item of items) {
        for (const validator of item.validators ?? []) {
          const valid = validator(this.form[item.name]);
          if (valid !== true) {
            this.errors = { ...this.errors, [item.name]: valid };
            canSubmit = false;
            continue;
          }
        }
      }

      return canSubmit;
    },

    onInput(item) {
      this.errors[item.name] = null;
    },

    onSelectFile(e, item) {
      this.form[item.name] = item.multiple ? e.target.files : e.target.files[0];
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.form-group {
  display: block;
}
.form-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.form-button {
  width: min-content;
  padding: 8px 32px;
  text-transform: uppercase;
  background-color: #c1c1c1;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
