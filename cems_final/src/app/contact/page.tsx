'use client';
import React, { useState } from 'react';

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
    <div style={{ padding: '60px 40px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', fontSize: '16px' }}>
          Send Message
        </button>
      </form>

      <div style={{ marginTop: '40px', textAlign: 'left', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '10px' }}>CEMS Contact Details</h3>
        <p><strong>Phone:</strong> <a href="tel:6478717565">6478717565</a></p>
        <p><strong>Email:</strong> <a href="mailto:cemshelp@gmail.com">cemshelp@gmail.com</a></p>
      </div>
    </div>
  );
}
