import { debounce } from '@vavt/util';

/**
 * Make page elements draggable
 *
 * @param trigger The trigger element to move the parent element
 * @param moveHandler
 */
export const keyMove = (
  trigger: HTMLElement,
  moveHandler?: (left: number, top: number) => void
): (() => void) => {
  const triggerMouseDown = (mdown: MouseEvent) => {
    const parent: HTMLElement = trigger.parentElement || document.body;
    // Size of the element to be moved
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    // Current page dimensions
    const { clientWidth } = document.documentElement;
    const { clientHeight } = document.documentElement;

    const x = mdown.offsetX;
    const y = mdown.offsetY;

    const mouseMoveHandler = (e: MouseEvent) => {
      let tx = e.x + document.body.scrollLeft - document.body.clientLeft - x;
      let ty = e.y + document.body.scrollTop - document.body.clientTop - y;
      tx = tx < 1 ? 1 : tx < clientWidth - width - 1 ? tx : clientWidth - width - 1;
      ty = ty < 1 ? 1 : ty < clientHeight - height - 1 ? ty : clientHeight - height - 1;

      if (moveHandler) {
        moveHandler(tx, ty);
      } else {
        parent.style.left = `${tx}px`;
        parent.style.top = `${ty}px`;
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mouseup', mouseUpHandler);
  };

  trigger.addEventListener('mousedown', triggerMouseDown);

  return () => {
    // Remove event listener
    trigger.removeEventListener('mousedown', triggerMouseDown);
  };
};

/**
 * Insert external link tags into the page
 *
 * @param ele Element
 * @param checkKey Global name
 */
export const appendHandler = (ele: HTMLElement, checkKey: string = '') => {
  const insertedEle = document.getElementById(ele.id);

  // Backup
  const onload_ = ele.onload;
  // Clear
  ele.onload = null;

  const onload = function(this: GlobalEventHandlers, e: Event) {
    if (typeof onload_ === 'function') {
      onload_.bind(this)(e);
    }

    ele.removeEventListener('load', onload);
  };

  if (!insertedEle) {
    ele.addEventListener('load', onload);
    document.head.appendChild(ele);
  } else if (checkKey !== '') {
    insertedEle.addEventListener('load', onload);

    if (Reflect.get(window, checkKey)) {
      // Instance already exists, directly trigger the load event
      insertedEle.dispatchEvent(new Event('load'));
    }
  }
};

/**
 * Update attributes of inserted elements
 *
 * @param id ID selector
 * @param attr Attribute name
 * @param value Attribute value
 */
export const updateHandler = debounce((id: string, attr: string, value: string) => {
  const ele = document.getElementById(id);

  if (ele) {
    ele.setAttribute(attr, value);
  }
}, 10);

/**
 * Update attributes for zoomable images
 *
 * @param html string containing HTML content
 * @returns string with updated HTML content
 */
export const transformZoomableImageHtml = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const images = doc.querySelectorAll('img');

  images.forEach((img: HTMLElement) => {
    img.classList.add('zoomable-img');
  });

  return doc.body.innerHTML;
};

/**
 * Handle click events on zoomable images
 *
 * @param e DOM event
 * @param imageToZoom Ref to store the image source
 * @param isOpenZoom Ref to control the zoom state
 */
export const zoomImageHandler = (e: Event, imageToZoom: Ref<string>, isOpenZoom: Ref<boolean>) => {
  const target = e.target as HTMLElement;
  if (target.matches('.zoomable-img')) {
    const src = target.getAttribute('src');
    if (src !== null) {
      imageToZoom.value = src;
      isOpenZoom.value = true;
    }
  }
};
