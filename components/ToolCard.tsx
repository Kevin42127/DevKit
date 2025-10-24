import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case '免費':
        return 'bg-green-900/20 text-green-300 border border-green-700/30';
      case '付費':
        return 'bg-red-900/20 text-red-300 border border-red-700/30';
      case 'freemium':
        return 'bg-yellow-900/20 text-yellow-300 border border-yellow-700/30';
      default:
        return 'bg-primary-900/20 text-primary-300 border border-primary-700/30';
    }
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* 標題和描述區域 */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dark-100 mb-2">
              {tool.name}
            </h3>
            <p className="text-dark-300 text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* 定價標籤 */}
          <div className="flex items-center justify-start">
            <span className={`tag-pricing ${getPricingColor(tool.pricing)}`}>
              {tool.pricing}
            </span>
          </div>
        </div>
      </div>

      {/* 連結按鈕 - 固定在底部 */}
      <div className="mt-auto pt-4">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary text-center block flex items-center justify-center gap-2"
        >
          前往官網
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
