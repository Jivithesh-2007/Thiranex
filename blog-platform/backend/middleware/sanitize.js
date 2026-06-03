const sanitizeHtml = require("sanitize-html");

const sanitizeMiddleware = (req, res, next) => {
  if (req.body.content) {
    req.body.content = sanitizeHtml(req.body.content, {
      allowedTags: [
        "b",
        "i",
        "em",
        "strong",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "a",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "code",
        "pre",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "td",
        "th",
      ],
      allowedAttributes: {
        a: ["href", "title", "target"],
        img: ["src", "alt", "width", "height"],
      },
    });
  }

  if (req.body.bio) {
    req.body.bio = sanitizeHtml(req.body.bio, {
      allowedTags: ["b", "i", "em", "strong", "p", "br", "a"],
      allowedAttributes: {
        a: ["href", "title", "target"],
      },
    });
  }

  next();
};

module.exports = sanitizeMiddleware;
