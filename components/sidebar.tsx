"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Settings, HelpCircle, Search, Plus, ChevronLeft, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface Conversation {
  id: string
  title: string
  date: string
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Diskusi React Hooks", date: "Hari ini" },
    { id: "2", title: "Tutorial Next.js", date: "Kemarin" },
    { id: "3", title: "Tailwind CSS Tips", date: "3 hari lalu" },
    { id: "4", title: "Database Design", date: "1 minggu lalu" },
    { id: "5", title: "API REST Best Practices", date: "1 minggu lalu" },
  ])

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen sticky left-0 top-0`}
    >
      {/* Header Section */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between gap-2">
        {isOpen && (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-sidebar-primary" />
            </div>
            <span className="font-semibold text-sidebar-foreground text-sm">Smartchat</span>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 flex-shrink-0 hover:bg-sidebar-accent"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${!isOpen && "rotate-180"}`} />
        </Button>
      </div>

      {/* Quick Create Button */}
      <div className="p-3">
        <Button
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className={isOpen ? "" : "hidden"}>Percakapan Baru</span>
        </Button>
      </div>

      {/* Conversations History */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {isOpen && (
          <div>
            <p className="text-xs text-sidebar-foreground/60 font-semibold mb-3 px-2">RIWAYAT</p>
            <div className="space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="group relative p-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
                >
                  <p className="text-sm text-sidebar-foreground line-clamp-1">{conv.title}</p>
                  <p className="text-xs text-sidebar-foreground/50">{conv.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="flex items-center justify-center h-full">
            <MessageCircle className="h-6 w-6 text-sidebar-foreground/40" />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-sidebar-border" />

      {/* Footer Section */}
      <div className="p-3 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className={isOpen ? "" : "hidden"}>Settings</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className={isOpen ? "" : "hidden"}>Get Help</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Search className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className={isOpen ? "" : "hidden"}>Search</span>
        </Button>
      </div>

      {/* User Profile Section */}
      {isOpen && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-sidebar-primary">SC</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Shadcn</p>
                <p className="text-xs text-sidebar-foreground/60">shadcn@example.com</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-sidebar-accent">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
