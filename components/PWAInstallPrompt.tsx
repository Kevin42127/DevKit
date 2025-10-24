'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // 監聽 beforeinstallprompt 事件，保存 deferredPrompt 供鈴鐺使用
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    // 監聽從鈴鐺觸發的安裝事件
    const handleTriggerInstall = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        
        if (outcome === 'accepted') {
          console.log('用戶接受了安裝提示')
        } else {
          console.log('用戶拒絕了安裝提示')
        }
        
        setDeferredPrompt(null)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('trigger-pwa-install', handleTriggerInstall)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('trigger-pwa-install', handleTriggerInstall)
    }
  }, [deferredPrompt])

  // 不再渲染任何 UI，只處理事件
  return null
}