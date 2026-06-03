const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');

const sampleProjects = [
  {
    title: 'E-commerce Store',
    description: 'Full stack e-commerce store with cart, payments, and admin dashboard.',
    image: '',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'Project Management App',
    description: 'Collaborative project management app with team roles and tasks.',
    image: '',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    title: 'Personal Blog',
    description: 'Markdown-powered blog with SEO and tagging.',
    image: '',
    techStack: ['Next.js', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    codeUrl: '#'
  }
];

const sampleSkills = [
  { category: 'Frontend', skills: [ { name: 'React', level: 'Advanced' }, { name: 'HTML/CSS', level: 'Advanced' }, { name: 'JavaScript', level: 'Advanced' }, { name: 'Tailwind CSS', level: 'Intermediate' }, { name: 'Bootstrap', level: 'Intermediate' } ] },
  { category: 'Backend', skills: [ { name: 'Node.js', level: 'Advanced' }, { name: 'Express.js', level: 'Advanced' }, { name: 'MongoDB', level: 'Advanced' }, { name: 'PostgreSQL', level: 'Intermediate' }, { name: 'REST APIs', level: 'Advanced' } ] },
  { category: 'Tools', skills: [ { name: 'Git', level: 'Advanced' }, { name: 'GitHub', level: 'Advanced' }, { name: 'VS Code', level: 'Advanced' }, { name: 'Postman', level: 'Intermediate' }, { name: 'Docker', level: 'Basic' } ] }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding');

    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Project.insertMany(sampleProjects);
    await Skill.insertMany(sampleSkills);

    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
