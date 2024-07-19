'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AuthLayout } from "../_layouts/auth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient} >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AuthLayout>
          {children}
        </AuthLayout>
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}