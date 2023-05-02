import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
import { Loader } from '../../components/loader/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.loader = new Loader().toHtml();

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
   * Append Element.
   * @param {HTMLElement} root root Element.
   * @param {HTMLElement} page child Element.
   */
  append(root, page) {
    root.clear().append(page);
  }

  /**
   * Handler for listener 'hashchanged'.
   * Listener event 'hashchanged' in window
   */
  async changePageHandler() {
    if (this.page) this.page.destroy();
    this.append(this.$placeholder, this.loader);

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();
    this.append(this.$placeholder, root);
    this.page.afterRender();
  }

  /**
   * Destroy listener event hashchanged in window.
   */
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
