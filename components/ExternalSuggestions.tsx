'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/types/tool';

interface ExternalSuggestionsProps {
  tools: Tool[];
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function ExternalSuggestions({
  tools,
  onSuggestionClick,
  onClose,
  isVisible
}: ExternalSuggestionsProps) {
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<Tool[]>([]);

  useEffect(() => {
    // 生成熱門搜尋建議（最常用的框架）
    const generatePopularSearches = () => {
      const searches = [
        'React',            // 最常用前端框架
        'Vue.js',           // 第二常用前端框架
        'Angular',          // 企業級前端框架
        'Next.js',          // React 全端框架
        'Nuxt.js',          // Vue 全端框架
        'Svelte',           // 輕量級前端框架
        'Express.js',       // 最常用後端框架
        'FastAPI',          // Python 後端框架
        'Spring Boot',      // Java 後端框架
        'Laravel'           // PHP 後端框架
      ];
      return searches.slice(0, 6);
    };

    // 生成推薦工具（最常用的部署網站）
    const generateRecommendedTools = () => {
      // 定義最推薦的部署網站順序（基於使用頻率和可靠性）
      const recommendedOrder = [
        'vercel',           // Vercel - 最常用前端部署
        'netlify',          // Netlify - 第二常用前端部署
        'github-pages',     // GitHub Pages - 免費靜態部署
        'aws',              // AWS - 最常用雲端部署
        'heroku',           // Heroku - 最常用後端部署
        'digitalocean',     // DigitalOcean - 性價比高的VPS
        'railway',          // Railway - 現代化部署平台
        'render',           // Render - 簡單易用的部署
        'firebase',         // Firebase - Google 雲端部署
        'cloudflare'        // Cloudflare - CDN 和部署
      ];

      // 先按推薦順序排序，然後按 featured 狀態排序
      const sortedTools = tools
        .filter(tool => tool.featured)
        .sort((a, b) => {
          const aIndex = recommendedOrder.indexOf(a.id);
          const bIndex = recommendedOrder.indexOf(b.id);
          
          // 如果都在推薦順序中，按順序排序
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          
          // 如果只有一個在推薦順序中，推薦的排在前面
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          // 如果都不在推薦順序中，按名稱排序
          return a.name.localeCompare(b.name);
        });

      return sortedTools.slice(0, 4);
    };

    setPopularSearches(generatePopularSearches());
    setRecommendedTools(generateRecommendedTools());
  }, [tools]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-dark-800 border border-dark-700 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
      <div className="p-4">
        {/* 熱門搜尋 */}
        <div className="mb-4">
          <div className="text-xs text-dark-400 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            熱門搜尋
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(search)}
                className="px-3 py-1.5 bg-dark-700 hover:bg-primary-500 text-dark-300 hover:text-white text-sm rounded-lg transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* 推薦工具 */}
        {recommendedTools.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-dark-400 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              推薦工具
            </div>
            <div className="space-y-2">
              {recommendedTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onSuggestionClick(tool.name)}
                  className="w-full text-left p-3 bg-dark-700 hover:bg-primary-500 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-dark-200 group-hover:text-white">
                        {tool.name}
                      </div>
                      <div className="text-xs text-dark-400 group-hover:text-primary-200 mt-1">
                        {tool.description.slice(0, 50)}...
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-dark-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
