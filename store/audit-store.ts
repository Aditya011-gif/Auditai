"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuditInput } from "@/types/audit";
import { defaultAuditInput } from "@/lib/default-audit";

interface AuditStore {
  draft: AuditInput;
  setDraft: (draft: AuditInput) => void;
  reset: () => void;
}

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      draft: defaultAuditInput,
      setDraft: (draft) => set({ draft }),
      reset: () => set({ draft: defaultAuditInput })
    }),
    { name: "auditai-draft-v1" }
  )
);
