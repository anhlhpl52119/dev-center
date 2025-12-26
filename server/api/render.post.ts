import { hash } from 'ohash';

export default defineCachedEventHandler(async (event) => {
  const body = await readBody(event);
  const { content, id } = body;

  if (!content) {
    throw createError({ statusCode: 400, message: 'Content is required' });
  }

  console.log(`[Cache Miss] Rendering Markdown for ID: ${id}`);

  // Render HTML
  const html = await renderMarkdownContent(content);

  return {
    html,
    renderedAt: new Date().toISOString(),
  };
}, {
  // Cấu hình Cache
  group: 'api',
  name: 'markdown',
  getKey: (event) => {
    // Tạo key dựa trên ID của bài viết và hash của nội dung
    // Nếu nội dung thay đổi, cache sẽ tự động miss
    const body = event.context.body; // Lưu ý: Cần xử lý lấy body để tạo key
    return hash(body);
  },
  maxAge: 60 * 60, // Cache trong 1 giờ (3600 giây)
  swr: true, // Stale-While-Revalidate: Trả về cache cũ trong lúc render ngầm cái mới
});
