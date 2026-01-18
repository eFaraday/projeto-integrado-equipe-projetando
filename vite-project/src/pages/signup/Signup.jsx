import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Reset messages
        setError('');
        setSuccess('');

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                username,
                email,
                password
            });

            // Auto-login after successful registration
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));

            setSuccess('Cadastro realizado com sucesso! Redirecionando...');

            setTimeout(() => {
                navigate('/'); // Redirect to home
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar conta');
        }
    };

    return (
        <div className="signup-container">
            <div style={{ marginTop: '80px', marginBottom: '40px', textAlign: 'center' }}>
                <img
                    src="https://raw.githubusercontent.com/EquipeProjetando/EquipeProjetando/main/logoinstituto%404x.png"
                    alt="Logo Instituto VORP"
                    className="signup-logo"
                />
                <h2 className="signup-title">Criar Conta</h2>
            </div>

            <input
                type="text"
                placeholder="Nome de usuário"
                className="signup-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="email"
                placeholder="E-mail"
                className="signup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirmar senha"
                className="signup-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="message error-message">{error}</p>}
            {success && <p className="message success-message">{success}</p>}

            <button className="signup-btn" onClick={handleSignup}>
                Cadastrar
            </button>

            <div className="login-link">
                <p>
                    Já tem uma conta?{' '}
                    <span onClick={() => navigate('/login')} className="link-text">
                        Fazer login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
