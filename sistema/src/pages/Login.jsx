import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🌱 Acesso Restrito</h1>
        <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--cinza-medio)' }}>
          Sistema de Controle de Consumo - Senac
        </p>
        
        {error && (
          <div style={{ background: 'var(--alerta-erro)', color: '#fff', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
