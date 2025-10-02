import { IndexedEntity } from "./core-utils";
import type { User, Server, Channel, ChatMessage } from "@shared/types";
import { MOCK_USERS, MOCK_SERVERS, MOCK_CHANNELS, MOCK_MESSAGES } from "@shared/mock-data";
// USER ENTITY
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", avatarUrl: "", status: "offline" };
  static seedData = MOCK_USERS;
}
// SERVER ENTITY
export class ServerEntity extends IndexedEntity<Server> {
  static readonly entityName = "server";
  static readonly indexName = "servers";
  static readonly initialState: Server = { id: "", name: "", imageUrl: "" };
  static seedData = MOCK_SERVERS;
}
// CHANNEL ENTITY
export class ChannelEntity extends IndexedEntity<Channel> {
  static readonly entityName = "channel";
  static readonly indexName = "channels";
  static readonly initialState: Channel = { id: "", name: "", type: "text", serverId: "" };
  static seedData = MOCK_CHANNELS;
}
// MESSAGE ENTITY
export class MessageEntity extends IndexedEntity<ChatMessage> {
  static readonly entityName = "message";
  static readonly indexName = "messages";
  static readonly initialState: ChatMessage = { id: "", channelId: "", authorId: "", content: "", timestamp: "" };
  static seedData = MOCK_MESSAGES;
}