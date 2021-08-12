import Vue from "vue";
import App from "./App.vue";
import {
  Row,
  Col,
  Input,
  Tag,
  Table,
  Select,
  Icon,
  Button,
} from "ant-design-vue";

import "ant-design-vue/lib/row/style/css";
import "ant-design-vue/lib/col/style/css";
import "ant-design-vue/lib/input/style/css";
import "ant-design-vue/lib/tag/style/css";
import "ant-design-vue/lib/table/style/css";
import "ant-design-vue/lib/select/style/css";
import "ant-design-vue/lib/icon/style/css";
import "ant-design-vue/lib/button/style/css";
import VuePapaParse from "vue-papa-parse";

Vue.config.productionTip = false;

Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Tag);
Vue.use(Table);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Button);

Vue.use(VuePapaParse);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
