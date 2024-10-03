const router = require("express").Router();
const { Post, Comment, User, Reply, Photo } = require("../../models/");
const { apiGuard } = require("../../utils/authGuard");

router.post("/", apiGuard, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.put("/:id", apiGuard, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", apiGuard, async (req, res) => {
  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (Array.isArray(result) && result.length > 0) {
      console.log(affectedRows, "the fuck is this");
      const [affectedRows] = result;
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } else {
      console.log("this?????");
      res.status(200).json({ message: "server deleted post" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/checkposts", async (req, res) => {
  try {
    const allmyPosts = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [
            { model: User, attributes: ["username"] },
            { model: Reply, attributes: ["body"] },
          ],
        },
        { model: Photo, attributes: ["id", "title", "description", "postId"] },
      ],
    });
    console.log("Found Posts:", allmyPosts);
    res.status(200).json(allmyPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/postlist", apiGuard, async (req, res) => {
  try {
    const thePostList = await Post.findAll();
    console.log(thePostList);
    res.status(200).json(thePostList);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const focusPost = await Post.findByPk(req.params.id, {
      include: [{ model: Comment,  include: [
        { model: User, attributes: ["username"] },
        { model: Reply, attributes: ["body"] },
      ],
    },
    { model: Photo, attributes: ["id", "title", "description", "postId"] }],
    });
    res.status(200).json(focusPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
