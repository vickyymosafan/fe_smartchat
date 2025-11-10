"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Plus, ChevronLeft, X, LogOut, Info } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useChatHistory } from "@/hooks/useChatHistory"
import HistoryItem from "./history-item"
import { resetSessionId } from "@/lib/session"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onNewChat?: () => void
  refreshTrigger?: number
  onHistoryClick?: (sessionId: string) => void
  currentSessionId?: string | null
}

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  onNewChat, 
  refreshTrigger,
  onHistoryClick,
  currentSessionId 
}: SidebarProps) {
  const { logout } = useAuth()
  const { histories, isLoading, renameHistory, deleteHistory, refreshHistories } = useChatHistory()
  const [showAboutDialog, setShowAboutDialog] = useState(false)

  // Refresh histories when trigger changes (new chat created)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      refreshHistories()
    }
  }, [refreshTrigger, refreshHistories])

  const handleNewChat = () => {
    resetSessionId()
    if (onNewChat) {
      onNewChat()
    }
    // Don't reload page, just reset state
  }

  return (
    <>
      {/* Backdrop overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      <div
        className={`${
          isOpen ? "w-64" : "w-0 md:w-16"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen fixed md:sticky left-0 top-0 z-50 overflow-hidden`}
      >
      {/* Header Section */}
      <div className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 border-b border-sidebar-border flex items-center justify-between gap-2">
        {isOpen && (
          <div className="flex items-center gap-2 md:gap-3 flex-1">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-sidebar-primary" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm md:text-base">Smartchat</span>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0 hover:bg-sidebar-accent"
        >
          {isOpen ? (
            <X className="h-3.5 w-3.5 md:h-4 md:w-4 md:hidden" />
          ) : null}
          <ChevronLeft className={`h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 ${!isOpen && "rotate-180"} ${isOpen ? "hidden md:block" : ""}`} />
        </Button>
      </div>

      {/* Quick Create Button */}
      <div className="p-2 md:p-3">
        <Button
          onClick={handleNewChat}
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-xs md:text-sm"
          size="sm"
        >
          <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
          <span className={isOpen ? "" : "hidden"}>Percakapan Baru</span>
        </Button>
      </div>

      {/* Conversations History */}
      <div className="flex-1 overflow-y-auto px-2 md:px-3 py-2">
        {isOpen ? (
          <div>
            <p className="text-[10px] md:text-xs text-sidebar-foreground/60 font-semibold mb-2 md:mb-3 px-2">RIWAYAT</p>
            <div className="space-y-1">
              {isLoading ? (
                <p className="text-xs text-sidebar-foreground/40 px-2">Loading...</p>
              ) : histories.length === 0 ? (
                <p className="text-xs text-sidebar-foreground/40 px-2">Belum ada riwayat</p>
              ) : (
                histories.map((history) => (
                  <HistoryItem
                    key={history.id}
                    history={history}
                    onRename={renameHistory}
                    onDelete={deleteHistory}
                    onHistoryClick={(h) => onHistoryClick?.(h.sessionId)}
                    isActive={history.sessionId === currentSessionId}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col items-center gap-2">
            {isLoading ? (
              <div className="w-10 h-10 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-sidebar-foreground/20 border-t-sidebar-primary rounded-full animate-spin" />
              </div>
            ) : histories.length === 0 ? (
              <div className="text-center py-4">
                <MessageCircle className="h-5 w-5 text-sidebar-foreground/30 mx-auto" />
              </div>
            ) : (
              histories.map((history) => (
                <Button
                  key={history.id}
                  variant="ghost"
                  size="icon"
                  onClick={() => onHistoryClick?.(history.sessionId)}
                  className={`w-10 h-10 hover:bg-sidebar-accent ${
                    history.sessionId === currentSessionId ? "bg-sidebar-accent" : ""
                  }`}
                  title={history.title}
                >
                  <MessageCircle className="h-5 w-5 text-sidebar-foreground/60" />
                </Button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      {isOpen && (
        <div className="p-2 md:p-3 space-y-2 border-t border-sidebar-border">
          {/* About Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAboutDialog(true)}
            className="w-full justify-start text-xs hover:bg-sidebar-accent"
          >
            <Info className="h-3.5 w-3.5 mr-2" />
            Tentang
          </Button>
          
          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Logout
          </Button>
        </div>
      )}

      {/* About Dialog */}
      <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
        <DialogContent onClose={() => setShowAboutDialog(false)}>
          <DialogHeader>
            <DialogTitle>Tentang Smartchat</DialogTitle>
            <DialogDescription>
              Chatbot cerdas untuk informasi Universitas Muhammadiyah Jember
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-sm mb-2 text-[#f5f5f5]">Tim Pengembang</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2a2a2a]">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-white">VM</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#f5f5f5]">Vickymosafan</p>
                    <p className="text-xs text-[#d0d0d0]">Developer & Dataset PMB</p>
                    <p className="text-xs text-[#a0a0a0] mt-1">
                      Mengumpulkan dataset dari PMB Universitas Muhammadiyah Jember
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2a2a2a]">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-white">AR</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#f5f5f5]">Adrian Reswara</p>
                    <p className="text-xs text-[#d0d0d0]">Dataset Collector</p>
                    <p className="text-xs text-[#a0a0a0] mt-1">
                      Mengumpulkan dataset dari unmuhjember.ac.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#3a3a3a]">
              <p className="text-xs text-[#a0a0a0] text-center">
                © 2025 Smartchat - Universitas Muhammadiyah Jember
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  )
}
