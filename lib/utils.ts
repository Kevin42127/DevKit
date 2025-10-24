import { Tool, FilterState } from '@/types/tool';

export function filterTools(tools: Tool[], filters: FilterState): Tool[] {
  let filtered = [...tools];

  // 搜尋篩選
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(tool => 
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // 標籤篩選
  if (filters.tags.length > 0) {
    filtered = filtered.filter(tool => 
      filters.tags.some(tag => tool.tags.includes(tag))
    );
  }

  // 定價篩選
  if (filters.pricing) {
    filtered = filtered.filter(tool => tool.pricing === filters.pricing);
  }

  // 預設排序：pinned 工具優先，然後 featured 工具，最後按名稱排序
  filtered.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  return filtered;
}

export function getPinnedTools(tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.pinned).sort((a, b) => a.name.localeCompare(b.name));
}

export function getUniqueTags(tools: Tool[]) {
  const allTags = tools.flatMap(tool => tool.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags.sort();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
