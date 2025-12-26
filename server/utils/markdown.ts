import MarkdownIt from 'markdown-it';

export async function renderMarkdownContent(content: string) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: '“”‘’',
    xhtmlOut: true,
  });

  // Chỉ load plugin nặng nếu cần thiết
  //   if (content.includes('```')) {
  //     // Sử dụng shiki để highlight cực đẹp mà không nặng client
  //     const shiki = await import('@shikijs/markdown-it').then(m => m.default);
  //     md.use(shiki, {
  //       theme: 'github-dark',
  //     });
  //   }

  //   if (content.includes('$$')) {
  //     const katex = await import('markdown-it-katex').then(m => m.default);
  //     md.use(katex);
  //   }

  //   if (content.includes('```mermaid')) {
  //     const mermaid = await import('markdown-it-mermaid').then(m => m.default);
  //     md.use(mermaid);
  //   }

  return md.render(content);
}
