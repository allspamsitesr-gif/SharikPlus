import { Metadata } from 'next'
import { ModernSidebar } from '@/components/admin/modern-sidebar'
import { ModernHeader } from '@/components/admin/modern-header'

export const metadata: Metadata = {
  title: {
    template: '%s | SharikPlus Admin',
    default: 'Админ панель | SharikPlus',
  },
  description: 'Современная административная панель интернет-магазина воздушных шаров SharikPlus',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ModernSidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ModernHeader />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}