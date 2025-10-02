import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chatStore";
import { ChatMessage as MessageType } from "@shared/types";
import { format } from "date-fns";
import { motion } from "framer-motion";
interface MessageProps {
  message: MessageType;
}
export function Message({ message }: MessageProps) {
  const getUserById = useChatStore((state) => state.users[message.authorId]);
  const author = getUserById;
  if (!author) return null;
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-start space-x-4 p-2 rounded-md hover:bg-gray-900/50 transition-colors duration-200"
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src={author.avatarUrl} alt={author.name} />
        <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-2">
          <span className="font-semibold text-white">{author.name}</span>
          <span className="text-xs text-gray-500">
            {format(new Date(message.timestamp), "MM/dd/yyyy HH:mm")}
          </span>
        </div>
        <p className="text-gray-300 font-medium">{message.content}</p>
      </div>
    </motion.div>
  );
}