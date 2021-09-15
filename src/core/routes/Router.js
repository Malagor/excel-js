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
    if (this.page) {
      this.page.destroy();
    }

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.$placeholder.clear();

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
}
