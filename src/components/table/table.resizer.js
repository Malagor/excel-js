import { $ } from '@core/Dom';
import { MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT } from '@/constants';

export function resizeHandler(event, rootElement) {
  return new Promise((resolve) => {
    let value;
    const $resizer = $(event.target);
    const type = $resizer.data.resize;
    $resizer.addClass('active');

    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const cells = rootElement.findAll(`[data-col="${$parent.data.col}"]`);

    document.onmousemove = (e) => {
      if (type === 'col') {
        let delta = e.clientX - coords.right;
        value = coords.width + delta;

        if (delta < -(coords.width - MIN_COLUMN_WIDTH)) {
          delta = -Math.round(coords.width + MIN_COLUMN_WIDTH);
          value = MIN_COLUMN_WIDTH;
        }

        $resizer.css({
          right: -delta + 'px',
        });
      } else {
        let delta = Math.round(e.clientY - coords.bottom);
        value = coords.height + delta;

        if (delta < -(coords.height - MIN_ROW_HEIGHT)) {
          delta = -coords.height + MIN_ROW_HEIGHT;
          value = MIN_ROW_HEIGHT;
        }

        $resizer.css({
          bottom: -delta + 'px',
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      $resizer.removeClass('active');

      if (type === 'col') {
        cells.forEach((el) => el.css({ width: value + 'px' }));
        $resizer.css({ right: 0 });
      } else {
        $parent.css({
          height: `${value}px`,
        });
        $resizer.css({ bottom: 0 });
      }

      const id = $parent.data[type];

      resolve({
        type,
        data: {
          [id]: value,
        },
      });
    };
  });
}
