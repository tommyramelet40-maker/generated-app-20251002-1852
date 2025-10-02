export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}
export interface Server {
  id: string;
  name: string;
  imageUrl: string;
}
export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  serverId: string;
}
export interface ChatMessage {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  timestamp: string; // ISO 8601 string
}