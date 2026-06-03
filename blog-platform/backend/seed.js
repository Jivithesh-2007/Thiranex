require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Category = require("./models/Category");
const Tag = require("./models/Tag");
const { generateSlug, makeSlugUnique } = require("./utils/slug");
const { DEFAULT_CATEGORIES } = require("./utils/constants");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});

    // Create categories
    const categories = await Category.insertMany(DEFAULT_CATEGORIES);
    console.log("✓ Categories created");

    // Create users
    const users = await User.create([
      {
        name: "John Developer",
        email: "john@example.com",
        password: "password123",
        bio: "Full-stack developer passionate about React and Node.js",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "writer",
        socialLinks: {
          twitter: "https://twitter.com",
          github: "https://github.com",
        },
      },
      {
        name: "Sarah Designer",
        email: "sarah@example.com",
        password: "password123",
        bio: "UI/UX designer specializing in web interfaces",
        avatar: "https://i.pravatar.cc/150?img=2",
        role: "writer",
        socialLinks: {
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
        },
      },
      {
        name: "Mike Tech",
        email: "mike@example.com",
        password: "password123",
        bio: "Tech writer and JavaScript enthusiast",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "writer",
      },
      {
        name: "Alice Reader",
        email: "alice@example.com",
        password: "password123",
        role: "reader",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    ]);

    console.log("✓ Users created");

    // Create posts
    const postData = [
      {
        title: "Getting Started with React Hooks",
        content: `<h2>Introduction</h2>
          <p>React Hooks revolutionized the way we write React components. Let's explore how to use them effectively.</p>
          <h3>useState Hook</h3>
          <p>The useState hook allows you to add state to functional components. Here's a simple example:</p>
          <pre><code>const [count, setCount] = useState(0);</code></pre>
          <h3>useEffect Hook</h3>
          <p>useEffect lets you perform side effects in functional components. It replaces lifecycle methods.</p>`,
        excerpt: "Learn how to use React Hooks to write cleaner, more efficient React components...",
        category: "React",
        tags: ["react", "hooks", "javascript"],
        status: "published",
        authorId: users[0]._id,
        featuredImage:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      },
      {
        title: "The Complete Guide to Express.js Middleware",
        content: `<h2>What is Middleware?</h2>
          <p>Middleware functions in Express.js are functions that have access to the request, response, and the next function.</p>
          <h3>Built-in Middleware</h3>
          <p>Express provides several built-in middleware functions. The most common is express.json() for parsing JSON.</p>
          <h3>Custom Middleware</h3>
          <p>You can create custom middleware to handle authentication, logging, and error handling.</p>`,
        excerpt: "Master Express middleware and learn how to build scalable Node.js applications...",
        category: "Programming",
        tags: ["express", "nodejs", "middleware"],
        status: "published",
        authorId: users[0]._id,
        featuredImage:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      },
      {
        title: "Web Design Trends in 2024",
        content: `<h2>Latest Design Trends</h2>
          <p>Web design continues to evolve. Let's look at the most important trends shaping the industry in 2024.</p>
          <h3>Dark Mode Everywhere</h3>
          <p>Dark mode has become a standard expectation in modern web applications.</p>
          <h3>Glassmorphism</h3>
          <p>This design trend features a frosted glass effect that creates depth and visual hierarchy.</p>`,
        excerpt: "Discover the latest web design trends that will dominate in 2024...",
        category: "Web Development",
        tags: ["design", "web-design", "trends"],
        status: "published",
        authorId: users[1]._id,
        featuredImage:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      },
      {
        title: "JavaScript ES2024 Features You Need to Know",
        content: `<h2>New JavaScript Features</h2>
          <p>JavaScript continues to evolve with new features every year. Here are the most impactful ES2024 features.</p>
          <h3>Pattern Matching</h3>
          <p>Pattern matching provides a more elegant way to handle complex data structures.</p>
          <h3>Records and Tuples</h3>
          <p>These new primitive types help create immutable data structures.</p>`,
        excerpt: "Explore the newest JavaScript features coming in ES2024...",
        category: "JavaScript",
        tags: ["javascript", "es2024", "programming"],
        status: "published",
        authorId: users[2]._id,
        featuredImage:
          "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800",
      },
      {
        title: "Building Scalable Node.js Applications",
        content: `<h2>Scalability Strategies</h2>
          <p>As your Node.js application grows, scalability becomes crucial. Let's explore best practices.</p>
          <h3>Database Optimization</h3>
          <p>Use indexes, connection pooling, and query optimization to improve performance.</p>
          <h3>Caching Strategies</h3>
          <p>Implement Redis caching to reduce database queries and improve response times.</p>`,
        excerpt: "Learn how to build highly scalable Node.js applications that handle millions of users...",
        category: "Programming",
        tags: ["nodejs", "scalability", "performance"],
        status: "published",
        authorId: users[0]._id,
        featuredImage:
          "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800",
      },
    ];

    const posts = await Post.insertMany(
      postData.map((post) => ({
        ...post,
        slug: generateSlug(post.title),
        publishedAt: new Date(),
      }))
    );

    console.log("✓ Posts created");

    // Create comments
    const comments = await Comment.insertMany([
      {
        content: "Great explanation of React Hooks! Very helpful for beginners.",
        postId: posts[0]._id,
        authorId: users[3]._id,
        approved: true,
      },
      {
        content:
          "I love this guide. The examples are clear and easy to follow.",
        postId: posts[0]._id,
        authorId: users[1]._id,
        approved: true,
      },
      {
        content: "Could you explain useReducer in more detail?",
        postId: posts[0]._id,
        authorId: users[2]._id,
        approved: true,
        parentCommentId: null,
      },
      {
        content:
          "Sure! useReducer is great for complex state logic. I'll write another post about it soon.",
        postId: posts[0]._id,
        authorId: users[0]._id,
        approved: true,
        parentCommentId: null,
      },
      {
        content: "Excellent breakdown of Express middleware!",
        postId: posts[1]._id,
        authorId: users[3]._id,
        approved: true,
      },
      {
        content: "Your design trends article is spot on. Love the glassmorphism section!",
        postId: posts[2]._id,
        authorId: users[0]._id,
        approved: true,
      },
    ]);

    console.log("✓ Comments created");

    // Update post comment counts
    await Post.findByIdAndUpdate(posts[0]._id, { commentCount: 4 });
    await Post.findByIdAndUpdate(posts[1]._id, { commentCount: 1 });
    await Post.findByIdAndUpdate(posts[2]._id, { commentCount: 1 });

    console.log("✓ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
