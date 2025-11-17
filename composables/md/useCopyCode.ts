import copy from 'copy-to-clipboard';
import type { ComputedRef, Ref } from 'vue';
import { inject, nextTick, onMounted, watch } from 'vue';

// import type { CustomIcon, StaticTextDefaultValue } from '@/types/md/type';
import type { StaticTextDefaultValue } from '@/types/md/type';
// import StrIcon from './Str';

// Todo props: ContentPreviewProps
const useCopyCode = (props: any, html: Ref<string>, key: Ref<string>) => {
  const editorId = inject('editorId') as string;
  const usedLanguageText = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

  // Inject copy buttons into code blocks on the page
  const initCopyEntry = () => {
    document.querySelectorAll(`#${editorId}-preview pre`).forEach((pre: Element) => {
      // Restore process ID
      let clearTimer = -1;

      // If a copy button exists, remove it
      pre.querySelector('.copy-button')?.remove();

      const copyBtnText = usedLanguageText.value.copyCode?.text || 'Copy Code';
      const copyButton = document.createElement('span');
      copyButton.setAttribute('class', 'copy-button');
      copyButton.dataset.tips = copyBtnText;

      copyButton.innerHTML = '<i class="ic-v2-community-copy-line md-copy-ic"></i>';

      copyButton.addEventListener('click', () => {
        // Remove the previous restore process on multiple clicks
        clearTimeout(clearTimer);

        const codeText = (pre.querySelector('code') as HTMLElement).innerText;

        const success = copy(props.formatCopiedText(codeText));

        const successTip = usedLanguageText.value.copyCode?.successTips || 'Copied!';
        const failTip = usedLanguageText.value.copyCode?.failTips || 'Failed to copy.';

        copyButton.dataset.tips = success ? successTip : failTip;

        clearTimer = window.setTimeout(() => {
          copyButton.dataset.tips = copyBtnText;
        }, 1500);
      });
      pre.appendChild(copyButton);
    });
  };

  // Compile event
  const htmlChanged = async () => {
    // Reset the copy buttons
    await nextTick(initCopyEntry);
  };

  // When the setting preview changes
  const settingPreviewChanged = async (nVal: boolean) => {
    if (nVal) {
      await nextTick(initCopyEntry);
    }
  };

  // watch(() => html.value, htmlChanged);
  watch([html, key], htmlChanged);
  watch(() => props.setting.preview, settingPreviewChanged);
  watch(() => props.setting.htmlPreview, settingPreviewChanged);
  watch(() => usedLanguageText.value, initCopyEntry);
  onMounted(initCopyEntry);
};

export default useCopyCode;
