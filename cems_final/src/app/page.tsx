'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events/home');
      const data = await res.json();
      setOngoingEvents(data.ongoingEvents || []);
      setUpcomingEvents(data.upcomingEvents || []);
    };
    fetchEvents();
  }, []);

  const renderCard = (event: any, btnText: string = 'Join Now') => (
    <div key={event._id} className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body text-center">
          <h3 className="card-title">{event.name}</h3>
          <p className="card-text">{new Date(event.date).toLocaleDateString()}</p>
          <button className="btn btn-success">{btnText}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-3">🎭 CEMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link">About</Link></li>
              <li className="nav-item"><Link href="/dashboard/events" className="nav-link">Events</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>
            </ul>
            <div className="d-flex">
              <Link href="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link href="/register" className="btn btn-primary">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
        <h1 className="display-3 fw-bold">
  Welcome to <span style={{ letterSpacing: '2px', color: '#ffeb3b' }}>
    C<span style={{ textTransform: 'lowercase' }}>ommunity </span>
    E<span style={{ textTransform: 'lowercase' }}>vent </span>
    M<span style={{ textTransform: 'lowercase' }}>anagement </span>
    S<span style={{ textTransform: 'lowercase' }}>ystem</span>
  </span>
</h1>

          <p className="lead">Your one-stop solution for organizing and participating in community events.</p>
          <Link href="/register" className="btn btn-light btn-lg fw-bold">Get Started</Link>
        </div>
      </header>

      {/* Ongoing Events Section */}
      <section className="container text-center my-5">
        <h2 className="mb-4">🎉 Ongoing Events</h2>
        <div className="row">
          {ongoingEvents.length > 0
            ? ongoingEvents.map(event => renderCard(event, 'Join Now'))
            : <p>No ongoing events found.</p>}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="container text-center my-5">
        <h2 className="mb-4">🚀 Upcoming Events</h2>
        <div className="row">
          {upcomingEvents.length > 0
            ? upcomingEvents.map(event => renderCard(event, 'Learn More'))
            : <p>No upcoming events found.</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="m-0">© {new Date().getFullYear()} CEMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
