'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "../_layouts/app";
import { useEffect } from "react";
import { api } from "../lib/axios";
import { APP_NAME } from "../constants/app-infos";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem(`${APP_NAME}:token`)}`
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}