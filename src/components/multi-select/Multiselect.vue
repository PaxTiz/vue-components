<template>
  <div
    class="multiselect__container"
    :style="{
      'border-top-left-radius': '.5em',
      'border-top-right-radius': '.5em',
      'border-bottom-left-radius': open ? '0' : '.5em',
      'border-bottom-right-radius': open ? '0' : '.5em',
    }"
  >
    <div class="multiselect__header">
      <span v-if="selected.length === 0">{{ emptySelectedText }}</span>
      <div class="multiselect__selected">
        <p @click="removeItem(item)" v-for="item in selected" :key="item.value">
          <span class="text">{{ item.text }}</span>
          <span class="icon">x</span>
        </p>
      </div>
      <div @click="toggle" class="multiselect__toggle">&#8681;</div>
    </div>
    <div
      v-if="open"
      class="multiselect__options"
      :style="{
        'border-bottom-left-radius': '.5em',
        'border-bottom-right-radius': '.5em',
        'border-top-left-radius': open ? '0' : '.5em',
        'border-top-right-radius': open ? '0' : '.5em',
      }"
    >
      <input v-model="search" type="text" :placeholder="searchPlaceholder" />
      <div class="multiselect__options-list">
        <template v-if="filteredValues.length > 0">
          <p
            @click="addItem(item)"
            v-for="item in filteredValues"
            :key="item.value"
            :class="{ highlight: isSelected(item) }"
          >
            {{ item.text }}
          </p>
        </template>
        <p v-else>{{ emptySearchText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Multiselect",

  model: {
    prop: "selected",
    event: "select",
  },

  props: {
    selected: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    emptySelectedText: {
      type: String,
      default: () => "No element selected",
    },
    searchPlaceholder: {
      type: String,
      default: () => "Search...",
    },
    emptySearchText: {
      type: String,
      default: () => "No results...",
    },
  },

  data: () => ({
    open: false,
    search: null,
  }),

  computed: {
    filteredValues() {
      if (!this.search) {
        return this.values;
      }

      return this.values.filter((e) => {
        const currentValue = e.text.toString().toLowerCase();
        const search = this.search.toLowerCase();
        return currentValue.includes(search);
      });
    },
  },

  methods: {
    addItem(item) {
      if (this.isSelected(item)) {
        this.removeItem(item);
      } else {
        this.updateValue([...this.selected, item]);
      }
    },

    removeItem(item) {
      return this.updateValue(
        this.selected.filter((e) => e.value !== item.value)
      );
    },

    isSelected(item) {
      return this.selected.find((e) => e.value === item.value);
    },

    toggle() {
      this.open = !this.open;
    },

    updateValue(e) {
      this.$emit("select", e);
    },
  },
};
</script>

<style>
:root {
  --multiselect-padding: 0.5em;
  --multiselect-small-padding: 0.5em 1em;
  --multiselect-gap: 2em;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}
.multiselect__container {
  position: relative;
  width: 100%;
  background-color: #fcfcfc;
  color: #000;
  border: 1px solid #c1c1c1;
  user-select: none;
}
.multiselect__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--multiselect-padding);
}
.multiselect__header .multiselect__selected {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--multiselect-gap) / 2);
  row-gap: calc(var(--multiselect-gap) / 4);
}
.multiselect__header .multiselect__selected > * {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  padding: 0 !important;
  border-radius: 0.5em;
}
.multiselect__header .multiselect__selected > * .text {
  padding: 0.25em 1em;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
}
.multiselect__header .multiselect__selected * .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(246, 148, 148);
  height: 100%;
  border-left: 1px solid #c1c1c1;
  padding: 0 8px;
  border-top-right-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  cursor: pointer;
}
.multiselect__toggle {
  cursor: pointer;
}

.multiselect__container input,
.multiselect__container input:focus,
.multiselect__container input:focus-visible,
.multiselect__container input:active {
  border: none;
  outline: none;
}
.multiselect__container input {
  padding: var(--multiselect-padding);
  width: 100%;
  padding: var(--multiselect-padding) calc(var(--multiselect-padding) * 2);
}

.multiselect__options {
  position: absolute;
  width: calc(100% + 2px);
  left: -1px;
  background-color: #fcfcfc;
  color: #000;
  border: 1px solid #c1c1c1;
  text-decoration: none;
}

.multiselect__options-list {
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: scroll;
}
.multiselect__options p {
  margin: 0;
  padding: var(--multiselect-small-padding);
  cursor: pointer;
}
.multiselect__options p:last-child {
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}
.multiselect__options p.highlight {
  background-color: #c1c1c1;
}
</style>
