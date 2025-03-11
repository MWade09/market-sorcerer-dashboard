
import React, { useState, useEffect } from 'react';
import { Bell, Settings, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b shadow-soft" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          
          {!searchOpen && (
            <div className="hidden md:flex items-center space-x-2">
              <h1 className="text-xl font-medium">Market Sorcerer</h1>
              <div className="px-2 py-1 bg-accent rounded-md">
                <span className="text-xs font-medium text-primary">PRO</span>
              </div>
            </div>
          )}
        </div>

        <div className={cn(
          "absolute left-0 right-0 mx-auto transition-all duration-200 max-w-md px-4",
          searchOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
        )}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 pr-12" 
              placeholder="Search coins, strategies, exchanges..." 
              autoFocus={searchOpen}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" 
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(searchOpen && "hidden md:flex")}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(searchOpen && "hidden md:flex")}>
                <Bell className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
              </div>
              <Separator />
              <div className="max-h-[300px] overflow-y-auto py-2">
                <div className="py-2 px-1">
                  <p className="text-sm font-medium">BTC/USDT position opened</p>
                  <p className="text-xs text-muted-foreground">Buy 0.5 BTC at $46,500.00</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
                <Separator />
                <div className="py-2 px-1">
                  <p className="text-sm font-medium">Strategy "Momentum RSI" activated</p>
                  <p className="text-xs text-muted-foreground">Strategy is now running</p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" size="icon" className={cn(searchOpen && "hidden md:flex")}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
          
          <div className={cn(searchOpen && "hidden md:flex")}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">MS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
