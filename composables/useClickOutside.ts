export default function useClickOutside(
  targetEl : HTMLElement | null,
  callback : any,
  excludeEls?: (HTMLElement| null)[]
) {
  const listener = (event : any) => {
    const excludedTargets : (HTMLElement | null)[] = [targetEl];

    if (excludeEls && Array.isArray(excludeEls)) {
      for (let i = 0; i < excludeEls.length; i++) {
        excludedTargets.push(excludeEls[i]);
      }
    }

    if (excludedTargets.some((target : any) => event.target === target || event.composedPath().includes(target))) {
      return;
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  const removeEvent = () => {
    window.removeEventListener('click', listener);
  };

  const initEvent = () => {
    window.addEventListener('click', listener);
  };

  return {
    initEvent,
    removeEvent
  };
}
