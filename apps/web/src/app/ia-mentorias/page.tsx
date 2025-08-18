"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AIMentorshipForm } from "@/components/forms/AIMentorshipForm";

export default function AIMentorshipsPage() {
  return (
    <DashboardLayout>
      <AIMentorshipForm />
    </DashboardLayout>
  );
}