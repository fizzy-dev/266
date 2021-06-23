import jwt from 'jsonwebtoken'

// sau khi dang nhap, ser ver ggui cho client 1 token, token do duoc ma hoa bang khoa bi mat va id cua user, client luu token do vao local storage. Khi nguoi dung muon truy cap vao nhung route Private, phai gui 
//kem token vao header dang Authorization : Bearer ${token}


// Authorization : Bearer askfjasiqwjiasdfjk290323
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // lay token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ success: false, message: "Access token not found" })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" })
    }

}

module.exports=verifyToken;