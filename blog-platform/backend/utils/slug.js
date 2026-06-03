// Generate URL-safe slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Make slug unique by adding timestamp if needed
const makeSlugUnique = async (baseSlug, model, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  let query = { slug };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  while (await model.findOne(query)) {
    slug = `${baseSlug}-${counter}`;
    query.slug = slug;
    counter++;
  }

  return slug;
};

// Calculate read time (roughly 200 words per minute)
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const htmlRegex = /<[^>]*>/g;
  const plainText = content.replace(htmlRegex, "");
  const wordCount = plainText.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime);
};

// Format date helper
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Time ago helper
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

module.exports = {
  generateSlug,
  makeSlugUnique,
  calculateReadTime,
  formatDate,
  timeAgo,
};
