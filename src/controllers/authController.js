import  User from "../modules/User.js";

import bcrypt from "bcryptjs";

export const register = async (req,res)=>{
    const {fullName,email,password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).json({
            message : 'User is already exist',
        })
    }
    const passwordHasher = await bcrypt.hash(password,10)
    const user = await User.create({
        fullName,
        email,
        password : passwordHasher
    });

    return res.status(201).json({
        message: 'User created Successfully',
        user:{
            id : user._id,
            fullName: user.fullName,
            email: user.email
        }
    });
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    const exesting = User.findOne({email});
    if(!exesting){
        return res.status(401).json({
            message: "the User doesn't exist",
        })
    }
    const ismMtch = await bcrypt.compare(password,exesting.password);
    if(ismatch){
        return res.status(401).json({
            message: 'Invalid mail or password'
        })
    }
    return res.status(200).json({
        message: 'login succeful'
    });
};