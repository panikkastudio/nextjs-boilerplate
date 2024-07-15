"use client";

import useSWR from "swr";
import { CURRENT_USER, USER_LIMITS } from "./keys";

import { getLimits } from "@/services/payments";
import { getUser } from "@/services/auth";

export function useUser() {
    return useSWR(CURRENT_USER, () => getUser());
}

export function useLimits() {
    return useSWR(USER_LIMITS, () => getLimits());
}
