import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
interface CreateChannelModalProps {
  setIsOpen: (isOpen: boolean) => void;
}
export function CreateChannelModal({ setIsOpen }: CreateChannelModalProps) {
  const createChannel = useChatStore((state) => state.createChannel);
  const selectedServerId = useChatStore((state) => state.selectedServerId);
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedServerId || isCreating) return;
    setIsCreating(true);
    try {
      await createChannel(selectedServerId, name.trim());
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create channel:", error);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <DialogContent className="bg-secondary border-none text-foreground">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center font-bold">
          Create Channel
        </DialogTitle>
        <DialogDescription className="text-center text-muted-foreground">
          Create a new text channel for your server.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground">
              Channel Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="new-channel"
              required
            />
          </div>
        </div>
        <DialogFooter className="bg-gray-800 px-6 py-4 rounded-b-lg">
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isCreating}>
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={!name.trim() || isCreating}>
            {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Channel
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}