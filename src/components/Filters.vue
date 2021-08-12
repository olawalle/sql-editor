<template>
  <div class="filters">
    <a-row :gutter="20">
      <a-col :span="8">
        <p class="filter-heading">
          Choose Table
        </p>
        <a-select
          style="width: 100%"
          placeholder="Please select table"
          :default-value="tables[0].text"
          @change="handleTableChange"
        >
          <a-select-option
            :value="table.value"
            v-for="table in tables"
            :key="table.value"
          >
            {{ table.text }}
          </a-select-option>
        </a-select>
      </a-col>

      <a-col :span="8">
        <p class="filter-heading">
          Choose fields
        </p>
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="Please select headings"
          v-model="headingsMenuValues"
          @change="handleChange"
        >
          <a-select-option v-for="title in headings" :key="title.title">
            {{ title.title }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: ["tables", "headings", "headingsMenu"],
  data() {
    return {
      headingsMenuValues: this.headingsMenu,
    };
  },
  watch: {
    headingsMenu() {
      this.headingsMenuValues = this.headingsMenu;
    },
  },
  methods: {
    handleTableChange(e) {
      this.$emit("handleTableChange", e);
    },
    handleChange(e) {
      this.$emit("handleChange", e);
    },
  },
};
</script>
<style scoped></style>
