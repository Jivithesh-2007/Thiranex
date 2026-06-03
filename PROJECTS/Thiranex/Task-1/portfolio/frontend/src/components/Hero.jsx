import React from 'react'

export default function Hero(){
  return (
    <section id="home" className="hero">
      <div className="left">
        <h1>Jivithesh — Full Stack Developer</h1>
        <p className="tagline">Full Stack Developer | Building Web Solutions</p>
        <div className="cta">
          <a className="btn primary" href="#projects">View My Work</a>
          <a className="btn ghost" href="#contact">Contact Me</a>
        </div>
      </div>
      <div className="right">
        <img src="/profile-placeholder.png" alt="avatar" style={{width:160,borderRadius:12}} />
      </div>
    </section>
  )
}
