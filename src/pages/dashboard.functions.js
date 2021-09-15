import { formatDate, storage } from '@core/utils';

export function toHTML(data) {
  return `
    <li class="db__record">
      <a href="#excel/${data.id}">${data.titleTable}</a>
      <strong>${formatDate(+data.id)}</strong>
    </li>
  `;
}

function getAllKeys() {
  return Object.keys(localStorage).filter((key) => key.includes('excel'));
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали не одной таблицы</p>`;
  }
  return `
    <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
        </div>

        <ul class="db__list">
          ${keys
            .map((key) => storage(key))
            .map(toHTML)
            .join('')}
        </ul>
  `;
}
