<template>
  <label :for="item.name" class="form-item">
    <p class="form-item__label">{{ item.label }}</p>

    <input
      v-if="isInput"
      v-model="form[item.name]"
      :type="item.type"
      :id="item.name"
      :placeholder="placeholder"
      :class="{ error }"
      @input="() => onInput(item)"
      class="form-item__input"
    />

    <input
      v-else-if="item.type === 'file'"
      type="file"
      :id="item.name"
      :multiple="item.multiple === true"
      :placeholder="placeholder"
      :class="{ error }"
      @input="(e) => onSelectFile(e, item)"
      class="form-item__input"
    />

    <textarea
      v-else-if="item.type === 'textarea'"
      v-model="form[item.name]"
      :id="item.name"
      :placeholder="placeholder"
      :class="{ error }"
      @input="() => onInput(item)"
      class="form-item__input"
    />

    <select
      v-else-if="item.type === 'select'"
      v-model="form[item.name]"
      :id="item.name"
      :multiple="item.multiple === true"
      :name="item.name"
      :class="{ error }"
      @input="() => onInput(item)"
      class="form-item__input"
    >
      <option
        v-if="item.empty"
        :value="null"
        :selected="!item.name ? 'selected' : ''"
        @input="() => onInput(item)"
      >
        {{ item.empty }}
      </option>
      <option
        v-for="option in item.options"
        :key="option.value"
        :selected="item.name === option.value ? 'selected' : ''"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <div
      v-else-if="item.type === 'checkbox'"
      class="form-item__checkbox-group"
      :class="{
        'form-item__checkbox-row': item.alignment === 'row',
      }"
    >
      <div
        v-for="(option, index) in item.options"
        :key="option.value"
        class="form-item__checkbox-item"
      >
        <label :for="`${item.name}-${index}`">
          <input
            type="checkbox"
            :id="`${item.name}-${index}`"
            :value="option.value"
            :checked="form[item.name].includes(option.value) ? 'selected' : ''"
            @input="(e) => onSelectCheckbox(e, item)"
          />
          <p>{{ option.label }}</p>
        </label>
      </div>
    </div>

    <div
      v-else-if="item.type === 'radio'"
      class="form-item__radio-group"
      :class="{
        'form-item__radio-row': item.alignment === 'row',
      }"
    >
      <div
        v-for="(option, index) in item.options"
        :key="option.value"
        class="form-item__radio-item"
      >
        <label :for="`${item.name}-${index}`">
          <input
            type="radio"
            :id="`${item.name}-${index}`"
            :value="option.value"
            :checked="form[item.name] === option.value ? 'selected' : ''"
            @input="(e) => onSelectRadio(e, item)"
          />
          <p>{{ option.label }}</p>
        </label>
      </div>
    </div>

    <span v-if="error" class="form-item__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    error: String,
  },

  computed: {
    isInput() {
      return ["text", "number", "password"].includes(this.item.type);
    },

    placeholder() {
      if (this.item.placeholder === true) {
        return this.item.label;
      } else if (typeof this.item.placeholder === "string") {
        return this.item.placeholder;
      }
      return null;
    },
  },

  methods: {
    onInput(item) {
      this.$emit("on-input", item);
    },

    onSelectFile(e, item) {
      this.$emit("on-select-file", e, item);
      this.onInput(item);
    },

    onSelectCheckbox(e, item) {
      const { checked, value } = e.target;
      this.$emit("on-select-checkbox", { checked, value }, item);
      this.onInput(item);
    },

    onSelectRadio(e, item) {
      this.$emit("on-select-radio", e, item);
      this.onInput(item);
    },
  },
};
</script>

<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.form-item__label {
  margin: 0;
  font-weight: bold;
}
.form-item__input {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #c1c1c1;
  resize: none;
  background-color: #fcfcfc;
}
.form-item__input.error {
  border: 1px solid red;
}
textarea.form-item__input {
  height: 100px;
}

.form-item__checkbox-group,
.form-item__radio-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-item__checkbox-row,
.form-item__radio-row {
  flex-direction: row;
}

.form-item__checkbox-item label,
.form-item__radio-item label {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.form-item__checkbox-item label p,
.form-item__radio-item label p {
  margin: 0;
}

.form-item__error {
  color: red;
}
</style>
