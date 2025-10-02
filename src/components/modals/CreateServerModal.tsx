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
interface CreateServerModalProps {
  setIsOpen: (isOpen: boolean) => void;
}
export function CreateServerModal({ setIsOpen }: CreateServerModalProps) {
  const createServer = useChatStore((state) => state.createServer);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isCreating) return;
    setIsCreating(true);
    try {
      await createServer(name.trim(), imageUrl.trim());
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create server:", error);
      // Optionally, show an error toast to the user
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <DialogContent className="bg-secondary border-none text-foreground">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center font-bold">
          Create Your Sphere
        </DialogTitle>
        <DialogDescription className="text-center text-muted-foreground">
          Give your new community a personality with a name and an icon.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase text-muted-foreground">
              Server Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter a server name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-xs font-bold uppercase text-muted-foreground">
              Image URL (Optional)
            </Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-background border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="https://example.com/icon.png"
            />
          </div>
        </div>
        <DialogFooter className="bg-gray-800 px-6 py-4 rounded-b-lg">
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isCreating}>
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={!name.trim() || isCreating}>
            {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}