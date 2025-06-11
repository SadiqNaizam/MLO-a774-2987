import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Edit3, Rss } from 'lucide-react'; // Example icons

export interface SourceData {
  id: string;
  name: string;
  url: string;
  itemCount?: number; // Optional
  lastFetched?: string; // Optional
  isActive?: boolean; // Optional
}

interface SourceManagementRowProps {
  source: SourceData;
  onDelete: (sourceId: string) => void;
  onEdit?: (sourceId: string) => void; // Optional edit functionality
}

const SourceManagementRow: React.FC<SourceManagementRowProps> = ({ source, onDelete, onEdit }) => {
  console.log("Rendering SourceManagementRow for:", source.name);

  const handleDelete = () => {
    onDelete(source.id);
    console.log("Delete confirmed for source:", source.id);
    // Add toast notification here if desired: toast({ title: "Source deleted." })
  };

  return (
    <div className="flex items-center justify-between p-4 border-b hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-3">
        <Rss className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">{source.name}</p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline truncate max-w-xs sm:max-w-sm md:max-w-md">
            {source.url}
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {onEdit && (
          <Button variant="ghost" size="icon" onClick={() => onEdit(source.id)} aria-label={`Edit source ${source.name}`}>
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label={`Delete source ${source.name}`}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the source "{source.name}" and all its associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default SourceManagementRow;