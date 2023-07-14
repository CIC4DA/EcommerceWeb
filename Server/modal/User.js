const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Buffer,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    addresses: {
        type : [Schema.Types.Mixed]
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
        required: true,
    },
    orders: { type: [Schema.Types.Mixed] },
    salt: {type: Buffer},
    resetPasswordToken : {
        type: String,
        default : ''    
    }
})

// to _id to id
const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

module.exports = mongoose.model('User', userSchema);