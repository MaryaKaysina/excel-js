import { $ } from '@core/dom';

export const resizeHandler = ($root, event) => {
  const type = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let value = 0;

  $parent.addClass('active');

  document.onmousemove = (e) => {
    if (type === 'column') {
      const delta = coords.right - e.pageX;
      value = coords.width - delta;
      $resizer.css({ right: delta + 'px' });
    }
    if (type === 'row') {
      const delta = coords.bottom - e.pageY;
      value = coords.height - delta;
      $resizer.css({ bottom: delta + 'px' });
    }
  };

  document.onmouseup = () => {
    $parent.removeClass('active');

    if (type === 'column' && value) {
      const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
      $resizer.css({ right: '-4px' });
      $parent.css({ width: value + 'px', minWidth: value + 'px' });
      cells.forEach((el) => el.style.width = value + 'px');
    }

    if (type === 'row' && value) {
      $resizer.css({ bottom: '-4px' });
      $parent.css({ height: value + 'px', minHeight: value + 'px' });
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };
};
