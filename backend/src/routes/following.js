import express from 'express'
import verifyToken from './../middleware/auth'
import Following from './../models/following.model'
const router = express.Router()

/**
 * @route POST api/following/followers/:userId
 * @desc show all follower of a user
 * @access Private
 */

router.post("/followers/:userId", verifyToken, async (req, res) => {
    try {
        const data = await Following.find({ followingId: req.params.userId }).populate('userId', ['username'])
        const followers = [];
        data.forEach(e => {
            followers.push(e.userId)
        });
        return res.json({ success: true, message: 'ok', followers: followers })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route POST api/following/followings/:userId
 * @desc show all followings of a user
 * @access Private
 */

router.post("/followings/:userId", verifyToken, async (req, res) => {
    try {
        const data = await Following.find({ userId: req.params.userId }).populate('followingId', ['username'])
        const followings = [];
        data.forEach(e => {
            followings.push(e.followingId)
        });
        return res.json({ success: true, message: 'ok', followings: followings })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})


/**
 * @route POST api/following/follow/:userId
 * @desc logged in user follow a user
 * @access Private
 */

router.post("/follow/:userId", verifyToken, async (req, res) => {
    try {
        const newFollow = new Following({ userId: req.userId, followingId: req.params.userId })
        await newFollow.save();
        return res.status(200).json({ success: true, message: "ok" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route DELETE api/following/follow/:userId
 * @desc logged in user unfollow a user
 * @access Private
 */

router.delete("/unfollow/:userId", verifyToken, async (req, res) => {
    const unfollowConditions = { userId: req.userId, followingId: req.params.userId }
    try {
        const relationDeleted = await Following.findOneAndDelete(unfollowConditions)
        if (!relationDeleted)
            return res.status(400).json({ success: false, message: "Unfollow failed" })
        return res.json({ success: true, message: "ok" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route DELETE api/following/follow/:userId
 * @desc logged in user delete a follower
 * @access Private
 */

router.delete("/delete-follower/:userId", verifyToken, async (req, res) => {
    const unfollowConditions = { userId: req.params.userId, followingId: req.userId }
    try {
        const relationDeleted = await Following.findOneAndDelete(unfollowConditions)
        if (!relationDeleted)
            return res.status(400).json({ success: false, message: "Remove follower failed" })
        return res.json({ success: true, message: "ok" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
})



module.exports = router