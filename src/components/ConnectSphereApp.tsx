import { useEffect } from "react";
import { ServerList } from "./ServerList";
import { ChannelList } from "./ChannelList";
import { ChatView } from "./ChatView";
import { useChatStore } from "@/store/chatStore";
import { ServerListSkeleton, ChannelListSkeleton, ChatViewSkeleton } from "./skeletons/ConnectSphereSkeletons";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "./MobileLayout";
export function ConnectSphereApp() {
  const fetchInitialData = useChatStore((state) => state.fetchInitialData);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen bg-background text-foreground">
        <ServerListSkeleton />
        <ChannelListSkeleton />
        <ChatViewSkeleton />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-destructive-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-400">{error}</p>
          <p className="mt-4 text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return <MobileLayout />;
  }
  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <ServerList />
      <ChannelList />
      <ChatView />
    </div>
  );
}