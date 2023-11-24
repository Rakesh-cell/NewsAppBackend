const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema= mongoose.Schema(
    {
        name:{
            type: 'string',
            required: true,
        },
        email:{
            type: 'string',
            required: true,
            unique: true
        },
        password:{
            type: 'string',
            required: true,
        },
        avatar:{
            type: 'string',
            default:''
        },
    }
)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt= await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password,salt);
})

module.exports = mongoose.model('User',userSchema);