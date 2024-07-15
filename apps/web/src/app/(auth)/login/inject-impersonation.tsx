"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export function InjectImpersonate() {
    useEffect(() => {
        (window as any).__impersonate = (userID: string, password: string) => {
            return signIn("impersonate", {
                userID,
                password,
            });
        };

        return () => {
            (window as any).__impersonate = null;
        };
    }, []);
    return null;
}
