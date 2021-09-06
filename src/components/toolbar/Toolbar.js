import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/Dom';
import { DEFAULT_STYLES } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$on('table:select', ($cell) => {
      const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
      this.setState(styles);
    });
  }

  prepare() {
    const initialState = { ...DEFAULT_STYLES };

    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const { target } = event;
    const $target = $(target).closest('[data-type="button"]');

    if ($target) {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      this.setState(value);
    }
  }
}
