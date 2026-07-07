import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function ModalMaterial({ onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'descartavel',
    unit_measure: 'unidade',
    stock_quantity: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('materials').insert([formData]);
    
    setLoading(false);
    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      onSaved();
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '400px', margin: 0, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✖</button>
        <h3 style={{ marginBottom: '20px' }}>Novo Material</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Material</label>
            <input type="text" className="form-control" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Código (Opcional)</label>
            <input type="text" className="form-control" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="descartavel">Descartável</option>
              <option value="duravel">Durável</option>
              <option value="reciclavel">Reciclável</option>
              <option value="reutilizavel">Reutilizável</option>
            </select>
          </div>

          <div className="form-group">
            <label>Unidade de Medida</label>
            <select className="form-control" value={formData.unit_measure} onChange={e => setFormData({...formData, unit_measure: e.target.value})}>
              <option value="unidade">Unidade (un)</option>
              <option value="kg">Quilogramas (kg)</option>
              <option value="litro">Litros (L)</option>
              <option value="caixa">Caixa (cx)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Estoque Inicial</label>
            <input type="number" className="form-control" min="0" required value={formData.stock_quantity} onChange={e => setFormData({...formData, stock_quantity: e.target.value})} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Material'}
          </button>
        </form>
      </div>
    </div>
  );
}
