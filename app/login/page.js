'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Authentication (Hardcoded for Demo)
        if (email === 'admin@logicbite.com' && password === 'admin123') {
            document.cookie = "auth_token=valid_token; path=/; max-age=3600";
            router.push('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src="/company_logo.png" alt="LogicBite" style={{ height: '60px' }} />
                    <h1 className={styles.title}>Admin Login</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Secure Access Panel</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@logicbite.com"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className={styles.btn}>Login to Dashboard</button>
                </form>
            </div>
        </div>
    );
}
