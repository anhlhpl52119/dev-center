// Show copy button in block code
export default function copyButtonPlugin(md) {
  const fence
    = md.renderer.rules.fence
      || ((tokens, idx, options, env, renderer) => {
        return renderer.renderToken(tokens, idx, options);
      });

  md.renderer.rules.fence = (tokens, idx, options, env, renderer) => {
    const content = fence(tokens, idx, options, env, renderer);

    // Wrap the pre element with a div and add copy button
    return `<div class="relative group">
      ${content}
      <button
        aria-label="Copy"
        aria-describedby="Copy block of code"
        class="absolute cursor-pointer top-12 right-12 bg-white/90 hover:bg-white border border-black/10 hover:shadow-sm rounded-xl p-6 opacity-70 hover:opacity-100 transition-all duration-200 flex items-center justify-center copy-btn"
        data-copy-btn
      >
        <span class="icon-[solar--copy-linear] size-20 text-gray-600"></span>
      </button>
    </div>`;
  };
}
