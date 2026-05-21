import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuditForm } from "@/components/audit-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() })
}));

describe("AuditForm", () => {
  it("renders persisted default form state", async () => {
    render(<AuditForm />);
    expect(await screen.findByText("Tell us about the team")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
  });
});
