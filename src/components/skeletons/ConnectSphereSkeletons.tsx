import { Skeleton } from "@/components/ui/skeleton";
import { Hash } from "lucide-react";
export function ServerListSkeleton() {
  return (
    <div className="w-20 bg-[rgb(30,31,34)] py-3 flex flex-col items-center space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="w-12 h-12 rounded-full" />
      ))}
    </div>
  );
}
export function ChannelListSkeleton() {
  return (
    <div className="w-64 bg-[rgb(43,45,49)] flex flex-col">
      <header className="p-4 border-b border-black/20 shadow-sm">
        <Skeleton className="h-6 w-3/4 rounded" />
      </header>
      <div className="flex-1 p-2 space-y-4">
        <Skeleton className="h-4 w-1/2 rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-2 bg-[rgb(30,31,34)]">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
export function ChatViewSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-[rgb(49,51,56)]">
      <header className="flex items-center p-4 border-b border-black/20 shadow-sm">
        <Hash className="text-gray-700" size={24} />
        <Skeleton className="h-6 w-40 ml-2 rounded" />
      </header>
      <div className="flex-1 p-4 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48 rounded" />
              <Skeleton className="h-4 w-64 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}