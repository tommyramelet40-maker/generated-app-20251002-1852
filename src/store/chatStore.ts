import { create } from 'zustand';
import { User, Server, Channel, ChatMessage } from '@shared/types';
import { api } from '@/lib/api-client';
interface ChatState {
  currentUser: User | null;
  servers: Server[];
  channels: Channel[];
  messages: ChatMessage[];
  users: Record<string, User>;
  selectedServerId: string | null;
  selectedChannelId: string | null;
  isLoading: boolean;
  error: string | null;
  pollingIntervalId: number | null;
  fetchInitialData: () => Promise<void>;
  selectServer: (serverId: string) => void;
  selectChannel: (channelId: string) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => Promise<void>;
  startPollingMessages: (channelId: string) => void;
  stopPollingMessages: () => void;
  createServer: (name: string, imageUrl?: string) => Promise<void>;
  createChannel: (serverId: string, name: string) => Promise<void>;
}
export const useChatStore = create<ChatState>((set, get) => ({
  currentUser: null,
  servers: [],
  channels: [],
  messages: [],
  users: {},
  selectedServerId: null,
  selectedChannelId: null,
  isLoading: true,
  error: null,
  pollingIntervalId: null,
  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api<{
        users: User[];
        servers: Server[];
        channels: Channel[];
        messages: ChatMessage[];
      }>('/api/initial-data');
      const usersMap = data.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, User>);
      const firstServer = data.servers[0];
      const firstChannel = firstServer ? data.channels.find(c => c.serverId === firstServer.id) : null;
      set({
        users: usersMap,
        servers: data.servers,
        channels: data.channels,
        messages: data.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
        currentUser: data.users[0] || null,
        selectedServerId: firstServer?.id || null,
        selectedChannelId: firstChannel?.id || null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
      set({ isLoading: false, error: "Failed to load chat data." });
    }
  },
  selectServer: (serverId) => set(state => {
    const firstChannelOfServer = state.channels.find(c => c.serverId === serverId);
    return { selectedServerId: serverId, selectedChannelId: firstChannelOfServer?.id || null };
  }),
  selectChannel: (channelId) => set({ selectedChannelId: channelId }),
  sendMessage: async (message) => {
    try {
      const newMessage = await api<ChatMessage>(`/api/channels/${message.channelId}/messages`, {
        method: 'POST',
        body: JSON.stringify({
          authorId: message.authorId,
          content: message.content,
        }),
      });
      set(state => ({
        messages: [...state.messages, newMessage]
      }));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },
  startPollingMessages: (channelId) => {
    get().stopPollingMessages(); // Stop any existing polling
    const intervalId = setInterval(async () => {
      try {
        const messages = get().messages;
        const lastTimestamp = messages.length > 0 ? messages[messages.length - 1].timestamp : new Date(0).toISOString();
        const newMessages = await api<ChatMessage[]>(`/api/channels/${channelId}/messages/updates?since=${encodeURIComponent(lastTimestamp)}`);
        if (newMessages.length > 0) {
          set(state => ({
            messages: [...state.messages, ...newMessages].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
          }));
        }
      } catch (error) {
        console.error("Polling error:", error);
        get().stopPollingMessages();
      }
    }, 3000);
    set({ pollingIntervalId: intervalId as unknown as number });
  },
  stopPollingMessages: () => {
    const intervalId = get().pollingIntervalId;
    if (intervalId) {
      clearInterval(intervalId);
      set({ pollingIntervalId: null });
    }
  },
  createServer: async (name, imageUrl) => {
    try {
      const { server, channel } = await api<{ server: Server, channel: Channel }>('/api/servers', {
        method: 'POST',
        body: JSON.stringify({ name, imageUrl }),
      });
      set(state => ({
        servers: [...state.servers, server],
        channels: [...state.channels, channel],
        selectedServerId: server.id,
        selectedChannelId: channel.id,
      }));
    } catch (error) {
      console.error("Failed to create server:", error);
      throw error;
    }
  },
  createChannel: async (serverId, name) => {
    try {
      const newChannel = await api<Channel>(`/api/servers/${serverId}/channels`, {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      set(state => ({
        channels: [...state.channels, newChannel],
        selectedChannelId: newChannel.id,
      }));
    } catch (error) {
      console.error("Failed to create channel:", error);
      throw error;
    }
  },
}));