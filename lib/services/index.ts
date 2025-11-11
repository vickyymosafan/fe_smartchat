/**
 * Service layer exports
 * Centralized access to all service instances
 */

export { chatService } from "./chat-service"
export { chatHistoryService } from "./chat-history-service"

export type { IChatService, IChatHistoryService } from "@/types/services"
