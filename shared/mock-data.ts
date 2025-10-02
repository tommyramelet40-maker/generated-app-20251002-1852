import type { User, Server, Channel, ChatMessage } from './types';
export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'CloudflareFan', avatarUrl: 'https://i.pravatar.cc/40?u=user-1', status: 'online' },
  { id: 'user-2', name: 'WorkerBee', avatarUrl: 'https://i.pravatar.cc/40?u=user-2', status: 'idle' },
  { id: 'user-3', name: 'DurableDev', avatarUrl: 'https://i.pravatar.cc/40?u=user-3', status: 'dnd' },
];
export const MOCK_SERVERS: Server[] = [
  { id: 'server-1', name: 'Cloudflare HQ', imageUrl: 'https://pbs.twimg.com/profile_images/1732845373617090560/5-gXm33a_400x400.jpg' },
  { id: 'server-2', name: 'Workers Devs', imageUrl: 'https://workers.cloudflare.com/resources/logo/logo.svg' },
  { id: 'server-3', name: 'Gaming Sphere', imageUrl: 'https://static.vecteezy.com/system/resources/previews/022/129/831/original/fortnite-logo-on-transparent-background-free-vector.jpg' },
];
export const MOCK_CHANNELS: Channel[] = [
  { id: 'channel-1', name: 'general', type: 'text', serverId: 'server-1' },
  { id: 'channel-2', name: 'announcements', type: 'text', serverId: 'server-1' },
  { id: 'channel-3', name: 'dev-chat', type: 'text', serverId: 'server-2' },
  { id: 'channel-4', name: 'help-forum', type: 'text', serverId: 'server-2' },
  { id: 'channel-5', name: 'lobby', type: 'text', serverId: 'server-3' },
  { id: 'channel-6', name: 'matchmaking', type: 'text', serverId: 'server-3' },
];
export const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'msg-1', channelId: 'channel-1', authorId: 'user-2', content: 'Hey everyone, welcome to ConnectSphere!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'msg-2', channelId: 'channel-1', authorId: 'user-3', content: 'This UI is so clean!', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
  { id: 'msg-3', channelId: 'channel-1', authorId: 'user-1', content: 'I know right? Built with Cloudflare Workers!', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
  { id: 'msg-4', channelId: 'channel-3', authorId: 'user-2', content: 'Anyone facing issues with the latest wrangler version?', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 'msg-5', channelId: 'channel-5', authorId: 'user-3', content: 'LFG! Who is up for a match?', timestamp: new Date(Date.now() - 1000 * 30).toISOString() },
];