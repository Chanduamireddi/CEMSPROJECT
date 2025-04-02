/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import Link from 'next/link';

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
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-dark text-white py-3">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-3">🎭 CEMS</Link>
        </div>
      </header>

      {/* Forgot Password Form Section */}
      <main className="flex-grow-1">
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
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center">
          <small>&copy; {new Date().getFullYear()} CEMS. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}