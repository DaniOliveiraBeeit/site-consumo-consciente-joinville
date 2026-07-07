import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function ModalMovimentacao({ tipo, onClose, onSaved }) {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    material_id: '',
    quantity: 1,
    purpose: '',
    origin: '',
    new_destination: '',
    discard_reason: 'quebra'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMaterials() {
      const { data } = await supabase.from('materials').select('id, name, stock_quantity, unit_measure').order('name');
      if (data) {
        setMaterials(data);
        if (data.length > 0) setFormData(prev => ({...prev, material_id: data[0].id}));
      }
    }
    loadMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Obter o ID do usuario logado
    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
      material_id: formData.material_id,
      user_id: user.id,
      type: tipo,
      quantity: formData.quantity,
    };

    if (tipo === 'CONSUMO') payload.purpose = formData.purpose;
    if (tipo === 'REUSO') {
      payload.origin = formData.origin;
      payload.new_destination = formData.new_destination;
    }
    if (tipo === 'DESCARTE') payload.discard_reason = formData.discard_reason;

    const { error } = await supabase.from('inventory_transactions').insert([payload]);
    
    setLoading(false);
    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      onSaved();
    }
  };

  const selectedMaterial = materials.find(m => m.id === formData.material_id);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ width: '450px', margin: 0, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✖</button>
        <h3 style={{ marginBottom: '20px' }}>
          Registrar {tipo === 'CONSUMO' ? 'Consumo' : tipo === 'REUSO' ? 'Reuso' : 'Descarte'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Material</label>
            <select className="form-control" required value={formData.material_id} onChange={e => setFormData({...formData, material_id: e.target.value})}>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name} (Em estoque: {m.stock_quantity} {m.unit_measure})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantidade ({selectedMaterial?.unit_measure || 'un'})</label>
            <input type="number" className="form-control" min="0.1" step="0.1" required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
          </div>

          {tipo === 'CONSUMO' && (
            <div className="form-group">
              <label>Finalidade / Motivo</label>
              <input type="text" className="form-control" required placeholder="Ex: Aula de Gastronomia" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
            </div>
          )}

          {tipo === 'REUSO' && (
            <>
              <div className="form-group">
                <label>Origem (De onde sobrou?)</label>
                <input type="text" className="form-control" required placeholder="Ex: Sobras do Lab de Informática" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Nova Destinação (Para onde vai?)</label>
                <input type="text" className="form-control" required placeholder="Ex: Oficina de Robótica" value={formData.new_destination} onChange={e => setFormData({...formData, new_destination: e.target.value})} />
              </div>
            </>
          )}

          {tipo === 'DESCARTE' && (
            <div className="form-group">
              <label>Motivo do Descarte</label>
              <select className="form-control" value={formData.discard_reason} onChange={e => setFormData({...formData, discard_reason: e.target.value})}>
                <option value="quebra">Quebra / Dano</option>
                <option value="contaminacao">Contaminação</option>
                <option value="vencimento">Data de Vencimento</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading || materials.length === 0}>
            {loading ? 'Salvando...' : 'Confirmar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
}
