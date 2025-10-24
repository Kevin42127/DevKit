'use client';

import { useState, useRef, useEffect } from 'react';
import { Tool } from '@/types/tool';
import ExternalSuggestions from './ExternalSuggestions';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  tools?: Tool[];
}

export default function SearchBar({ onSearch, placeholder = "搜尋工具...", tools = [] }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length < 2); // 只在輸入少於2字符時顯示建議
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // 延遲關閉，讓點擊建議有時間執行
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-dark-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        className="input pl-10 pr-10"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      {/* 清除按鈕 */}
      {query.length > 0 && (
        <button
          onClick={() => {
            setQuery('');
            setShowSuggestions(false);
            onSearch('');
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-primary-500 transition-colors duration-200"
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
          {query.length < 2 && (
            <ExternalSuggestions
              tools={tools}
              onSuggestionClick={handleSuggestionClick}
              onClose={handleClose}
              isVisible={showSuggestions}
            />
          )}
        </>
      )}
    </div>
  );
}
