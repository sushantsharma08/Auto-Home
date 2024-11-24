
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.homepartner.role)){
            return res.status(403).json({message:"access denied!"})
        }
        next();
    }
}

export { authorizeRoles };