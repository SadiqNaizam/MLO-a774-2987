import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContentItemCard, { ContentItem } from '@/components/ContentItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { PlusCircle, Search, Settings, LogOut } from 'lucide-react';
import { toast } from "sonner"; // Assuming sonner is used for toasts

const initialFeedItems: ContentItem[] = [
  { id: '1', title: 'Understanding React Hooks', snippet: 'A deep dive into useState, useEffect, and custom hooks in React for better state management and side effects.', sourceName: 'React Blog', url: '#', publishedDate: '2024-05-15', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '2', title: 'Tailwind CSS Best Practices', snippet: 'Learn how to effectively use Tailwind CSS to build responsive and modern UIs without writing custom CSS.', sourceName: 'CSS Weekly', url: '#', publishedDate: '2024-05-14', imageUrl: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFpbHdpbmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '3', title: 'The Future of AI in Development', snippet: 'Exploring the impact of artificial intelligence on software development workflows and tools.', sourceName: 'TechCrunch', url: '#', publishedDate: '2024-05-16', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '4', title: 'Getting Started with Shadcn/UI', snippet: 'A comprehensive guide to integrating and customizing Shadcn/UI components in your React projects.', sourceName: 'Shadcn Docs', url: '#', publishedDate: '2024-05-12', imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60' },
];

const AppNavigationMenu = () => {
  const navigate = useNavigate();
  return (
    <NavigationMenu className="mb-6 p-2 border-b">
      <NavigationMenuList className="w-full flex justify-between items-center">
        <div className="flex">
            <NavigationMenuItem>
            <Link to="/feed" className={navigationMenuTriggerStyle()}>
                My Feed
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link to="/add-source" className={navigationMenuTriggerStyle()}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Source
            </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link to="/settings" className={navigationMenuTriggerStyle()}>
                <Settings className="h-4 w-4 mr-2" /> Settings
            </Link>
            </NavigationMenuItem>
        </div>
        <NavigationMenuItem>
            <Button variant="ghost" onClick={() => {
                toast("Logged out (simulated).");
                navigate('/login');
            }} className={navigationMenuTriggerStyle()}>
                 <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};


const FeedPage = () => {
  const [feedItems, setFeedItems] = useState<ContentItem[]>(initialFeedItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    console.log('FeedPage loaded');
    // Here you would typically fetch feed items from an API
    // For now, we use initialFeedItems
  }, []);

  const handleBookmark = (itemId: string) => {
    console.log(`Bookmarking item ${itemId}`);
    toast(`Item ${itemId} bookmarked!`);
    // Add actual bookmark logic here
  };

  const handleOpenLink = (url: string) => {
    console.log(`Opening link ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredAndSortedItems = feedItems
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.publishedDate || 0).getTime() - new Date(a.publishedDate || 0).getTime();
      }
      if (sortOrder === 'oldest') {
        return new Date(a.publishedDate || 0).getTime() - new Date(b.publishedDate || 0).getTime();
      }
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Your Content Feed</h1>
          <p className="text-muted-foreground">Latest articles and updates from your sources.</p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search feed by title or snippet..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              {/* <SelectItem value="relevance">Relevance</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {filteredAndSortedItems.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedItems.map(item => (
                <ContentItemCard
                  key={item.id}
                  item={item}
                  onBookmark={handleBookmark}
                  onOpenLink={handleOpenLink}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No items match your search or filters.</p>
            {searchTerm === '' && <p className="mt-2">Try adding more sources or adjusting your filters.</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedPage;