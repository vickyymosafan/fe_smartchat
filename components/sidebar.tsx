"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Plus, ChevronLeft, MoreHorizontal, X, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { logout } = useAuth()

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
      <div className="p-3 md:p-4 border-b border-sidebar-border flex items-center justify-between gap-2">
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
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-xs md:text-sm"
          size="sm"
        >
          <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
          <span className={isOpen ? "" : "hidden"}>Percakapan Baru</span>
        </Button>
      </div>

      {/* Conversations History */}
      <div className="flex-1 overflow-y-auto px-2 md:px-3 py-2">
        {isOpen && (
          <div>
            <p className="text-[10px] md:text-xs text-sidebar-foreground/60 font-semibold mb-2 md:mb-3 px-2">RIWAYAT</p>
            <div className="space-y-1">
              {/* Conversations will be displayed here */}
            </div>
          </div>
        )}
      </div>

      {/* User Profile Section */}
      {isOpen && (
        <div className="p-2 md:p-3 space-y-2">
          <div className="flex items-center justify-between p-1.5 md:p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] md:text-xs font-semibold text-sidebar-primary">SC</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-sidebar-foreground truncate">SmartChat</p>
                <p className="text-[10px] md:text-xs text-sidebar-foreground/60 truncate">Authenticated</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5 md:h-6 md:w-6 hover:bg-sidebar-accent flex-shrink-0">
              <MoreHorizontal className="h-2.5 w-2.5 md:h-3 md:w-3" />
            </Button>
          </div>
          
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
      </div>
    </>
  )
}
