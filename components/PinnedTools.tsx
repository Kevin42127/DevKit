'use client';

import { Tool } from '@/types/tool';
import ToolCard from './ToolCard';

interface PinnedToolsProps {
  tools: Tool[];
}

export default function PinnedTools({ tools }: PinnedToolsProps) {
  if (tools.length === 0) {
    return null;
  }

  // 分離網站框架和部署網站
  const frameworks = tools.filter(tool => 
    tool.category === '前端開發工具' || 
    tool.category === '後端開發框架'
  );
  
  const deployment = tools.filter(tool => 
    tool.category === '雲端服務' || 
    tool.category === '託管服務'
  );

  return (
    <div className="bg-gradient-to-r from-primary-900/10 to-primary-800/5 border-y border-primary-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-dark-100">
                釘選工具
              </h2>
              <p className="text-dark-400 text-sm">
                精選的開發者工具，快速存取常用工具
              </p>
            </div>
          </div>
        </div>

        {/* 網站框架 */}
        {frameworks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">
                  網站框架
                </h3>
                <p className="text-dark-400 text-sm">
                  {frameworks.length} 個框架工具
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {frameworks.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* 部署網站 */}
        {deployment.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
              <div>
                <h3 className="text-lg font-semibold text-dark-100">
                  部署網站
                </h3>
                <p className="text-dark-400 text-sm">
                  {deployment.length} 個部署工具
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deployment.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}