import React from 'react'

function ProjectCard({p}){
  return (
    <div className="card">
      <div style={{height:140,background:'#eef2ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#1e293b'}}>{p.image? <img src={p.image} alt="" style={{maxWidth:'100%',maxHeight:140}} /> : 'Image'}</div>
      <h3 style={{marginTop:12}}>{p.title}</h3>
      <p style={{color:'#475569'}}>{p.description}</p>
      <div className="techs">{(p.techStack||[]).map(t=> <span key={t} className="tag">{t}</span>)}</div>
      <div style={{marginTop:12,display:'flex',gap:8}}>
        <a className="btn ghost" href={p.liveUrl||'#'} target="_blank">Live Demo</a>
        <a className="btn ghost" href={p.codeUrl||'#'} target="_blank">View Code</a>
      </div>
    </div>
  )
}

export default function Projects({projects=[]}){
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.length? projects.map(p=> <ProjectCard key={p._id||p.title} p={p} />) : [1,2,3].map(i=> (<div className="card" key={i}><div style={{height:140,background:'#f1f5f9',borderRadius:8}}></div><h3>Project {i}</h3><p>Short description goes here.</p></div>))}
      </div>
    </section>
  )
}
