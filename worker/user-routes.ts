import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ServerEntity, ChannelEntity, MessageEntity } from "./entities";
import { ok, bad, isStr } from './core-utils';
import { Channel, ChatMessage, Server } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // --- SEEDING (for development) ---
  app.post('/api/seed', async (c) => {
    await UserEntity.ensureSeed(c.env);
    await ServerEntity.ensureSeed(c.env);
    await ChannelEntity.ensureSeed(c.env);
    await MessageEntity.ensureSeed(c.env);
    return ok(c, { seeded: true });
  });
  // --- DATA FETCHING ROUTES ---
  app.get('/api/initial-data', async (c) => {
    await UserEntity.ensureSeed(c.env);
    await ServerEntity.ensureSeed(c.env);
    await ChannelEntity.ensureSeed(c.env);
    await MessageEntity.ensureSeed(c.env);
    const [users, servers, channels, messages] = await Promise.all([
      UserEntity.list(c.env).then(p => p.items),
      ServerEntity.list(c.env).then(p => p.items),
      ChannelEntity.list(c.env).then(p => p.items),
      MessageEntity.list(c.env).then(p => p.items),
    ]);
    return ok(c, { users, servers, channels, messages });
  });
  // --- MESSAGE POLLING ---
  app.get('/api/channels/:channelId/messages/updates', async (c) => {
    const channelId = c.req.param('channelId');
    const since = c.req.query('since');
    if (!since) return bad(c, 'since query parameter is required');
    const allMessages = await MessageEntity.list(c.env).then(p => p.items);
    const sinceDate = new Date(since);
    const newMessages = allMessages
      .filter(m => m.channelId === channelId && new Date(m.timestamp) > sinceDate)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    return ok(c, newMessages);
  });
  // --- MESSAGE POSTING ---
  app.post('/api/channels/:channelId/messages', async (c) => {
    const channelId = c.req.param('channelId');
    const { authorId, content } = (await c.req.json()) as { authorId?: string; content?: string };
    if (!isStr(authorId) || !isStr(content)) {
      return bad(c, 'authorId and content are required');
    }
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      channelId,
      authorId,
      content,
      timestamp: new Date().toISOString(),
    };
    const createdMessage = await MessageEntity.create(c.env, message);
    return ok(c, createdMessage);
  });
  // --- SERVER CREATION ---
  app.post('/api/servers', async (c) => {
    const { name, imageUrl } = (await c.req.json()) as { name?: string; imageUrl?: string };
    if (!isStr(name)) return bad(c, 'Server name is required');
    const newServer: Server = {
      id: crypto.randomUUID(),
      name,
      imageUrl: imageUrl || `https://i.pravatar.cc/128?u=${name}`,
    };
    const createdServer = await ServerEntity.create(c.env, newServer);
    const defaultChannel: Channel = {
      id: crypto.randomUUID(),
      name: 'general',
      type: 'text',
      serverId: newServer.id,
    };
    const createdChannel = await ChannelEntity.create(c.env, defaultChannel);
    return ok(c, { server: createdServer, channel: createdChannel });
  });
  // --- CHANNEL CREATION ---
  app.post('/api/servers/:serverId/channels', async (c) => {
    const serverId = c.req.param('serverId');
    const { name } = (await c.req.json()) as { name?: string };
    if (!isStr(name)) return bad(c, 'Channel name is required');
    const newChannel: Channel = {
      id: crypto.randomUUID(),
      name: name.toLowerCase().replace(/\s+/g, '-'),
      type: 'text',
      serverId,
    };
    const createdChannel = await ChannelEntity.create(c.env, newChannel);
    return ok(c, createdChannel);
  });
}