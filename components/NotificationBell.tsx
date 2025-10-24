'use client'

import { useState, useEffect } from 'react'
import { Bell, X, Download, Smartphone } from 'lucide-react'

interface Notification {
  id: string
  type: 'pwa-install'
  title: string
  message: string
  timestamp: number
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 始終顯示 PWA 安裝通知
    const checkPWAInstallNotification = () => {
      const pwaNotification: Notification = {
        id: 'pwa-install-notification',
        type: 'pwa-install',
        title: '安裝 DevKit',
        message: '將 DevKit 安裝到你的設備上，獲得更好的使用體驗',
        timestamp: Date.now()
      }
      
      setNotifications([pwaNotification])
    }

    checkPWAInstallNotification()

    // 監聽 PWA 安裝事件
    const handleAppInstalled = () => {
      // 清除 PWA 安裝通知
      setNotifications(prev => prev.filter(n => n.type !== 'pwa-install'))
      localStorage.removeItem('pwa-install-moved-to-bell')
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    // 觸發 PWA 安裝
    const event = new CustomEvent('trigger-pwa-install')
    window.dispatchEvent(event)
    
    // 移除通知
    setNotifications(prev => prev.filter(n => n.type !== 'pwa-install'))
    localStorage.removeItem('pwa-install-moved-to-bell')
  }

  const handleDismissNotification = (notificationId: string) => {
    // 如果是 PWA 安裝通知，不移除，只記錄用戶已查看
    if (notificationId === 'pwa-install-notification') {
      localStorage.setItem('pwa-install-viewed', 'true')
      // 不移除通知，保持固定在鈴鐺中
      return
    }
    
    // 其他通知正常移除
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const handleBellClick = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* 鈴鐺圖標 */}
      <button
        onClick={handleBellClick}
        className="relative p-2 text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {/* 通知白點 - 只在有通知時顯示 */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-gray-100 rounded-full border border-gray-300 dark:border-gray-600"></span>
        )}
      </button>

      {/* 通知下拉選單 - 只在有通知時顯示 */}
      {isOpen && notifications.length > 0 && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={handleCloseDropdown}
          />
          
          {/* 通知面板 */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  通知
                </h3>
                <button
                  onClick={handleCloseDropdown}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                          {notification.message}
                        </p>
                        
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={handleInstallClick}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-md transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            安裝
                          </button>
                          
                          {notification.id === 'pwa-install-notification' ? (
                            <button
                              onClick={() => handleDismissNotification(notification.id)}
                              className="px-3 py-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-xs font-medium rounded-md transition-colors"
                            >
                              稍後
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDismissNotification(notification.id)}
                              className="px-3 py-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-xs font-medium rounded-md transition-colors"
                            >
                              忽略
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
