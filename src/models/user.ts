import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>
  roles: object[],
  estado: boolean
};

const userSchema = new Schema({
    username:{
    type: String,
    unique: true,
    required: true
    },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  roles:[{
    ref: "Role", 
    type: Schema.Types.ObjectId, 
  }]

},{
    timestamps: true,
    versionKey: false
});

userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);