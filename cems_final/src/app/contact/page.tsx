'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-dark text-white py-3">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-3">🎭 CEMS</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        <div className="mx-auto" style={{ maxWidth: '700px' }}>

          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          <h4 className="text-center mb-4">Contact Us</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                placeholder="Write your message here..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>

          <div className="bg-white border mt-5 p-4 rounded shadow-sm">
            <h4 className="mb-3">📞 CEMS Contact Details</h4>
            <p><strong>Phone:</strong> <a href="tel:6478717565" className="text-decoration-none">647-871-7565</a></p>
            <p><strong>Email:</strong> <a href="mailto:cemshelp@gmail.com" className="text-decoration-none">cemshelp@gmail.com</a></p>
          </div>
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