import React, { useState } from 'react'
import axios from 'axios'

export default function Contact({apiUrl}){
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [loading,setLoading] = useState(false)
  const [status,setStatus] = useState(null)

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!form.name||!form.email||!form.message){setStatus({error:'Please complete all fields'});return}
    setLoading(true);setStatus(null)
    try{
      await axios.post(`${apiUrl}/api/contact`, form)
      setStatus({ok:'Message sent — thanks!'});
      setForm({name:'',email:'',message:''})
    }catch(err){setStatus({error:'Submission failed'})}
    setLoading(false)
  }

  return (
    <section id="contact" className="contact">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8,maxWidth:600}}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <textarea name="message" placeholder="Message" rows={6} value={form.message} onChange={handleChange} />
        <button className="btn primary" type="submit" disabled={loading}>{loading? 'Sending...' : 'Send Message'}</button>
        {status?.ok && <div style={{color:'green'}}>{status.ok}</div>}
        {status?.error && <div style={{color:'red'}}>{status.error}</div>}
      </form>
      <div style={{marginTop:12}}>
        <div>Social: <a href="#">LinkedIn</a> • <a href="#">GitHub</a> • <a href="#">Twitter</a></div>
        <div style={{marginTop:8,color:'#475569'}}>Email: classforge07@gmail.com • Location: India • Phone: +91-XXXXXXXXXX</div>
      </div>
    </section>
  )
}
