import type MarkdownIt from 'markdown-it';
import type { StateBlock, Token } from 'markdown-it/index.js';
import { useEventListener } from '@vueuse/core';

interface TabData {
  title: string;
  contentStart: number;
  contentLines: string[];
}

interface TabPluginOptions {
  containerClass: string;
  tabListClass: string;
  tabPanelClass: string;
  activeTabClass: string;
}

// Plugin function
export default function tabContentPlugin(
  md: MarkdownIt,
  wrapperCls: Partial<TabPluginOptions> = {},
): void {
  // Default classes
  const {
    containerClass = 'tabbed-content',
    tabListClass = 'tabbed-labels',
    tabPanelClass = 'tabbed-panel',
    activeTabClass = 'tabbed-active',
  } = wrapperCls;

  const TAB_MARK = '===';
  const CONTENT_INDENT = 4;
  let tabSetCounter: number = 0;

  function tabsRule(
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean,
  ): boolean {
    let startPos: number = state.bMarks[startLine]! + state.tShift[startLine]!;
    let endPos: number = state.eMarks[startLine]!;

    if (startPos + 3 > endPos) {
      return false;
    }
    if (state.src.slice(startPos, startPos + 3) !== TAB_MARK) {
      return false;
    }

    if (silent) {
      return true;
    }

    const tabs: TabData[] = [];
    let currentTab: string | null = null;
    let currentContent: string[] = [];
    let nextLine: number = startLine;
    const tabSetId: number = tabSetCounter++;

    while (nextLine < endLine) {
      startPos = state.bMarks[nextLine]!;
      endPos = state.eMarks[nextLine]!;
      const line: string = state.src.slice(startPos, endPos);

      // next line not enter next line not start with ===
      // Check if we've hit a non-tab block element
      if (
        state.tShift[nextLine]! < CONTENT_INDENT
        && !line.match(/===\s*"([^"]+)"/)
      ) {
        const nextLineContent = state.src.slice(
          state.bMarks[nextLine + 1]! + state.tShift[nextLine]!,
          state.eMarks[nextLine + 1],
        );
        if (
          (line.length === 0 && nextLineContent.length === 0)
          || (state.tShift[nextLine + 1]! < CONTENT_INDENT
            && !nextLineContent.match(/===\s*"([^"]+)"/))
        ) {
          break;
        }
      }

      // Check for new tab
      if (line.startsWith(TAB_MARK)) {
        // Save previous tab if exists
        if (currentTab !== null) {
          tabs.push({
            title: currentTab,
            contentStart: state.line,
            contentLines: currentContent,
          });
          currentContent = [];
        }

        // Extract tab title from quotes
        const titleMatch = line.match(/===\s*"([^"]+)"/);
        if (!titleMatch) {
          break;
        }

        currentTab = titleMatch[1]!;
        state.line = nextLine + 1;
        nextLine++;
        continue;
      }

      // If we're in a tab, collect content
      if (currentTab !== null) {
        currentContent.push(state.src.slice(startPos + CONTENT_INDENT, endPos));
      }

      nextLine++;
    }

    // Add the last tab if exists
    if (currentTab !== null) {
      tabs.push({
        title: currentTab,
        contentStart: state.line,
        contentLines: currentContent,
      });
    }

    if (tabs.length === 0) {
      return false;
    }

    // Generate tokens for the tabs container
    let token: Token = state.push('tabs_container_open', 'div', 1);
    token.attrs = [
      ['class', containerClass],
      ['data-tab-set', `tabset-${tabSetId}`],
    ];

    // Generate tokens for tab list
    token = state.push('tab_list_open', 'div', 1);
    token.attrs = [['class', tabListClass]];

    // Add tab buttons
    tabs.forEach((tab: TabData, index: number) => {
      token = state.push('tab_button_open', 'button', 1);
      token.attrs = [
        ['class', index === 0 ? activeTabClass : ''],
        ['data-tab', `tab-${tabSetId}-${index}`],
        ['role', 'tab'],
        ['aria-selected', index === 0 ? 'true' : 'false'],
      ];

      token = state.push('text', '', 0);
      token.content = tab.title;

      token = state.push('tab_button_close', 'button', -1);
    });

    token = state.push('tab_list_close', 'div', -1);

    // Add tab panels
    tabs.forEach((tab: TabData, index: number) => {
      token = state.push('tab_panel_open', 'div', 1);
      token.attrs = [
        ['class', `${tabPanelClass} ${index === 0 ? activeTabClass : ''}`],
        ['data-tab', `tab-${tabSetId}-${index}`],
        ['role', 'tabpanel'],
        ['aria-hidden', index === 0 ? 'false' : 'true'],
      ];

      // Create a new state for parsing the tab content
      const tabContentState = new state.md.block.State(
        tab.contentLines.join('\n'),
        state.md,
        state.env,
        [],
      );

      // Parse the content as markdown
      state.md.block.tokenize(tabContentState, 0, tabContentState.lineMax);

      // Add the parsed tokens to the main token stream
      tabContentState.tokens.forEach((token: Token) => {
        state.tokens.push(token);
      });

      token = state.push('tab_panel_close', 'div', -1);
    });

    token = state.push('tabs_container_close', 'div', -1);

    state.line = nextLine;

    return true;
  }

  // Add tab rule before paragraph
  md.block.ruler.before('paragraph', 'tabs', tabsRule);

  // Add rendering rules
  md.renderer.rules.tabs_container_open = (
    tokens: Token[],
    idx: number,
  ): string => {
    const attrs
      = tokens[idx]!.attrs?.map(
        ([key, value]: [string, string]) => `${key}="${value}"`,
      ).join(' ') || '';
    return `<div ${attrs}>\n`;
  };

  md.renderer.rules.tab_list_open = (): string => {
    return `<div class="${tabListClass}">\n`;
  };

  md.renderer.rules.tab_button_open = (
    tokens: Token[],
    idx: number,
  ): string => {
    const attrs
      = tokens[idx]!.attrs?.map(
        ([key, value]: [string, string]) => `${key}="${value}"`,
      ).join(' ') || '';
    return `<button ${attrs}>`;
  };

  md.renderer.rules.tab_panel_open = (tokens: Token[], idx: number): string => {
    const attrs
      = tokens[idx]!.attrs?.map(
        ([key, value]: [string, string]) => `${key}="${value}"`,
      ).join(' ') || '';
    return `<div ${attrs}>\n`;
  };

  // Simple closing tags
  md.renderer.rules.tab_button_close = (): string => '</button>\n';
  md.renderer.rules.tab_list_close = (): string => '</div>\n';
  md.renderer.rules.tab_panel_close = (): string => '</div>\n';
  md.renderer.rules.tabs_container_close = (): string => '</div>\n';
}

export function tabEventHydration() {
  document
    .querySelectorAll('.tabbed-content')
    .forEach((tabContainer: Element) => {
      const tabList = tabContainer.querySelector('.tabbed-labels');
      const buttons = tabContainer.querySelectorAll('button[role="tab"]');
      const panels = tabContainer.querySelectorAll('[role="tabpanel"]');

      // Variables for drag scrolling
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      if (!tabList) {
        return;
      }

      // Add drag scroll events
      useEventListener(tabList, 'mousedown', (e: Event) => {
        isDown = true;
        tabList.classList.add('grabbing');
        startX = (e as MouseEvent).pageX - (tabList as HTMLElement).offsetLeft;
        scrollLeft = tabList.scrollLeft;
      });

      useEventListener(tabList, 'mouseleave', () => {
        isDown = false;
        tabList.classList.remove('grabbing');
      });

      useEventListener(tabList, 'mouseup', () => {
        isDown = false;
        tabList.classList.remove('grabbing');
      });

      useEventListener(tabList, 'mousemove', (e: Event) => {
        if (!isDown) {
          return;
        }
        e.preventDefault();
        const x = (e as MouseEvent).pageX - (tabList as HTMLElement).offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        tabList.scrollLeft = scrollLeft - walk;
      });

      // Handle tab switching
      buttons.forEach((button: Element) => {
        useEventListener(button, 'click', () => {
          const tabId = button.getAttribute('data-tab');

          // Update button states
          buttons.forEach((btn: Element) => {
            const isSelected = btn === button;
            btn.setAttribute('aria-selected', isSelected.toString());
            btn.classList.toggle('tabbed-active', isSelected);
          });

          // Update panel visibility
          panels.forEach((panel: Element) => {
            const isVisible = panel.getAttribute('data-tab') === tabId;
            panel.setAttribute('aria-hidden', (!isVisible)?.toString());
            panel.classList.toggle('tabbed-active', isVisible);
          });

          // Scroll selected tab into view if needed
          button.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        });
      });
    });
}
