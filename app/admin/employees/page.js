'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './employees.module.css';

export default function EmployeesPage() {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Initial Mock Data
    const [employees, setEmployees] = useState([
        { id: 1, empId: 'LB-2024-001', name: 'Sarah Jenkins', role: 'Senior UX Designer', dept: 'Design', performance: 9.2, risk: 'Low', riskLabel: 'Stable' },
        { id: 2, empId: 'LB-2024-002', name: 'Michael Chen', role: 'Lead Developer', dept: 'Engineering', performance: 9.8, risk: 'Low', riskLabel: 'Stable' },
        { id: 3, empId: 'LB-2024-003', name: 'Jessica Alba', role: 'Marketing Specialist', dept: 'Marketing', performance: 8.5, risk: 'Medium', riskLabel: 'Watch' },
        { id: 4, empId: 'LB-2024-004', name: 'David Miller', role: 'Sales Executive', dept: 'Sales', performance: 7.2, risk: 'High', riskLabel: 'At Risk' },
    ]);

    const [newEmp, setNewEmp] = useState({ name: '', role: '', dept: '' });

    // ID Generator System
    const generateId = () => {
        const year = new Date().getFullYear();
        const existingCount = employees.length + 1;
        // Format: LB-YYYY-XXX (e.g. LB-2025-005)
        return `LB-${year}-${existingCount.toString().padStart(3, '0')}`;
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const id = generateId();
        const newEmployee = {
            id: employees.length + 1,
            empId: id,
            name: newEmp.name,
            role: newEmp.role,
            dept: newEmp.dept,
            performance: 8.0, // Default start
            risk: 'Low',
            riskLabel: 'New Hire'
        };
        setEmployees([...employees, newEmployee]);
        setShowModal(false);
        setNewEmp({ name: '', role: '', dept: '' });
        alert(`Employee Created Successfully!\nGenerated ID: ${id}`);
    };

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
                <button
                    onClick={() => setShowModal(true)}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    style={{ maxWidth: '200px' }}
                >
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
                                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem', fontFamily: 'monospace', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                                    ID: {emp.empId}
                                </div>
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
                                href={`/admin/salary-slip?name=${encodeURIComponent(emp.name)}&role=${encodeURIComponent(emp.role)}&dept=${encodeURIComponent(emp.dept)}&id=${emp.empId}`}
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

            {/* ADD EMPLOYEE MODAL */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white', padding: '2rem', borderRadius: '12px', width: '400px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Add New Employee</h2>
                        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                                <input
                                    required
                                    value={newEmp.name}
                                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Role / Designation</label>
                                <input
                                    required
                                    value={newEmp.role}
                                    onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    placeholder="e.g. Software Engineer"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Department</label>
                                <select
                                    required
                                    value={newEmp.dept}
                                    onChange={(e) => setNewEmp({ ...newEmp, dept: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'var(--primary-gradient)', color: 'white', fontWeight: '600', cursor: 'pointer' }}
                                >Create System ID</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
