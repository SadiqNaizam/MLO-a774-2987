import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import SourceManagementRow, { SourceData } from '@/components/SourceManagementRow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Lock, Rss, PlusCircle, Settings as SettingsIcon, LogOut, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required."),
  newPassword: z.string().min(6, "New password must be at least 6 characters."),
  confirmNewPassword: z.string().min(6, "Confirm new password."),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match.",
  path: ["confirmNewPassword"],
});

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

const initialSources: SourceData[] = [
  { id: 's1', name: 'React Blog Official', url: 'https://react.dev/blog', itemCount: 25, lastFetched: '2024-05-20', isActive: true },
  { id: 's2', name: 'Tailwind CSS News', url: 'https://tailwindcss.com/blog', itemCount: 12, lastFetched: '2024-05-19', isActive: true },
  { id: 's3', name: 'Tech News Daily', url: 'https://technewsdaily.co/feed', itemCount: 50, lastFetched: '2024-05-21', isActive: false },
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
                <SettingsIcon className="h-4 w-4 mr-2" /> Settings
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

const SettingsPage = () => {
  const [sources, setSources] = useState<SourceData[]>(initialSources);
  const passwordForm = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  });

  const handlePasswordChangeSubmit = (data: PasswordChangeFormValues) => {
    console.log('Password change submitted:', data);
    // Simulate API call
    toast.success("Password changed successfully! (simulated)");
    passwordForm.reset();
  };

  const handleDeleteSource = (sourceId: string) => {
    console.log(`Deleting source ${sourceId}`);
    setSources(prevSources => prevSources.filter(s => s.id !== sourceId));
    toast.error(`Source deleted successfully! (simulated)`);
  };
  
  const handleEditSource = (sourceId: string) => {
    console.log(`Editing source ${sourceId}`);
    toast.info(`Edit functionality for source ${sourceId} is not implemented yet.`);
    // Navigate to an edit source page or open a modal
  };


  console.log('SettingsPage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and content sources.</p>
        </header>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="account"><User className="h-4 w-4 mr-2 inline-block" />Account</TabsTrigger>
            <TabsTrigger value="sources"><Rss className="h-4 w-4 mr-2 inline-block" />Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">User Profile</h3>
                  <p className="text-sm text-muted-foreground">Email: user@example.com (Placeholder)</p>
                  {/* Add more profile fields if needed */}
                </div>
                <hr/>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordChangeSubmit)} className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" {...passwordForm.register('currentPassword')} />
                      {passwordForm.formState.errors.currentPassword && <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                      {passwordForm.formState.errors.newPassword && <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <Input id="confirmNewPassword" type="password" {...passwordForm.register('confirmNewPassword')} />
                      {passwordForm.formState.errors.confirmNewPassword && <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmNewPassword.message}</p>}
                    </div>
                    <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                      <Lock className="h-4 w-4 mr-2" />
                      {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Content Sources</CardTitle>
                <CardDescription>Review, edit, or remove your subscribed content sources.</CardDescription>
              </CardHeader>
              <CardContent>
                {sources.length > 0 ? (
                  <div className="space-y-2">
                    {sources.map(source => (
                      <SourceManagementRow
                        key={source.id}
                        source={source}
                        onDelete={handleDeleteSource}
                        onEdit={handleEditSource}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">You haven't added any sources yet.
                    <Link to="/add-source" className="text-primary hover:underline ml-1">Add one now!</Link>
                  </p>
                )}
                 <div className="mt-6">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete All Sources (Example Dialog)
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete all your sources.
                                This is an example action not tied to `SourceManagementRow`.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => toast.error("All sources deleted (simulated). This dialog is for demonstration.")} className="bg-destructive hover:bg-destructive/90">
                                Yes, delete all
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;