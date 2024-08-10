const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/UserSchema');
const router = express.Router()

const refreshTokens = new Set()

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//list all users
router.get('/users',async (req,res) => {
    let data = await User.find({})
    res.send(data)
})

///regsiter user
router.post('/register',async(req,res) => {
    try{
        const hashpassword = await bcrypt.hashSync(req.body.password,8)

        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            phone:req.body.phone,
            role:req.body.role ? req.body.role :'User'
        })

        res.status(200).send('Register succesful')

    }catch(err){
        console.log(err);
        res.status(500).send('Registration Failed')

    }
})

router.post('/login', async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(404).send({auth:false,token:'No User Found. Register First'})
        }

        //compare password
        const passIsValid = await bcrypt.compareSync(req.body.password,user.password)

        if(!passIsValid){
            return res.status(401).send({auth:false, token:'Invalid password'})
        }

        //generate token
        const token = jwt.sign({id:user._id},config.secert,{expiresIn:'2m'})
        const refreshToken= jwt.sign({id:user._id},config.refreshsecert,{expiresIn:'4m'})
        refreshTokens.add(refreshToken)

        res.status(200).send({auth:true,token});

    }catch(err){
        console.error(err)
        res.status(500).send({auth:false,token:'There was a problem with login'})
    }
})

// refresh
router.post('/refreshToken',async(req,res) => {
    const {refreshToken} = req.body;

    if (!refreshToken || !refreshTokens.has(refreshToken)){
        res.status(500).send({auth:false,token:'No refreshToken found'})
    }

    try{
        const decode = await jwt.verify(refreshToken, config.refreshsecert);

        const newRefreshToken = jwt.sign({id:user._id},config.refreshsecert,{expiresIn:'2m'})

        refreshTokens.delete(refreshToken)
        refreshTokens.add(newRefreshToken)

        res.status(200).send({auth:false,token:newRefreshToken})
    }catch(err){
        
    }

})


router.get('/userInfo', async(req,res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(404).send({auth:false,token:'No Token Found'})
    }

    try{

        const decoded = await jwt.verify(token, config.secert);
        console.log(decoded)
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).send({auth:false,token:'No User Found'})
        }

        res.send(user)
    }catch(err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).send({auth:false,token:'Invalid Token Found'})
        }

        console.error(err)
        res.status(500).send({auth:false,token:'There was a problem with user info'})
    }
})


module.exports = router