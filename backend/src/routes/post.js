import express from 'express'
import Post from './../models/post.model'
import verifytToken from './../middleware/auth'

const router = express.Router()
/**
 * @route get api/posts
 * @desc show all post of loggin user
 * @access Private
 */

router.get('/', verifytToken, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.userId }).populate('userId', ['username']); //lay ra toan bo post cua user {userId} va lay thong tin tu bang user (loai bo truowng password)
        // const posts = await Post.find({ userId: req.userId }).populate({ path: 'comments', populate: { path: 'userId' } }, ['username']); //lay ra toan bo post cua user {userId} va lay thong tin tu bang user (loai bo truowng password)

        return res.json({ success: true, message: 'Created post successfuly', posts: posts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route POST api/posts
 * @desc logged in user add a post
 * @access Private
 */

router.post('/', verifytToken, async (req, res) => {
    const { content, image } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: "Title is required" })

    try {
        const newPost = new Post({ content: content, image: image, userId: req.userId })
        await newPost.save();
        return res.json({ success: true, message: 'Created post successfully', post: newPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route PUT api/posts/:id
 * @desc logged in user edit its post
 * @access Private
 */

router.put('/:id', verifytToken, async (req, res) => {
    const { content } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: "Title is required" })
    try {
        let updateValues = { content: content }
        const postUpdateCondition = { _id: req.params.id, userId: req.userId }
        let updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updateValues, { new: true })  //{new:true} de ham findOneAndUpdate tra ve post sau khi da update, neu khong them se tra ve post truoc khi update
        // neu xoa khong thanh cong
        if (!updatedPost)
            return res.status(401).json({ success: false, message: "Edit Unsuccessfully" })

        //all good
        return res.json({ success: true, message: 'Updated post successfully', post: updatedPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route DELETE api/posts/:id
 * @desc logged in user delete its post
 * @access Private
 */

router.delete('/:id', verifytToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, userId: req.userId }
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)
        //delete failed
        if (!deletedPost)
            return res.status(401).json({ success: false, message: "Delete failed" })
        //all good
        return res.json({ success: true, message: 'Delete post successfully', post: deletedPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})


/**
 * @route POST /api/post/like/:postId
 * @desc logged in user like a post
 * @access Private
 */

router.post('/like/:postId', verifytToken, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId })
        if (post.postLikes.some(item => item.userId == req.userId)) {
            console.log("nhanh da like");
            for (let i = 0; i < post.postLikes.length; i++) {
                if (post.postLikes[i].userId == req.userId) {
                    post.postLikes.splice(i, 1);
                }
            }
        } else {
            console.log("nhanh chua like");
            post.postLikes.push({ userId: req.userId })
        }
        const newPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { postLikes: post.postLikes }, { new: true })
        return res.json({ success: true, message: 'ok', post: newPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route POST /api/post/comment/:id
 * @desc logged in user comment in a post
 * @access Private
 */

router.post('/comment/:postId', verifytToken, async (req, res) => {
    const { content } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: "Comment is required" })

    try {
        let post = await Post.findOne({ _id: req.params.postId })
        const newComment = {
            userId: req.userId,
            content: content
        }
        post.comments.push(newComment)
        const newPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { comments: post.comments }, { new: true })
        console.log(newPost);
        return res.json({ success: true, message: "Commented", post: newPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

})

/**
 * @route POST /api/post/comment/like/:id
 * @desc logged in user like a comment in a post, dislike if liked before
 * @access Private
 */

router.post('/comment/like/:postId/:commentId', verifytToken, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId })
        for (let i = 0; i < post.comments.length; i++) {
            if (post.comments[i]._id == req.params.commentId) {
                // neu user hien tai da like comment nay => dislike
                if (post.comments[i].cmtLikes.some(item => item.userId == req.userId)) {
                    for (let j = 0; j < post.comments[i].cmtLikes.length; j++) {
                        if (post.comments[i].cmtLikes[j].userId == req.userId) {
                            post.comments[i].cmtLikes.splice(j, 1);
                        }
                    }
                } else {
                    //neu user hien tai chua like comment nay =>like
                    post.comments[i].cmtLikes.push({ userId: req.userId });
                }
            }
        }
        const newPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { comments: post.comments }, { new: true })
        return res.json({ success: true, message: 'ok', post: newPost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route GET /api/post/:postId
 * @desc show details post
 * @access Public
 */

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId })

        if (!post)
            return res.status(400).json({ success: false, message: "post not found" })

        return res.status(200).json({ success: true, message: "ok", post: post })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})


module.exports = router