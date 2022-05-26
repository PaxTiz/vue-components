<template>
  <div class="tabs">
    <div class="tabs__header" :class="{ full }">
      <p
        v-for="item in items"
        :key="item.id"
        :class="{ selected: item.id === currentSelected }"
        @click="selectTab(item.id)"
      >
        {{ item.title }}
      </p>
    </div>
    <div class="tab__body">
      <component :is="items[currentSelected - 1].component" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",

  data: () => ({
    currentSelected: null,
  }),

  props: {
    selected: {
      type: Number,
      default: () => null,
    },
    items: {
      type: Array,
      required: true,
    },
    full: {
      type: Boolean,
      default: () => false,
    },
  },

  created() {
    if (this.items.length < 1) {
      throw Error("Tabs must have at least one tab");
    }
    this.currentSelected = this.selected || this.items[0].id;
  },

  methods: {
    selectTab(id) {
      this.currentSelected = id;
    },
  },
};
</script>

<style>
:root {
  --tabs-spacing: 1em;
}
</style>
<style scoped>
.tabs__header {
  display: flex;
  background-color: #fcfcfc;
}
.tabs__header.full p {
  flex: 1;
}
.tabs__header p {
  padding: var(--tabs-spacing) calc(var(--tabs-spacing) * 2);
  margin: 0;
  cursor: pointer;
}
.tabs__header p:first-child {
  border-top-left-radius: calc(var(--tabs-spacing) / 2);
  border-bottom-left-radius: calc(var(--tabs-spacing) / 2);
}
.tabs__header p:last-child {
  border-top-right-radius: calc(var(--tabs-spacing) / 2);
  border-bottom-right-radius: calc(var(--tabs-spacing) / 2);
}
.tabs__header p.selected {
  background-color: #c1c1c1;
}
</style>