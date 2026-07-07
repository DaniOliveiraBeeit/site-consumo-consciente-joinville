import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const [stats, setStats] = useState({ totalMateriais: 0, taxaReuso: 0, itensBaixoEstoque: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      // Basic implementation for MVP stats
      const { count: countMateriais } = await supabase.from('materials').select('*', { count: 'exact', head: true });
      
      const { data: baixoEstoque } = await supabase
        .from('materials')
        .select('*')
        .filter('stock_quantity', 'lte', 'min_stock_level');

      // Calculating reuse rate logic
      const { data: txs } = await supabase.from('inventory_transactions').select('type, quantity');
      let totalConsumo = 0;
      let totalReuso = 0;

      txs?.forEach(tx => {
        if (tx.type === 'CONSUMO') totalConsumo += Number(tx.quantity);
        if (tx.type === 'REUSO') totalReuso += Number(tx.quantity);
      });

      const taxa = totalConsumo > 0 ? ((totalReuso / totalConsumo) * 100).toFixed(1) : 0;

      setStats({
        totalMateriais: countMateriais || 0,
        itensBaixoEstoque: baixoEstoque?.length || 0,
        taxaReuso: taxa
      });
      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) return <div>Carregando dashboard...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ color: 'var(--cinza-medio)', marginBottom: '24px' }}>Visão geral do consumo e reuso de materiais.</p>

      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-title">Materiais Cadastrados</div>
          <div className="stat-value">{stats.totalMateriais}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">Taxa de Reaproveitamento</div>
          <div className="stat-value" style={{ color: stats.taxaReuso > 20 ? 'var(--alerta-sucesso)' : 'var(--verde-escuro)' }}>
            {stats.taxaReuso}%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Itens com Baixo Estoque</div>
          <div className="stat-value" style={{ color: stats.itensBaixoEstoque > 0 ? 'var(--alerta-erro)' : 'var(--verde-escuro)' }}>
            {stats.itensBaixoEstoque}
          </div>
        </div>
      </div>
    </div>
  );
}
