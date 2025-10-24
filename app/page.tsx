'use client';

import { useState, useEffect, useMemo } from 'react';
import { Tool, FilterState } from '@/types/tool';
import { filterTools, getPinnedTools, debounce } from '@/lib/utils';
import SearchBar from '@/components/SearchBar';
import MobileSearchBar from '@/components/MobileSearchBar';
import PinnedTools from '@/components/PinnedTools';
import CategorizedTools from '@/components/CategorizedTools';
import BackToTop from '@/components/BackToTop';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import NotificationBell from '@/components/NotificationBell';

// 載入工具資料
import toolsData from '@/data/tools.json';

export default function Home() {
  const [tools] = useState<Tool[]>(toolsData as Tool[]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tags: [],
    pricing: ''
  });

  // 獲取釘選工具
  const pinnedTools = useMemo(() => getPinnedTools(tools), [tools]);

  // 篩選工具
  const filteredTools = useMemo(() => {
    return filterTools(tools, filters);
  }, [tools, filters]);

  // 搜尋處理
  const handleSearch = debounce((query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  }, 300);


  return (
    <div className="min-h-screen">
      {/* 導覽列 */}
      <nav className="bg-dark-800 border-b border-dark-700 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a 
                  href="#hero" 
                  className="text-xl font-bold text-primary-500"
                >
                  DevKit
                </a>
              </div>
            </div>
            
            {/* 桌面端搜尋欄 */}
            <div className="hidden sm:block max-w-md w-full">
              <SearchBar onSearch={handleSearch} tools={tools} />
            </div>
            
            {/* 右側操作區 */}
            <div className="flex items-center gap-4">
              {/* 通知鈴鐺 */}
              <NotificationBell />
              
              {/* 移動端搜尋圖標 */}
              <div className="sm:hidden">
                <MobileSearchBar onSearch={handleSearch} tools={tools} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 標題區域 */}
      <div id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center">
          {/* 標題卡片 */}
          <div className="bg-dark-800 rounded-xl p-8 border border-dark-700 shadow-lg mt-8">
            <h1 className="text-4xl font-bold text-dark-100 mb-4">
              開發者工具大全
            </h1>
            <p className="text-lg text-dark-400">
              100+ 精選工具，一站式開發解決方案
            </p>
          </div>
        </div>
      </div>

      {/* 釘選工具 */}
      <PinnedTools tools={pinnedTools} />

      {/* 分類工具列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-dark-100 mb-2">
            工具分類
          </h2>
          <p className="text-dark-400">
            按分類瀏覽 {filteredTools.length} 個工具
          </p>
        </div>

        <CategorizedTools tools={filteredTools} />
      </div>

      {/* 頁尾 */}
        <footer className="bg-dark-800 text-dark-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-dark-100 mb-4">
                相關網站
              </h3>
              <div className="flex justify-center">
                <a
                  href="https://toollaboratory.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  AI ToolLaboratory
                </a>
              </div>
            </div>
            <div className="text-center">
              <p className="text-dark-400">
                © DevKit.
              </p>
            </div>
          </div>
        </footer>

        {/* 返回頂部按鈕 */}
        <BackToTop />
        
        {/* PWA 安裝提示 */}
        <PWAInstallPrompt />
    </div>
  );
}
