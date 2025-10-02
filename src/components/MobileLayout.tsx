import { useState } from "react";
import { ServerList } from "./ServerList";
import { ChannelList } from "./ChannelList";
import { ChatView } from "./ChatView";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Menu, Users } from "lucide-react";
export function MobileLayout() {
  const [isServersOpen, setServersOpen] = useState(false);
  const [isChannelsOpen, setChannelsOpen] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col">
      <Drawer direction="left" open={isServersOpen} onOpenChange={setServersOpen}>
        <DrawerContent className="w-20 h-full p-0 m-0">
          <ServerList />
        </DrawerContent>
      </Drawer>
      <Drawer direction="left" open={isChannelsOpen} onOpenChange={setChannelsOpen}>
        <DrawerContent className="w-64 h-full p-0 m-0">
          <ChannelList />
        </DrawerContent>
      </Drawer>
      <ChatView
        isMobile={true}
        onMenuClick={() => setServersOpen(true)}
        onUsersClick={() => setChannelsOpen(true)}
      />
    </div>
  );
}