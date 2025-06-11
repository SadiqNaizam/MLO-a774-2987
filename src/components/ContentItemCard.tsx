import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink } from 'lucide-react'; // Example icons

export interface ContentItem {
  id: string;
  title: string;
  snippet: string;
  sourceName: string;
  url: string;
  publishedDate?: string; // Optional
  imageUrl?: string; // Optional
}

interface ContentItemCardProps {
  item: ContentItem;
  onBookmark: (itemId: string) => void;
  onOpenLink: (url: string) => void;
}

const ContentItemCard: React.FC<ContentItemCardProps> = ({ item, onBookmark, onOpenLink }) => {
  console.log("Rendering ContentItemCard for:", item.title);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if bookmark is part of the card body
    onBookmark(item.id);
    console.log("Bookmark clicked for item:", item.id);
    // Add toast notification here if desired: toast({ title: "Bookmarked!" })
  };

  const handleCardClick = () => {
    onOpenLink(item.url);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        {item.imageUrl && (
          <div className="mb-4 h-40 overflow-hidden rounded-md">
            <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full" />
          </div>
        )}
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <div className="text-xs text-muted-foreground">
          <span>From: <Badge variant="secondary">{item.sourceName}</Badge></span>
          {item.publishedDate && <span className="ml-2">{new Date(item.publishedDate).toLocaleDateString()}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{item.snippet}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={handleBookmarkClick} aria-label="Bookmark item">
          <Bookmark className="h-4 w-4 mr-2" />
          Bookmark
        </Button>
        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onOpenLink(item.url); }} aria-label="Open item in new tab">
          Read More
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ContentItemCard;