import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, Smile, MoreVertical, ArrowLeft, Video, Phone, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  read: boolean;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  service?: string;
  messages: Message[];
};

const MessagesPage = () => {
  const { profile, user } = useAuth();
  const [conversations] = useState<Conversation[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.service?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConvo) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };
    setMessages(prev => ({
      ...prev,
      [selectedConvo.id]: [...(prev[selectedConvo.id] || []), msg],
    }));
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentMessages = selectedConvo ? messages[selectedConvo.id] || [] : [];
  const myInitials = profile?.display_name?.slice(0, 2).toUpperCase()
    || user?.email?.split("@")[0]?.slice(0, 2).toUpperCase()
    || "ME";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="flex gap-1 rounded-xl border border-border bg-card shadow-card overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
          {/* Sidebar */}
          <div className={cn(
            "w-full md:w-80 border-r border-border flex flex-col shrink-0",
            mobileShowChat && "hidden md:flex"
          )}>
            {/* Header */}
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-display font-bold text-foreground mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 h-9 bg-muted border-0 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Conversations list */}
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">No conversations yet</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {searchQuery
                      ? "No conversations match your search."
                      : "Start by hiring a freelancer or contacting a seller."}
                  </p>
                  {!searchQuery && (
                    <Link to="/search">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                        Browse Freelancers
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                filteredConversations.map(convo => (
                  <button
                    key={convo.id}
                    className={cn(
                      "w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left",
                      selectedConvo?.id === convo.id && "bg-primary/5 border-l-2 border-l-primary"
                    )}
                    onClick={() => {
                      setSelectedConvo(convo);
                      setMobileShowChat(true);
                    }}
                  >
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {convo.avatar}
                      </div>
                      {convo.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-sm font-semibold text-foreground truncate">{convo.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{convo.time}</span>
                      </div>
                      {convo.service && (
                        <p className="text-xs text-primary truncate mb-0.5">{convo.service}</p>
                      )}
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                        {convo.unread > 0 && (
                          <Badge className="h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 shrink-0">
                            {convo.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </ScrollArea>
          </div>

          {/* Chat area */}
          {selectedConvo ? (
            <div className={cn(
              "flex-1 flex flex-col min-w-0",
              !mobileShowChat && "hidden md:flex"
            )}>
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-8 w-8 mr-1"
                    onClick={() => setMobileShowChat(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {selectedConvo.avatar}
                    </div>
                    {selectedConvo.online && (
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedConvo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedConvo.online ? "Online" : "Offline"}{selectedConvo.service ? ` · ${selectedConvo.service}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Order context banner */}
                  {selectedConvo.service && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-center">
                      <span className="text-muted-foreground">Conversation about </span>
                      <span className="font-medium text-foreground">{selectedConvo.service}</span>
                    </div>
                  )}

                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex gap-2", msg.fromMe ? "justify-end" : "justify-start")}
                    >
                      {!msg.fromMe && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                          {selectedConvo.avatar}
                        </div>
                      )}
                      <div className={cn(
                        "max-w-xs md:max-w-md rounded-2xl px-4 py-2.5 text-sm",
                        msg.fromMe
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      )}>
                        <p>{msg.text}</p>
                        <p className={cn(
                          "text-[10px] mt-1 text-right",
                          msg.fromMe ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {msg.time}
                        </p>
                      </div>
                      {msg.fromMe && (
                        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                          {myInitials}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 bg-muted rounded-xl px-4 py-2 min-h-[40px] flex items-center">
                    <Input
                      placeholder="Write a message..."
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-9 w-9 bg-primary hover:bg-primary/90 shrink-0"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">Choose a conversation from the list</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
