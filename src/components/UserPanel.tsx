import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { Mic, Headset, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UserSettingsModal } from "./modals/UserSettingsModal";
export function UserPanel() {
  const currentUser = useChatStore((state) => state.currentUser);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  if (!currentUser) return null;
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  return (
    <div className="flex items-center justify-between p-2 bg-[rgb(30,31,34)]">
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
          <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">{currentUser.name}</span>
          <span className="text-xs text-gray-400">{currentUser.status}</span>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-700 hover:text-white">
          <Mic size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-700 hover:text-white">
          <Headset size={18} />
        </Button>
        <Dialog open={isSettingsOpen} onOpenChange={setSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Settings size={18} />
            </Button>
          </DialogTrigger>
          <UserSettingsModal setIsOpen={setSettingsOpen} />
        </Dialog>
      </div>
    </div>
  );
}