import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { adminAPI } from '../../services/api';
import styles from '../StudentDashboard/Dashboard.module.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await adminAPI.getAllUsers({ role: 'student' });
      setStudents(response.data.users);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Sidebar role="teacher" />
      <div className={styles.main}>
        <Header title="Registered Students" subtitle={`Total: ${students.length} students`} />
        <div className={styles.content}>
          <div className={styles.section}>
            {students.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyText}>No students registered yet</div>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f7fa', textAlign: 'left' }}>
                    <th style={{ padding: '12px', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '12px', fontWeight: 600 }}>Email</th>
                    <th style={{ padding: '12px', fontWeight: 600 }}>Department</th>
                    <th style={{ padding: '12px', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>{student.fullName}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{student.email}</td>
                      <td style={{ padding: '12px' }}>{student.department || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: student.isActive ? '#e8f5e9' : '#ffebee',
                          color: student.isActive ? '#388e3c' : '#d32f2f'
                        }}>
                          {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
