'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './employees.module.css';

export default function EmployeesPage() {
    const [search, setSearch] = useState('');

    // Mock Data for Smart Employee Management
    const employees = [
        { id: 1, name: 'Sarah Jenkins', role: 'Senior UX Designer', dept: 'Design', performance: 9.2, risk: 'Low', riskLabel: 'Stable' },
        { id: 2, name: 'Michael Chen', role: 'Lead Developer', dept: 'Engineering', performance: 9.8, risk: 'Low', riskLabel: 'Stable' },
        { id: 3, name: 'Jessica Alba', role: 'Marketing Specialist', dept: 'Marketing', performance: 8.5, risk: 'Medium', riskLabel: 'Watch' },
        { id: 4, name: 'David Miller', role: 'Sales Executive', dept: 'Sales', performance: 7.2, risk: 'High', riskLabel: 'At Risk' },
        { id: 5, name: 'Robert Fox', role: 'Backend Engineer', dept: 'Engineering', performance: 8.9, risk: 'Low', riskLabel: 'Stable' },
        { id: 6, name: 'Emily White', role: 'HR Manager', dept: 'HR', performance: 9.5, risk: 'Low', riskLabel: 'Stable' },
    ];

    const filtered = employees.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.role.toLowerCase().includes(search.toLowerCase()) ||
        e.dept.toLowerCase().includes(search.toLowerCase())
    );

    const getRiskStyle = (risk) => {
        if (risk === 'High') return styles.riskHigh;
        if (risk === 'Medium') return styles.riskMed;
        return styles.riskLow;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Smart Workforce</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>AI-Powered Employee Management</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`} style={{ maxWidth: '200px' }}>
                    + Add Employee
                </button>
            </header>

            {/* Department Analytics Snapshot */}
            <div className={styles.chartSection}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{employees.length}</span>
                    <span className={styles.statLabel}>Total Employees</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>9.1</span>
                    <span className={styles.statLabel}>Avg Performance</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue} style={{ color: '#10b981' }}>96%</span>
                    <span className={styles.statLabel}>Retention Rate</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue} style={{ color: '#f59e0b' }}>2</span>
                    <span className={styles.statLabel}>Open Positions</span>
                </div>
            </div>

            <div className={styles.controls}>
                <input
                    className={styles.search}
                    placeholder="🔍 Search by Name, Role, or Department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.grid}>
                {filtered.length > 0 ? filtered.map(emp => (
                    <div key={emp.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.avatar}>
                                {emp.name.charAt(0)}
                            </div>
                            <div className={styles.info}>
                                <h3>{emp.name}</h3>
                                <div className={styles.role}>{emp.role}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', marginTop: '0.2rem' }}>{emp.dept}</div>
                            </div>
                        </div>

                        <div className={styles.aiStats}>
                            <div className={styles.aiMetric}>
                                <span className={styles.aiLabel}>Performance AI</span>
                                <span className={styles.score}>{emp.performance}/10</span>
                            </div>
                            <div className={styles.aiMetric} style={{ textAlign: 'right' }}>
                                <span className={styles.aiLabel}>Retention Risk</span>
                                <span className={`${styles.score} ${getRiskStyle(emp.risk)}`}>{emp.riskLabel}</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link
                                href={`/admin/salary-slip?name=${encodeURIComponent(emp.name)}&role=${encodeURIComponent(emp.role)}&dept=${encodeURIComponent(emp.dept)}&id=LB-${new Date().getFullYear()}-00${emp.id}`}
                                className={styles.btn}
                                style={{ textAlign: 'center', textDecoration: 'none' }}
                            >
                                📄 Slip
                            </Link>
                            <button className={styles.btn}>Profile</button>
                        </div>
                    </div>
                )) : (
                    <div className={styles.empty}>No employees found matching "{search}"</div>
                )}
            </div>
        </div>
    );
}
