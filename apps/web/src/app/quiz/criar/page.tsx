"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CreateQuizForm } from "@/components/forms/CreateQuizForm";

export default function CreateQuizPage() {
  return (
    <DashboardLayout>
      <CreateQuizForm />
    </DashboardLayout>
  );
}