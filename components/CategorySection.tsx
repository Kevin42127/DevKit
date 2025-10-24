'use client';

import { Tool } from '@/types/tool';
import ToolCard from './ToolCard';

interface CategorySectionProps {
  category: string;
  tools: Tool[];
  icon?: JSX.Element;
}

export default function CategorySection({ category, tools, icon }: CategorySectionProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <div className="text-white">{icon}</div>
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-dark-100">
            {category}
          </h3>
          <p className="text-dark-400 text-sm">
            {tools.length} 個工具
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
