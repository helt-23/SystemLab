import React from 'react';
import { Info } from 'lucide-react';

const AbbreviationPanel = () => (
  <section className="abbreviation-panel">
    <h3 className="abbreviation-panel__header">
      <Info size={18} /> Legenda de Abreviações
    </h3>
    <div className="abbreviation-panel__list">
      <div className="abbreviation-panel__item">
        <span>Livre</span>
        <span style={{ color: '#166534', fontWeight: '500' }}>●</span>
      </div>
      <div className="abbreviation-panel__item">
        <span>Reservado</span>
        <span style={{ color: '#991b1b', fontWeight: '500' }}>●</span>
      </div>
      <div className="abbreviation-panel__item">
        <span>Aula</span>
        <span style={{ color: '#143695', fontWeight: '500' }}>●</span>
      </div>
    </div>
  </section>
);

export default AbbreviationPanel;