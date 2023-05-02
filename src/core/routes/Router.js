import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';

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

  /**
   * Init router.
   * Listener event 'hashchanged' in window
   */
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  /**
   * Handler for listener 'hashchanged'.
   * Listener event 'hashchanged' in window
   */
  changePageHandler() {
    if (this.page) this.page.destroy();
    this.$placeholder.clear();

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  /**
   * Destroy listener event hashchanged in window.
   */
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
