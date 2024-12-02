
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Role from "../models/role";


function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email, roles: user.roles }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (req:any,res: any) => {

  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res.status(400).json({ msg: "complete each file" });
    }
  
    const user = await User.findOne({ email: req.body.email });
    const username = await User.findOne({ email: req.body.username });
    if (username || user) {
      return res.status(400).json({ msg: "The Username or Email already exists" });
    }
    
    const newUser = new User(req.body);
  
    if(req.body.roles){
      const foundRoles = await Role.find({ name: { $in: req.body.roles }});
      newUser.roles = foundRoles.map(role=> role._id)
      
    }else{
      const role = await Role.findOne({name: "user"})
      if(role) newUser.roles = [role._id]
    }
  
    await newUser.save();
    return res.status(201).json(newUser);

  } catch (error) {
    console.log(error);
    return res.status(400).json({msg: error})
  }
  
};

export const signIn = async (req:any,res: any) => {

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }

  return res.status(400).json({msg: "The email or password are incorrect"});
};