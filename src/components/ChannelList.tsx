import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPanel } from "./UserPanel";
import { Hash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateChannelModal } from "./modals/CreateChannelModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function ChannelList() {
  const selectedServerId = useChatStore((state) => state.selectedServerId);
  const servers = useChatStore((state) => state.servers);
  const channels = useChatStore((state) => state.channels);
  const selectedChannelId = useChatStore((state) => state.selectedChannelId);
  const selectChannel = useChatStore((state) => state.selectChannel);
  const [isCreateChannelOpen, setCreateChannelOpen] = useState(false);
  const server = servers.find(s => s.id === selectedServerId);
  const serverChannels = channels.filter(c => c.serverId === selectedServerId);
  if (!server) return <div className="w-64 bg-[rgb(43,45,49)] flex flex-col" />;
  return (
    <div className="w-64 bg-[rgb(43,45,49)] flex flex-col">
      <header className="p-4 border-b border-black/20 shadow-sm">
        <h1 className="text-lg font-semibold text-white truncate">{server.name}</h1>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-bold uppercase text-gray-400">Text Channels</h2>
            <Dialog open={isCreateChannelOpen} onOpenChange={setCreateChannelOpen}>
              <TooltipProvider delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <button className="text-gray-400 hover:text-white">
                        <Plus size={16} />
                      </button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Create Channel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CreateChannelModal setIsOpen={setCreateChannelOpen} />
            </Dialog>
          </div>
          {serverChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => selectChannel(channel.id)}
              className={cn(
                "w-full flex items-center space-x-2 px-2 py-1 rounded-md text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors duration-150",
                selectedChannelId === channel.id && "bg-gray-700 text-white"
              )}
            >
              <Hash size={20} />
              <span className="font-medium truncate">{channel.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
      <UserPanel />
    </div>
  );
}