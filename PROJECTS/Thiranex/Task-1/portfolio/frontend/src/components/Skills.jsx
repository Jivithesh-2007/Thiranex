import React from 'react'

export default function Skills({skills=[]}){
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-row">
        {skills.length? skills.map(s=> (
          <div className="skill-card" key={s._id||s.category}>
            <h4>{s.category}</h4>
            <ul>
              {s.skills.map(sk=> <li key={sk.name}>{sk.name} — {sk.level}</li>)}
            </ul>
          </div>
        )) : (
          <div className="skill-card">Loading skills...</div>
        )}
      </div>
    </section>
  )
}
