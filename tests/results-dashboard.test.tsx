import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResultsDashboard } from "@/components/results-dashboard";
import { getSampleReport } from "@/lib/sample-report";

describe("ResultsDashboard", () => {
  it("renders monthly and annual savings", () => {
    const report = getSampleReport();
    render(<ResultsDashboard result={report} />);
    expect(screen.getByText(/\$482 monthly savings found/i)).toBeInTheDocument();
    expect(screen.getByText("$5,784")).toBeInTheDocument();
  });
});
