type Options = {
  replace?: boolean;
}
type Options2 = {
  autoEncode?: boolean;
  hash?: string;
}

const currentHash = ref(window.location.hash);

export const useTOCLink = () => {
  const updateHash = (newHash: string, options?: Options) => {
    const {
      replace = true
    } = options || {};

    const hashValue = newHash.startsWith('#') ? newHash : `#${newHash}`;

    if (replace) {
      history.replaceState(null, '', hashValue);
    } else {
      history.pushState(null, '', hashValue);
    }

    currentHash.value = newHash;
  };

  const scrollToHash = (option?: Options2) => {
    const {
      autoEncode = true,
      hash = currentHash.value
    } = option || {};

    let elementId = hash.startsWith('#') ? hash.replace('#', '') : hash;

    if (autoEncode) {
      elementId = encodeURIComponent(elementId);
    }

    const targetEl = document.getElementById(elementId);
    targetEl && targetEl.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    currentHash,

    scrollToHash,
    updateHash
  };
};
