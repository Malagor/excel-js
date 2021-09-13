import { $ } from '@core/Dom';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler() {
    const path = ActiveRoute.pathWithoutParams;
    if (this.routes[path]) {
      if (this.page) {
        this.page.destroy();
      }
      this.$placeholder.clear();

      const Page = this.routes[path];
      this.page = new Page(ActiveRoute.param);

      this.$placeholder.append(this.page.getRoot());
      this.page.afterRender();
    }
  }
}
