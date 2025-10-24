'use client';

import { useState, useEffect, useRef } from 'react';
import { Tool } from '@/types/tool';

interface SearchSuggestionsProps {
  searchTerm: string;
  tools: Tool[];
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function SearchSuggestions({
  searchTerm,
  tools,
  onSuggestionClick,
  onClose,
  isVisible
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    // 生成搜尋建議
    const generateSuggestions = () => {
      const allSuggestions = new Set<string>();
      
      // 從工具名稱中提取建議
      tools.forEach(tool => {
        if (tool.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          allSuggestions.add(tool.name);
        }
      });

      // 從工具描述中提取關鍵詞
      tools.forEach(tool => {
        const words = tool.description.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.includes(searchTerm.toLowerCase()) && word.length > 2) {
            allSuggestions.add(word);
          }
        });
      });

      // 從標籤中提取建議
      tools.forEach(tool => {
        tool.tags.forEach(tag => {
          if (tag.toLowerCase().includes(searchTerm.toLowerCase())) {
            allSuggestions.add(tag);
          }
        });
      });

      // 從分類中提取建議
      tools.forEach(tool => {
        if (tool.category.toLowerCase().includes(searchTerm.toLowerCase())) {
          allSuggestions.add(tool.category);
        }
      });

      return Array.from(allSuggestions).slice(0, 8);
    };

    const newSuggestions = generateSuggestions();
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
  }, [searchTerm, tools]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            onSuggestionClick(suggestions[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, suggestions, selectedIndex, onSuggestionClick, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <div 
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 mt-3 bg-dark-800 border border-dark-700 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto"
    >
      <div className="p-4">
        <div className="text-xs text-dark-400 mb-2 px-2">
          搜尋建議
        </div>
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              index === selectedIndex
                ? 'bg-primary-500 text-white'
                : 'text-dark-200 hover:bg-dark-700'
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
