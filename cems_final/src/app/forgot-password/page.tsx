'use client';
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || 'Check your email.');
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Enter email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Send Reset Link</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
