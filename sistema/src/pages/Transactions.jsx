import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ModalMovimentacao } from '../components/ModalMovimentacao';

export function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const { data, error } = await supabase
      .from('inventory_transactions')
      .select('*, materials(name, unit_measure), profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (data) setTransactions(data);
    setLoading(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2>Movimentações</h2>
          <p style={{ color: 'var(--cinza-medio)' }}>Histórico de entradas, consumo, reuso e descartes.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setModalType('CONSUMO')}>Registrar Consumo</button>
          <button className="btn btn-primary" onClick={() => setModalType('REUSO')}>Registrar Reuso</button>
          <button className="btn" style={{backgroundColor: 'var(--alerta-erro)', color: '#fff'}} onClick={() => setModalType('DESCARTE')}>Descarte</button>
        </div>
      </div>

      {modalType && (
        <ModalMovimentacao 
          tipo={modalType} 
          onClose={() => setModalType(null)} 
          onSaved={() => {
            setModalType(null);
            fetchTransactions();
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
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Material</th>
                  <th>Qtd</th>
                  <th>Usuário / Destino</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign: 'center'}}>Nenhuma movimentação registrada.</td></tr>
                ) : (
                  transactions.map(t => (
                    <tr key={t.id}>
                      <td>{new Date(t.created_at).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <strong>{t.type}</strong>
                        {t.type === 'REUSO' && <span style={{display: 'block', fontSize: '0.75rem', color: 'var(--cinza-medio)'}}>De: {t.origin} Para: {t.new_destination}</span>}
                      </td>
                      <td>{t.materials?.name}</td>
                      <td>{t.quantity} {t.materials?.unit_measure}</td>
                      <td>{t.profiles?.full_name}</td>
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
