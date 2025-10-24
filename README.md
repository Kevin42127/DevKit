# DevKit - 開發者工具大全

一個現代化的開發者工具分類與整理網站，使用 Next.js 和 Tailwind CSS 建構。

## 功能特色

- 🔍 **即時搜尋**: 支援工具名稱、描述、標籤的即時搜尋
- 🏷️ **分類篩選**: 按工具類別進行篩選
- 📊 **排序功能**: 支援按名稱或熱門度排序
- 📱 **響應式設計**: 適配桌面、平板、手機等各種裝置
- 🎨 **單色設計系統**: 基於灰階的簡潔優雅設計
- ⚡ **快速載入**: 靜態生成，載入速度快

## 技術棧

- **框架**: Next.js 14+ (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **設計**: 單色系統設計

## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建構生產版本

```bash
npm run build
npm start
```

## 專案結構

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主頁面
│   └── globals.css        # 全域樣式
├── components/            # React 組件
│   ├── FilterBar.tsx      # 篩選列
│   ├── SearchBar.tsx      # 搜尋欄
│   ├── ToolCard.tsx       # 工具卡片
│   └── ToolGrid.tsx       # 工具網格
├── data/                  # 資料檔案
│   └── tools.json         # 工具資料
├── lib/                   # 工具函數
│   └── utils.ts           # 通用函數
├── types/                 # TypeScript 型別
│   └── tool.ts            # 工具型別定義
└── public/                # 靜態資源
    └── icons/             # 圖標檔案
```

## 工具分類

- 程式碼編輯器 & IDE
- API 開發與測試
- 版本控制工具
- DevOps & CI/CD
- 資料庫工具
- 前端開發工具
- 後端開發框架
- 測試工具
- 效能監控
- 文件工具
- 設計協作工具
- 命令列工具

## 設計系統

採用單色設計系統，基於 Tailwind CSS 的 slate 色系：

- **主色調**: 灰階色系 (slate/gray/zinc)
- **間距**: 統一的 4px 基準間距系統
- **圓角**: 一致的圓角設計
- **陰影**: 分層的陰影系統
- **字體**: Inter 字體家族

## 開發指南

### 新增工具

在 `data/tools.json` 中新增工具資料：

```json
{
  "id": "unique-id",
  "name": "工具名稱",
  "description": "工具描述",
  "category": "工具分類",
  "tags": ["標籤1", "標籤2"],
  "url": "https://example.com",
  "pricing": "免費|付費|freemium",
  "platforms": ["Windows", "macOS", "Linux"],
  "featured": true
}
```

### 自訂樣式

在 `app/globals.css` 中使用 Tailwind 的 `@layer` 指令定義自訂樣式。

## 部署

### Vercel (推薦)

1. 將專案推送到 GitHub
2. 在 Vercel 中匯入專案
3. 自動部署完成

### 其他平台

```bash
npm run build
```

建構完成後，將 `out` 目錄部署到任何靜態託管服務。

## 授權

MIT License
