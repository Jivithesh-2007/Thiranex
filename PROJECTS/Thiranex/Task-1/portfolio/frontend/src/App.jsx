import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/projects`).then(r => setProjects(r.data)).catch(() => {});
    axios.get(`${API}/api/skills`).then(r => setSkills(r.data)).catch(() => {});
  }, [])

  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <About />
        <Contact apiUrl={API} />
      </main>
      <Footer />
    </div>
  )
}
