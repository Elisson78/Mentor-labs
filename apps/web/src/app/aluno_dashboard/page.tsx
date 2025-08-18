"use client";

import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";
import { StudentStats } from "@/components/student/StudentStats";
import { LevelProgress } from "@/components/student/LevelProgress";
import { LearningTracks } from "@/components/student/LearningTracks";
import { Achievements } from "@/components/student/Achievements";

export default function AlunoDashboardPage() {
  return (
    <StudentDashboardLayout>
      <div className="min-h-screen">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Statistics Cards */}
            <StudentStats />
            
            {/* Level Progress */}
            <LevelProgress />
            
            {/* Learning Tracks */}
            <LearningTracks />
          </div>

          {/* Sidebar Content - Stack on mobile, sidebar on desktop */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <Achievements />
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}