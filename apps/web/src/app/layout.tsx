import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics";
import { Providers } from "./providers";
import { config } from "@/base/config";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Magicshorts | Automated faceless videos",
    description: "Automate your faceless videos from script to publish. Just enter your topic and watch your accounts grow.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <Providers>
                    <Theme accentColor="orange" grayColor="slate" radius="full" scaling="95%" hasBackground={false}>
                        {children}
                    </Theme>
                </Providers>

                {config.stage === "production" && (
                    <>
                        <GoogleAnalytics />
                        <Script async src="https://reflio.com/js/reflio.min.js" data-reflio="91jly0049boe05q" />
                    </>
                )}
            </body>
        </html>
    );
}
