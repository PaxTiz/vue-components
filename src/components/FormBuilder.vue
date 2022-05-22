<template>
  <form @submit.prevent="onSubmit" class="form">
    <div v-for="item in items" :key="item.name" class="form-group">
      <div v-if="Array.isArray(item.children)" class="form-row">
        <FormBuilderItem
          v-for="childItem in item.children"
          :key="childItem.name"
          :form="form"
          :item="childItem"
          :error="errors[childItem.name]"
          :class="classes(childItem)"
          @on-input="onInput"
          @on-select-file="onSelectFile"
        />
      </div>
      <FormBuilderItem
        v-else
        :form="form"
        :item="item"
        :error="errors[item.name]"
        :class="classes(item)"
        @on-input="onInput"
        @on-select-file="onSelectFile"
      />
    </div>

    <button
      class="form-button"
      :class="classes(button)"
      :type="button.type || 'submit'"
    >
      {{ button.text }}
    </button>
  </form>
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
    button: {
      type: Object,
      required: true,
    },
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
    classes(item) {
      if (!item.classes) {
        return "";
      }

      if (Array.isArray(item.classes)) {
        return item.classes.join(" ");
      }

      return item.classes;
    },

    onSubmit() {
      let canSubmit = true;
      for (const item of this.items) {
        if (!this.validateItems(item.children || [item])) {
          canSubmit = false;
        }
      }

      if (canSubmit) {
        this.$emit("submit", this.form);
      }
    },

    validateItems(items) {
      let canSubmit = true;
      for (const item of items) {
        for (const validator of item.validators || []) {
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
  gap: 2em;
}
.form-group {
  display: block;
}
.form-row {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

.form-button {
  width: min-content;
  padding: 1em 4em;
  text-transform: uppercase;
  background-color: #c1c1c1;
  color: #000;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
}
</style>
