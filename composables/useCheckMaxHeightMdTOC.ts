export default function useCheckMaxHeightMdTOC() {
  const getScrollHeight = (e: Event) => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
      (e.target as HTMLElement).scrollHeight || 0
    );
  };

  const getClientHeight = () => {
    const html = document.documentElement;
    return html.clientHeight || window.innerHeight;
  };

  const checkMaxHeightChanged = (floatingArea: HTMLElement, baseMaxHeight: number) => {
    return floatingArea.style.maxHeight !== baseMaxHeight + 'px';
  };

  const maxHeightTOCSide = (e: Event) => {
    const floatingArea : HTMLElement | null = document.querySelector<HTMLElement>('.js-sticky-toc');
    const targetClassList : any[] = Array.from((e.target as HTMLElement).classList || []);

    if (targetClassList.includes('js-sticky-toc') || targetClassList.includes('js-lnb')) {
      return;
    }

    const scrollPosition = window.scrollY || (e.target as HTMLElement).scrollTop || 0;
    const offsetHeight = getClientHeight();
    const scrollHeight = getScrollHeight(e);
    if (floatingArea) {
      const footerHeight = 310;
      const baseMaxHeight = offsetHeight - 320;
      if (scrollHeight < offsetHeight + scrollPosition + footerHeight) {
        const offset =
            offsetHeight + scrollPosition + footerHeight - scrollHeight;
        floatingArea.style.maxHeight = baseMaxHeight - offset + 'px';
      } else if (checkMaxHeightChanged(floatingArea, baseMaxHeight)) {
        floatingArea.style.maxHeight = baseMaxHeight + 'px';
      }
    }
  };

  return {
    maxHeightTOCSide
  };
}
