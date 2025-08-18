"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ContentManagement } from "@/components/dashboard/ContentManagement";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Statistics Cards */}
        <StatsCards />
        
        {/* Content Management */}
        <ContentManagement />
      </div>
    </DashboardLayout>
  );
}