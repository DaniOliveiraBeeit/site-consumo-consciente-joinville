import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowLeftRight, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span style={{ fontSize: '1.5rem' }}>🌱</span> Consumo JLE
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/materiais" className={`nav-item ${location.pathname === '/materiais' ? 'active' : ''}`}>
            <Package size={20} /> Materiais
          </Link>
          <Link to="/movimentacoes" className={`nav-item ${location.pathname === '/movimentacoes' ? 'active' : ''}`}>
            <ArrowLeftRight size={20} /> Movimentações
          </Link>
        </nav>
      </aside>
      
      <main className="main-content">
        <header className="topbar">
          <button onClick={handleLogout} className="btn">
            <LogOut size={16} /> Sair
          </button>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
