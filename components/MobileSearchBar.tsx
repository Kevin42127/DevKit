'use client';

import { useState } from 'react';
import { Tool } from '@/types/tool';
import ExternalSuggestions from './ExternalSuggestions';

interface MobileSearchBarProps {
  onSearch: (searchTerm: string) => void;
  tools?: Tool[];
}

export default function MobileSearchBar({ onSearch, tools = [] }: MobileSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setShowSuggestions(value.length < 2); // 只在輸入少於2字符時顯示建議
    onSearch(value);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setIsExpanded(false);
    setShowSuggestions(false);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchTerm('');
    setShowSuggestions(false);
    onSearch('');
  };

  if (!isExpanded) {
    return (
      <button
        onClick={handleExpand}
        className="p-2 text-dark-400 hover:text-primary-500 transition-colors duration-200"
        aria-label="搜尋"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="absolute inset-0 bg-dark-800 border-b border-dark-700 z-50">
      <div className="flex items-center h-16 px-4">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="搜尋工具..."
              className="w-full pl-10 pr-10 py-2 bg-dark-700 border border-dark-600 text-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-dark-400"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            
            {/* 清除按鈕 */}
            {searchTerm.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSuggestions(false);
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500 transition-colors"
                aria-label="清除搜尋"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {tools.length > 0 && (
              <>
                {/* 外部建議 - 當沒有輸入或輸入少於2字符時顯示 */}
                {searchTerm.length < 2 && (
                  <ExternalSuggestions
                    tools={tools}
                    onSuggestionClick={handleSuggestionClick}
                    onClose={() => setShowSuggestions(false)}
                    isVisible={showSuggestions}
                  />
                )}
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-dark-400 hover:text-primary-500 transition-colors duration-200"
            aria-label="關閉搜尋"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
