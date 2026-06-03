module.exports = {
  ROLES: {
    READER: "reader",
    WRITER: "writer",
    ADMIN: "admin",
  },
  POST_STATUS: {
    DRAFT: "draft",
    PUBLISHED: "published",
    SCHEDULED: "scheduled",
  },
  DEFAULT_CATEGORIES: [
    { name: "Technology", slug: "technology" },
    { name: "Programming", slug: "programming" },
    { name: "Web Development", slug: "web-development" },
    { name: "JavaScript", slug: "javascript" },
    { name: "React", slug: "react" },
    { name: "Other", slug: "other" },
  ],
  DEFAULT_PAGE_LIMIT: 10,
  MAX_POSTS_PER_PAGE: 50,
  COMMENT_NESTING_DEPTH: 5,
};
