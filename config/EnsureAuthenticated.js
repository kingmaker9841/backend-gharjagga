module.exports = {
    ensureAuthenticated: (req,res,next)=>{
        if (!req.session.admin){
           return res.status(401).json("Not Authenticated!");
        }
        next();
    }
}