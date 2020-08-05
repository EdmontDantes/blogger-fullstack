const express = require('express');
const router = express.Router();
const Blog = require('./models/Blog');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/all-blogs', async (req, res) => {
  try {
    await Blog.find().then((blogFound) => {
      if(blogFound.length) {
        return res.status(200).json({ blogFound })
      } else {
        return res.status(200).json({ confirmation: 'Success', message: 'We have found no blogs yet please use add routes in our api to create some'})
      }
    }).catch((err) => {
      return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code GET.Find.Catch', error: err})
    })


  } catch {
    return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code GET.Async.Catch'})
  }
});


router.post('/create-blog', async (req, res) => {
  try {
    const { title, author, subject, article } =  req.body;
    let newBlogEntry = new Blog();
    if(title) newBlogEntry.title = title;
    if(author) newBlogEntry.author = author;
    if(subject) newBlogEntry.subject = subject;
    if(article) newBlogEntry.article = article;

    await newBlogEntry.save().then((savedCreatedBlog) => {
      return res.status(200).json({ yourSavedToDBCreatedBlogEntry: savedCreatedBlog});
    }).catch((err) => {
      return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code Post.save.Catch', error: err})
    })
  } catch {
    return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code POST.Async.Catch'})
  }
});

router.put('/update-blog/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, author, subject, article } =  req.body;
    await Blog.findById({ _id: blogId }).then((foundBlogEntryById) => {
      if(title) foundBlogEntryById.title = title;
      if(author) foundBlogEntryById.author = author;
      if(subject) foundBlogEntryById.subject = subject;
      if(article) foundBlogEntryById.article = article;
      foundBlogEntryById.save().then((savedUpdatedBlogEntry) => {
        return res.status(200).json({ yourSavedUpdatedToDBCreatedBlogEntry: savedUpdatedBlogEntry});
      }).catch((err) => {
        return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code Put.save.Catch', error: err})
      });
    }).catch((err) => {
      return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code Post.findById.Catch', error: err})
    })
  } catch {
    return res.status(500).json({confirmation: 'failed', message: 'Sorry Something is wrong contact the developer, error code PUT.Async.Catch'})
  }
})
module.exports = router;


