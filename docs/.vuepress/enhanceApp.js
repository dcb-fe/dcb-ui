import * as DcbUI from './ui';
import * as demos from './demo';
import ApiTable from './apiTable';
import ComponentContributors from './componentContributors';

export default ({ Vue }) => {
  Vue.use(DcbUI);
  Object.keys(demos).forEach(name => {
    Vue.component(name, demos[name]);
  });
  Vue.component('api-table', ApiTable);
  Vue.component('component-contributors', ComponentContributors);
};
