"use client";

import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children, value }: PropsWithChildren<{ value: any }>) {
    return <SWRConfig value={value}>{children}</SWRConfig>;
}
