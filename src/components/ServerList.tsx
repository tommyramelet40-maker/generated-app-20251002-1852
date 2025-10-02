import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateServerModal } from "./modals/CreateServerModal";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
export function ServerList() {
  const servers = useChatStore((state) => state.servers);
  const selectedServerId = useChatStore((state) => state.selectedServerId);
  const selectServer = useChatStore((state) => state.selectServer);
  const [isCreateServerOpen, setCreateServerOpen] = useState(false);
  return (
    <nav className="w-20 bg-[rgb(30,31,34)] py-3 flex flex-col items-center space-y-3">
      <TooltipProvider delayDuration={50}>
        {servers.map((server) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => selectServer(server.id)}
                className="relative group focus:outline-none"
              >
                <div className={cn(
                  "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200 ease-in-out",
                  selectedServerId === server.id ? "h-10" : "h-2 group-hover:h-5"
                )} />
                <Avatar
                  className={cn(
                    "w-12 h-12 rounded-3xl group-hover:rounded-2xl transition-all duration-200 ease-in-out",
                    selectedServerId === server.id && "rounded-2xl"
                  )}
                >
                  <AvatarImage src={server.imageUrl} alt={server.name} className="object-cover" />
                  <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{server.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Separator className="w-8 bg-gray-600" />
        <Dialog open={isCreateServerOpen} onOpenChange={setCreateServerOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button className="focus:outline-none group">
                  <div className="w-12 h-12 rounded-3xl bg-gray-700 flex items-center justify-center group-hover:bg-green-600 group-hover:rounded-2xl transition-all duration-200 ease-in-out">
                    <Plus className="text-green-400 group-hover:text-white" />
                  </div>
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add a Server</p>
            </TooltipContent>
          </Tooltip>
          <CreateServerModal setIsOpen={setCreateServerOpen} />
        </Dialog>
      </TooltipProvider>
    </nav>
  );
}