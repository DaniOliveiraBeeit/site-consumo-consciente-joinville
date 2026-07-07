import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ModalMaterial } from '../components/ModalMaterial';

export function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('name');
    if (data) setMaterials(data);
    setLoading(false);
  }

  const getBadgeClass = (category) => {
    return 'badge badge-' + (category?.toLowerCase() || 'descartavel');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 24px 0' }}>
        <div>
          <h2>Materiais</h2>
          <p style={{ color: 'var(--cinza-medio)' }}>Gestão do catálogo de itens e estoque atual.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Novo Material
        </button>
      </div>

      {isModalOpen && (
        <ModalMaterial 
          onClose={() => setIsModalOpen(false)} 
          onSaved={() => {
            setIsModalOpen(false);
            fetchMaterials();
          }} 
        />
      )}

      <div className="card">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Estoque Atual</th>
                  <th>Nível de Reuso</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign: 'center'}}>Nenhum material cadastrado ainda.</td></tr>
                ) : (
                  materials.map(m => (
                    <tr key={m.id}>
                      <td><strong>{m.code || '-'}</strong></td>
                      <td>{m.name}</td>
                      <td><span className={getBadgeClass(m.category)}>{m.category}</span></td>
                      <td>{m.stock_quantity} {m.unit_measure}</td>
                      <td>
                        {m.reuse_level_tag ? (
                          <span className={'badge badge-tag-' + m.reuse_level_tag}>{m.reuse_level_tag}</span>
                        ) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
