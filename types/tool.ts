export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  pricing: '免費' | '付費' | 'freemium';
  platforms: string[];
  icon?: string;
  featured?: boolean;
  pinned?: boolean;
}

export interface FilterState {
  search: string;
  tags: string[];
  pricing: string;
}
