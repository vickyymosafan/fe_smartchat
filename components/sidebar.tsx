"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Plus, ChevronLeft, X, LogOut, Info } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useChatHistory } from "@/hooks/useChatHistory"
import HistoryItem from "./history-item"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { APP_CONFIG } from "@/lib/app-config"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onNewChat?: () => void
  refreshTrigger?: number
  onHistoryClick?: (sessionId: string) => void
  currentSessionId?: string | null
  appName?: string
  labels?: {
    newChat?: string
    history?: string
    about?: string
    logout?: string
    loading?: string
    emptyHistory?: string
  }
  showAbout?: boolean
  aboutConfig?: typeof APP_CONFIG.about
}

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  onNewChat, 
  refreshTrigger,
  onHistoryClick,
  currentSessionId,
  appName = APP_CONFIG.branding.appName,
  labels = {},
  showAbout = true,
  aboutConfig = APP_CONFIG.about,
}: SidebarProps) {
  const { logout } = useAuth()
  const { histories, isLoading, renameHistory, deleteHistory, refreshHistories } = useChatHistory()
  const [showAboutDialog, setShowAboutDialog] = useState(false)

  const sidebarLabels = {
    newChat: labels.newChat || APP_CONFIG.sidebar.newChatLabel,
    history: labels.history || APP_CONFIG.sidebar.historyLabel,
    about: labels.about || APP_CONFIG.sidebar.aboutLabel,
    logout: labels.logout || APP_CONFIG.sidebar.logoutLabel,
    loading: labels.loading || APP_CONFIG.sidebar.loadingText,
    emptyHistory: labels.emptyHistory || APP_CONFIG.chat.emptyHistoryText,
  }

  // Refresh histories when trigger changes (new chat created)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      refreshHistories()
    }
  }, [refreshTrigger, refreshHistories])

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat()
    }
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
          isOpen ? "w-64 sm:w-72 md:w-64" : "w-0 md:w-16"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen fixed md:sticky left-0 top-0 z-50 overflow-hidden`}
      >
      {/* Header Section */}
      <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-b border-sidebar-border flex items-center justify-between gap-2">
        {isOpen && (
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0 p-1">
              <img src="/smartchat4.png" alt="SmartChat Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm sm:text-base truncate">{appName}</span>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 hover:bg-sidebar-accent"
        >
          {isOpen ? (
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:hidden" />
          ) : null}
          <ChevronLeft className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 ${!isOpen && "rotate-180"} ${isOpen ? "hidden md:block" : ""}`} />
        </Button>
      </div>

      {/* Quick Create Button */}
      <div className="p-2 sm:p-2.5 md:p-3">
        <Button
          onClick={handleNewChat}
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-xs sm:text-sm"
          size="sm"
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          <span className={isOpen ? "" : "hidden"}>{sidebarLabels.newChat}</span>
        </Button>
      </div>

      {/* Conversations History */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-2.5 md:px-3 py-2">
        {isOpen ? (
          <div>
            <p className="text-[10px] sm:text-xs text-sidebar-foreground/60 font-semibold mb-2 sm:mb-2.5 md:mb-3 px-2">{sidebarLabels.history}</p>
            <div className="space-y-0.5 sm:space-y-1">
              {isLoading ? (
                <p className="text-[10px] sm:text-xs text-sidebar-foreground/40 px-2">{sidebarLabels.loading}</p>
              ) : histories.length === 0 ? (
                <p className="text-[10px] sm:text-xs text-sidebar-foreground/40 px-2">{sidebarLabels.emptyHistory}</p>
              ) : (
                histories.map((history) => (
                  <HistoryItem
                    key={history.id}
                    history={history}
                    onRename={async (id, title) => { await renameHistory(id, title) }}
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
        <div className="p-2 sm:p-2.5 md:p-3 space-y-1.5 sm:space-y-2 border-t border-sidebar-border">
          {/* About Button */}
          {showAbout && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAboutDialog(true)}
              className="w-full justify-start text-[10px] sm:text-xs hover:bg-sidebar-accent"
            >
              <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" />
              {sidebarLabels.about}
            </Button>
          )}
          
          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-[10px] sm:text-xs text-destructive hover:text-destructive hover:bg-destructive/10 active:scale-95 transition-transform"
          >
            <LogOut className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" />
            {sidebarLabels.logout}
          </Button>
        </div>
      )}

      {/* About Dialog */}
      {showAbout && (
        <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
          <DialogContent onClose={() => setShowAboutDialog(false)}>
            <DialogHeader>
              <DialogTitle>{aboutConfig.title}</DialogTitle>
              <DialogDescription>
                {aboutConfig.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              <div>
                <h3 className="font-semibold text-xs sm:text-sm mb-2 text-[#f5f5f5]">{aboutConfig.teamTitle}</h3>
                <div className="space-y-2 sm:space-y-3">
                  {aboutConfig.team.map((member) => (
                    <div key={member.id} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#2a2a2a]">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${member.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xs sm:text-sm font-semibold text-white">{member.initials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs sm:text-sm text-[#f5f5f5]">{member.name}</p>
                        <p className="text-[10px] sm:text-xs text-[#d0d0d0]">{member.role}</p>
                        <p className="text-[10px] sm:text-xs text-[#a0a0a0] mt-0.5 sm:mt-1">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-[#3a3a3a]">
                <p className="text-[10px] sm:text-xs text-[#a0a0a0] text-center">
                  {aboutConfig.copyright}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>
    </>
  )
}
