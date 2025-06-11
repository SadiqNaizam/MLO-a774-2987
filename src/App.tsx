import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Note: shadcn ui/sonner.tsx exports Toaster as well. If using Sonner directly: import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import FeedPage from "./pages/FeedPage";
import AddSourcePage from "./pages/AddSourcePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendered, router initialized.");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner richColors position="bottom-right" /> {/* Using Sonner directly for more flexibility if needed */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/add-source" element={<AddSourcePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;