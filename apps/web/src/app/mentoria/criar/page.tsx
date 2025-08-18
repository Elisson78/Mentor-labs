"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CreateMentorshipForm } from "@/components/forms/CreateMentorshipForm";

export default function CreateMentorshipPage() {
  return (
    <DashboardLayout>
      <CreateMentorshipForm />
    </DashboardLayout>
  );
}