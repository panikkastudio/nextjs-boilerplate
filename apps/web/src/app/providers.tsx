"use client";

import { Toaster } from "@/components/ui/sonner";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: any) {
    return (
        <>
            {/* <ThemeProvider attribute="class"></ThemeProvider> */}
            {children}
            <Toaster />
            <ProgressBar height="3px" color="var(--orange-10)" options={{ showSpinner: false }} shallowRouting />
        </>
    );
}
