const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    quantity : {
        type : Number,
        required : true,
        min : [0,'Min quantity is 0'],
    },
    // from ref, we are able to fetch full product data
    product : {
        type: Schema.Types.ObjectId, ref: 'Product',
        required : true,
    },
    user : {
        type: Schema.Types.ObjectId, ref: 'User',
        required : true,
    }
})

// to _id to id
const virtual = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){ delete ret._id}
})

module.exports = mongoose.model('Cart',cartSchema);