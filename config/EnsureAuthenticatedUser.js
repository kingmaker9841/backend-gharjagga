module.exports = {
    ensureAuthenticatedUser: (req,res,next)=>{
        if (!req.session.user){
           return res.status(401).json("Not Authenticated!");
        }
        next();
    }
}