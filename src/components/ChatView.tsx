import { useChatStore } from "@/store/chatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Message } from "./Message";
import { Hash, Send, Menu, Users } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState, useEffect, useRef } from "react";
interface ChatViewProps {
  isMobile?: boolean;
  onMenuClick?: () => void;
  onUsersClick?: () => void;
}
export function ChatView({ isMobile = false, onMenuClick, onUsersClick }: ChatViewProps) {
  const selectedChannelId = useChatStore((state) => state.selectedChannelId);
  const channels = useChatStore((state) => state.channels);
  const messages = useChatStore((state) => state.messages);
  const currentUser = useChatStore((state) => state.currentUser);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const startPollingMessages = useChatStore((state) => state.startPollingMessages);
  const stopPollingMessages = useChatStore((state) => state.stopPollingMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const channel = channels.find(c => c.id === selectedChannelId);
  const channelMessages = messages.filter(m => m.channelId === selectedChannelId);
  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      const isScrolledToBottom = scrollAreaViewportRef.current.scrollHeight - scrollAreaViewportRef.current.scrollTop <= scrollAreaViewportRef.current.clientHeight + 1;
      if (isScrolledToBottom) {
        setTimeout(() => {
          scrollAreaViewportRef.current?.scrollTo({ top: scrollAreaViewportRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [channelMessages]);
  useEffect(() => {
    if (selectedChannelId) {
      startPollingMessages(selectedChannelId);
    }
    return () => {
      stopPollingMessages();
    };
  }, [selectedChannelId, startPollingMessages, stopPollingMessages]);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChannelId && currentUser) {
      await sendMessage({
        channelId: selectedChannelId,
        authorId: currentUser.id,
        content: newMessage.trim(),
      });
      setNewMessage("");
    }
  };
  if (!channel) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[rgb(49,51,56)] text-muted-foreground">
        {isMobile && (
          <header className="w-full flex items-center p-2 border-b border-black/20 shadow-sm">
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu />
            </Button>
          </header>
        )}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <p className="text-lg">Select a channel to start chatting.</p>
          <p className="text-sm text-gray-400">Or, find a server and join the conversation!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col bg-[rgb(49,51,56)]">
      <header className="flex items-center p-2 md:p-4 border-b border-black/20 shadow-sm">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
            <Menu />
          </Button>
        )}
        <Hash className="text-gray-500" size={24} />
        <h2 className="ml-2 text-lg font-semibold text-white truncate">{channel.name}</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onUsersClick} className="ml-auto">
            <Users />
          </Button>
        )}
      </header>
      <div className="flex-1 flex flex-col-reverse overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4" ref={scrollAreaViewportRef}>
            {channelMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="px-4 pb-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="bg-gray-700 border-none text-white placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-600">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}