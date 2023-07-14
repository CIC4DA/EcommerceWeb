const mongoose = require('mongoose');
const {Schema} = mongoose;

const brandSchema = new Schema({
    label : {
        type : String,
        required : true,
        unique : true,
    },
    value : {
        type : String,
        required : true,
        unique : true,
    }
})

// to _id to id
const virtual = brandSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

brandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){ delete ret._id}
})

module.exports = mongoose.model('Brand',brandSchema);