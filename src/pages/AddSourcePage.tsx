import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Terminal, PlusCircle, Settings, LogOut, Rss } from 'lucide-react';
import { toast } from "sonner";

const addSourceSchema = z.object({
  sourceUrl: z.string().url({ message: "Please enter a valid URL (e.g., RSS feed)." }),
  sourceName: z.string().min(1, { message: "Source name cannot be empty."}).optional(),
});

type AddSourceFormValues = z.infer<typeof addSourceSchema>;

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

const AddSourcePage = () => {
  const navigate = useNavigate();
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<AddSourceFormValues>({
    resolver: zodResolver(addSourceSchema),
    defaultValues: {
      sourceUrl: '',
      sourceName: '',
    },
  });

  const onSubmit = (data: AddSourceFormValues) => {
    console.log('AddSourcePage form submitted:', data);
    setFormMessage(null);
    // Simulate API call to add source
    // For this example, we'll assume success
    toast.success(`Source "${data.sourceName || data.sourceUrl}" added successfully! (simulated)`);
    setFormMessage({ type: 'success', text: `Source "${data.sourceName || data.sourceUrl}" added! You might be redirected or see it in your feed soon.` });
    form.reset(); // Reset form after successful submission
    // Optionally, navigate away or refresh source list
    // setTimeout(() => navigate('/feed'), 2000);
  };

  console.log('AddSourcePage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <AppNavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Rss className="h-6 w-6 mr-2 text-primary" /> Add New Content Source
            </CardTitle>
            <CardDescription>
              Enter the URL of an RSS feed or a website you want to follow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sourceUrl">Source URL (e.g., RSS Feed Link)</Label>
                <Input
                  id="sourceUrl"
                  type="url"
                  placeholder="https://example.com/feed.xml"
                  {...form.register('sourceUrl')}
                />
                {form.formState.errors.sourceUrl && (
                  <p className="text-sm text-red-500">{form.formState.errors.sourceUrl.message}</p>
                )}
              </div>
               <div className="space-y-2">
                <Label htmlFor="sourceName">Source Name (Optional)</Label>
                <Input
                  id="sourceName"
                  type="text"
                  placeholder="e.g., My Favorite Blog"
                  {...form.register('sourceName')}
                />
                {form.formState.errors.sourceName && (
                  <p className="text-sm text-red-500">{form.formState.errors.sourceName.message}</p>
                )}
              </div>

              {formMessage && (
                <Alert variant={formMessage.type === 'error' ? 'destructive' : 'default'} className={formMessage.type === 'success' ? 'bg-green-100 border-green-300 text-green-700' : ''}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>{formMessage.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{formMessage.text}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Adding Source...' : 'Add Source'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddSourcePage;