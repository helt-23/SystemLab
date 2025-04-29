import React from 'react';
import { Users, CalendarClock } from 'lucide-react';

export function LaboratoryCard({ lab, handleVerHorarios }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Imagem do Laboratório */}
      <div className="h-48 bg-gray-200 relative flex-shrink-0">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{lab.name}</h3>
        </div>
      </div>

      {/* Detalhes do Laboratório */}
      <div className="p-4 flex flex-col flex-1">
        <div className="space-y-3 flex-1">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{lab.capacity} lugares disponíveis</span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {lab.description}
          </p>
        </div>

        {/* Botão fixo no rodapé do card */}
        <button
          onClick={() => handleVerHorarios(lab.id)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
        >
          <CalendarClock className="w-5 h-5 mr-2" />
          Ver Horários
        </button>
      </div>
    </div>
  );
}