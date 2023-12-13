const express = require("express");
const nano = require("nano")("https://admin:password@couchdb.leftprazz.com");
const app = express();
const port = 4000;

// Middleware to parse JSON data
app.use(express.json());

const db = nano.use("blogposts");

// Create a new blog post
app.post("/posts", async (req, res) => {
    const { title, description, author } = req.body;
  
    try {
      const doc = await db.insert({
        title,
        description,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      res.json({ id: doc.id, rev: doc.rev });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating post");
    }
  });
  
  // Get all blog posts
  app.get("/posts", async (req, res) => {
    try {
      const docs = await db.list({ include_docs: true });
      res.json(docs.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving posts");
    }
  });
  
  // Get a specific blog post
  app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const doc = await db.get(id);
      res.json(doc);
    } catch (err) {
      console.error(err);
      res.status(404).send("Post not found.");
    }
  });
  
  // Update a blog post
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const existingDoc = await db.get(id);
    
    // Add the revision to the document before saving
    existingDoc.title = title;
    existingDoc.description = description;
    existingDoc.updatedAt = new Date();

    const updatedDoc = await db.insert(existingDoc);

    res.json({ message: "Post updated successfully", rev: updatedDoc.rev });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});
  
// Delete a blog post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Get the current document revision before deleting
    const doc = await db.get(id);

    // Delete the document with the correct revision
    await db.destroy(id, doc._rev);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    // Handle conflict or other errors
    console.error(err);
    if (err.statusCode === 409) {
      res.status(409).send("Document update conflict. Please try again.");
    } else {
      res.status(500).send("Error deleting post");
    }
  }
});

  
  app.listen(port, () => {
    console.log(`Blogpost app listening on port ${port}`);
  });