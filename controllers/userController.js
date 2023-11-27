const User = require('../models/UserModel');
const mailer = require('../utils/mailer')
const crypto = require('crypto')
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: 'Entered email id is already registered with us. Login to continue'
            })
        } 
        const user = new User({
            name, email, password
        })
        // errors from heroku: remove this  nodemailer part
        // //Generate 20 bit activation code, crypto is build in package of nodejs
        // crypto.randomBytes(20, function (err, buf) {

        //     //Ensure the activation link is unique
        //     user.activeToken = user._id + buf.toString('hex');
        //     //Set exporation time is 24 hours
        //     user.activeExpires = Date.now() + 24 * 3600 * 1000;
        //     var link = process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.PORT}/api/users/active/${user.activeToken}`
        //         : `${process.abort.env.api_host}/api/users/${user.activeToken}`

        //     //Sending activation mail
        //     mailer.send({
        //         to: req.body.email,
        //         subject: 'Welcome',
        //         html: 'Please Click <a href="' + link + '"> here</a> to activate your account.'
        //     })
       
            try {
                user.save()
                res.status(201).json({
                    success: true,
                    msg:'Account Created Successfully, Please Log in'
                })
            }
            catch (err) {
                next(err)
            }
             // })

        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Server having some issues'
        })
    }

}

// const activeToken = async (req, res, next) => {
//     //find the corresponding user
//     const userActive = await User.findOne({
//         activeToken: req.params.activeToken,
//         // activeExpires: { $gt: Date.now() }
//     })
//     console.log("userActive", userActive);
//     try {
//         //If invalid activation code
//         if (!userActive) {
//             return res.status(400).json({
//                 message: false,
//                 msg: "Your activation link is invalid"
//             });
//         }
//         else if (userActive.active == true) {
//             return res.status(200).json({
//                 success: true,
//                 msg: "your account already activated go and login to use this app"
//             });

//         }
//         // If not activated activate and save
//         userActive.active = true;
//         console.log("after", userActive);
//         try {
//             userActive.save();
//         } catch (err) {
//             next(err)
//         }
//         res.json({
//             success: true,
//             msg: 'Activation Success'
//         })

//     } catch (err) {
//         next(err)
//     }


// }

const authUser=async(req, res, next) => {
    const {email, password}=req.body;

    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            token:generateToken(user._id)
        })
    }else{
        res.status(401).json({
            success:false,
            msg:"Unauthorized user"
        })
    }

}

const getUserProfile = async(req, res, next) => {
    const user=await User.findById(req.header._id);

    if(user){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        })
    }else{
        res.status(404).json({
            success:false,
            msg:"User not found"
        })
    }
}

const updateUserProfile = async(req, res,) => {
    const user=await User.findById(req.header._id);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.avatar=req.body.avatar || user.avatar;

        const updatedUser=await user.save();
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            avatar:updatedUser.avatar,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404).json({
            success:false,
            msg:"User not found"
        })
    }
}


module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
}