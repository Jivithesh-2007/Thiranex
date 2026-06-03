import React from 'react'

export default function Navbar(){
  return (
    <header className="nav">
      <div className="logo">Jivithesh</div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="hamburger">☰</div>
    </header>
  )
}
