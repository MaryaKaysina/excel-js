import { SELECTED_CLASS, SELECTED_GROUP_CLASS } from '@/consts';

export class TableSelection {
  static className = SELECTED_CLASS;
  static classNameGroup = SELECTED_GROUP_CLASS;

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group.forEach(($el) => $el.removeClass(TableSelection.classNameGroup));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.classNameGroup));
    this.current.addClass(TableSelection.className);
  }
}
