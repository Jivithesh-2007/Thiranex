import React from 'react'

export default function About(){
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <p>I am a Full Stack Developer with experience building modern web applications using React, Node.js and MongoDB. I enjoy designing user-first experiences and writing clean, maintainable code.</p>
      <p>My work includes building e-commerce platforms, project management tools and developer tooling. I like learning new technologies and improving performance and accessibility.</p>
      <div style={{display:'flex',gap:20,marginTop:12,alignItems:'center'}}>
        <div style={{flex:1}}>
          <h4>Education</h4>
          <p>Bachelor of Computer Science — Example University</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <div style={{textAlign:'center'}}><strong>12</strong><div style={{color:'#64748b'}}>Projects</div></div>
          <div style={{textAlign:'center'}}><strong>3</strong><div style={{color:'#64748b'}}>Years Exp</div></div>
        </div>
      </div>
      <a className="btn primary" href="#">Download Resume</a>
    </section>
  )
}
