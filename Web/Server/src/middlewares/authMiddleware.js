import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "no token , Authorization denied",
            authHeader
        })
    }

    try {
        const decode = jwt.verify(token, "secret");
        req.homepartner = decode;
        console.log(req.homepartner);
        next();

    } catch (error) {
        console.log(error);
    }
}else{
    return res.status(401).json({
        message: "error token , Authorization denied",
        authHeader
    })  
}

}

export { verifyToken };