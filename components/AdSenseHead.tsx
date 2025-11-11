'use client';

import { useEffect } from 'react';

export default function AdSenseHead() {
  useEffect(() => {
    // 立即檢查並添加腳本，不等待其他資源加載
    if (typeof window !== 'undefined' && document.head) {
      // 檢查腳本是否已經存在，避免重複添加
      const existingScript = document.querySelector(
        'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
      );

      if (!existingScript) {
        // 創建並添加 AdSense 腳本到 head
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7335462712833157';
        script.setAttribute('crossorigin', 'anonymous');
        // 將腳本添加到 head 的開頭，確保盡早加載
        document.head.insertBefore(script, document.head.firstChild);
      }
    }
  }, []);

  return null;
}

