import React from 'react'

export default function Footer(){
  return (
    <footer>
      <div>© {new Date().getFullYear()} Jivithesh — All rights reserved</div>
      <div style={{marginTop:6}}>Quick links: <a href="#projects">Projects</a> • <a href="#skills">Skills</a></div>
    </footer>
  )
}
