import * as DcbUI from './ui';
import * as demos from './demo';
import ApiTable from './apiTable';
import ComponentContributors from './componentContributors';

export default ({ Vue, router }) => {
  window.demos = demos;
  const createMobileDemo = to => {
    const mobile = document.getElementById('mobile-demo');
    if (mobile) {
      mobile.remove();
    }
    const mobileDemoDiv = document.createElement('div');
    mobileDemoDiv.id = 'mobile-demo';
    mobileDemoDiv.style.position = 'fixed';
    mobileDemoDiv.style.width = '375px';
    mobileDemoDiv.style.height = '640px';
    mobileDemoDiv.style.zIndex = '999';
    mobileDemoDiv.style.right = '16px';
    mobileDemoDiv.style.top = '3.6rem';
    mobileDemoDiv.style.padding = '102px 28px 106px';
    mobileDemoDiv.style.backgroundImage =
      "url('https://assets.gogpay.cn/web/onlineview/img/model.png')";
    mobileDemoDiv.style.backgroundSize = '100% 100%';
    mobileDemoDiv.style.zIndex = '999';
    const mobileDemoDivMask = document.createElement('div');
    mobileDemoDivMask.style.width = '375px';
    mobileDemoDivMask.style.height = '640px';
    mobileDemoDivMask.style.background = '#fff';
    mobileDemoDivMask.style.position = 'absolute';
    mobileDemoDivMask.style.zIndex = '0';
    const mobileDemo = document.createElement('iframe');
    mobileDemo.style.position = 'relative';
    mobileDemo.id = 'mobile-iframe';
    mobileDemo.style.width = '375px';
    mobileDemo.style.height = '100%';
    mobileDemo.style.border = '0';
    mobileDemo.style.zIndex = '1';
    mobileDemo.src = `${
      window.location.origin
    }/dcb-ui/v0/mobile/mobile.html?routerName=${
      to.fullPath.split('/components/')[1]
    }`;
    mobileDemoDiv.appendChild(mobileDemoDivMask);
    mobileDemoDiv.appendChild(mobileDemo);
    document.getElementsByClassName('page')[0].style.paddingRight = '425px';
    return mobileDemoDiv;
  };
  router.beforeEach((to, from, next) => {
    if (to.name && to.path.indexOf('/components/') !== -1) {
      if (!document.getElementById('mobile-demo')) {
        let timd = '';
        const add = () => {
          if (
            document.getElementsByClassName('theme-container')[0] &&
            location.pathname.split('/components/')[1]
          ) {
            document
              .getElementsByClassName('theme-container')[0]
              .appendChild(createMobileDemo(to));
            clearTimeout(timd);
          } else {
            add();
          }
        };
        timd = setTimeout(() => add(), 500);
      } else {
        if (
          document.getElementsByClassName('theme-container')[0] &&
          location.pathname.split('/components/')[1]
        ) {
          document
            .getElementsByClassName('theme-container')[0]
            .appendChild(createMobileDemo(to));
        }
      }
    } else if (
      to.path.indexOf('/components/') === -1 &&
      to.path.indexOf('/mobile/') === -1
    ) {
      const mobile = document.getElementById('mobile-demo');
      if (mobile) {
        document.getElementsByClassName('page')[0].style.paddingRight = 0;
        mobile.remove();
      }
    }
    next();
  });

  Vue.use(DcbUI);
  Object.keys(demos).forEach(name => {
    Vue.component(name, demos[name]);
  });
  Vue.component('api-table', ApiTable);
  Vue.component('component-contributors', ComponentContributors);
};
