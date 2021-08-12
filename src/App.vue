<template>
  <div id="app">
    <Filters
      @handleTableChange="handleTableChange"
      @handleChange="handleChange"
      :tables="tables"
      :headings="headings"
      :headingsMenu="headingsMenu"
    />
    <a-table
      :scroll="{ x: 1500 }"
      :columns="filteredHeadings"
      :data-source="tableData"
    >
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
    </a-table>
  </div>
</template>

<script>
import Filters from "./components/Filters.vue";
import categories from "./assets/mocks/categories.csv";
import customers from "./assets/mocks/customers.csv";
import employees from "./assets/mocks/employees.csv";
import orders from "./assets/mocks/orders.csv";
import shippers from "./assets/mocks/shippers.csv";
import regions from "./assets/mocks/regions.csv";
import territories from "./assets/mocks/territories.csv";
export default {
  name: "App",
  components: {
    Filters,
  },
  data() {
    return {
      headings: [],
      tableData: [],
      headingsMenu: [],
      filteredHeadings: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      tables: [
        { text: "Customers", value: "Customers" },
        { text: "Categories", value: "Categories" },
        { text: "Employees", value: "Employees" },
        { text: "Orders", value: "Orders" },
        { text: "Shippers", value: "Shippers" },
        { text: "Regions", value: "Regions" },
        { text: "Territories", value: "Territories" },
      ],
    };
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    handleTableChange(value) {
      let obj = {
        Customers: customers,
        Categories: categories,
        Employees: employees,
        Orders: orders,
        Shippers: shippers,
        Regions: regions,
        Territories: territories,
      };
      this.fetchData(obj[value]);
      // this.fetchData(obj[value]);
    },
    handleChange(value) {
      const comlumsObj = this.headings.reduce((agg, curr) => {
        agg[curr.title] = curr;
        return agg;
      }, {});
      this.filteredHeadings = value.map((v) => {
        return comlumsObj[v];
      });
    },
    fetchData(csvFile) {
      let headings = csvFile[0].map((field, i) => {
        return {
          title: field,
          dataIndex: field,
          width: 180,
          key: `${field}${i}`,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
          },
          onFilter: (value, record) => {
            let str = record[field];
            return str
              ? str
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
              : false;
          },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
          filterMultiple: false,
          sorter: (a, b) => {
            let x = a[field] ? a[field].toLowerCase() : "";
            let y = b[field] ? b[field].toLowerCase() : "";
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          },
          sortDirections: ["descend", "ascend"],
        };
      });
      let bodyData = csvFile.slice(1, csvFile.length - 1);
      let tableData = bodyData.map((row) => {
        let obj = {};
        csvFile[0].forEach((element, i) => {
          obj[element] = row[i];
        });
        return obj;
      });

      this.headings = headings;
      this.filteredHeadings = headings;
      this.headingsMenu = headings.map((v) => v.title);
      this.tableData = tableData;
    },
  },
  beforeMount() {
    this.fetchData(customers);
  },
};
</script>

<style>
#app {
  padding: 50px;
}
.filters {
  padding: 20px;
  background-color: rgb(247, 251, 255);
  margin-bottom: 20px;
  border-radius: 10px;
}
.filter-heading {
  font-size: 16px;
  color: #383838;
  margin-bottom: 0;
  text-transform: uppercase;
}
</style>
