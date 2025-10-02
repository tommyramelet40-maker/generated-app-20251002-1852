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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
interface UserSettingsModalProps {
  setIsOpen: (isOpen: boolean) => void;
}
export function UserSettingsModal({ setIsOpen }: UserSettingsModalProps) {
  const currentUser = useChatStore((state) => state.currentUser);
  if (!currentUser) return null;
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  return (
    <DialogContent className="bg-secondary border-none text-foreground max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">User Settings</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Manage your account settings.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="text-3xl">{getInitials(currentUser.name)}</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase text-muted-foreground">
            Username
          </Label>
          <Input id="username" defaultValue={currentUser.name} className="bg-background border-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-xs font-bold uppercase text-muted-foreground">
            Status
          </Label>
          <Select defaultValue={currentUser.status}>
            <SelectTrigger className="w-full bg-background border-none">
              <SelectValue placeholder="Set a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
              <SelectItem value="dnd">Do Not Disturb</SelectItem>
              <SelectItem value="offline">Invisible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="bg-gray-800 px-6 py-4 rounded-b-lg">
        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" variant="default" onClick={() => setIsOpen(false)}>
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}