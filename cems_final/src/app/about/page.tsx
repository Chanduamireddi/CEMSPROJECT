'use client';
import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
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
        <div className="mx-auto bg-light p-4 rounded shadow-sm" style={{ maxWidth: '900px' }}>
          <h1 className="text-center mb-4">About Us</h1>

          <section className="mb-4">
            <h4 className="fw-bold">📌 Project Name:</h4>
            <p className="fs-5 mb-2">Community Event Management System</p>
          </section>

          <section className="mb-4">
            <h4 className="fw-bold">📖 Project Description:</h4>
            <p className="fs-5">
              The Community Event Management System website is designed to make organizing and participating in community events super easy. Whether it is a residential community, student group, or local club, this tool simplifies event planning, participation, and feedback collection — all in one place.
              <br /><br />
              It helps communities stay connected by making it easy for everyone to be a part of exciting events and contribute to their success.
            </p>
          </section>

          <section>
            <h4 className="fw-bold">👨‍💻 Team Members:</h4>
            <ul className="list-group list-group-flush fs-5">
              <li className="list-group-item">Sai Chandu Amireddi <strong>N01611293</strong></li>
              <li className="list-group-item">Siva Kumar Vutla <strong>N01604510</strong></li>
              <li className="list-group-item">Sarath Chandran Karintha <strong>N01626245</strong></li>
              <li className="list-group-item">Gnana Krishna Vamsi Goka <strong>N01606647</strong></li>
              <li className="list-group-item">Mani Krishna Katteboyina <strong>N01581471</strong></li>
            </ul>
          </section>
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