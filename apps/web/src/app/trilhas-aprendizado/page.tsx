"use client";

import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";
import { MapaGamificado } from "@/components/student/MapaGamificado";

export default function TrilhasAprendizadoPage() {
  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗺️ Trilhas de Aprendizado
          </h1>
          <p className="text-gray-600">
            Siga sua jornada gamificada de desenvolvimento e torne-se um educador transformador
          </p>
        </div>

        {/* Mapa Gamificado */}
        <MapaGamificado />
      </div>
    </StudentDashboardLayout>
  );
}