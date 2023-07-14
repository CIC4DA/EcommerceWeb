const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
        min : [0,'Min Price is 0'],
    },
    discountPercentage : {
        type : Number,
        required : true,
        min : [0,'Min discountPercentage is 0'],
        max : [100,'Max discountPercentage is 100']
    },
    rating : {
        type : Number,
        required : true,
        min : [1,'Min rating is 0'],
        max : [5,'Max rating is 5'],
        default : 1       
    },
    stock : {
        type : Number,
        required : true,
        min : [0,'Min discountPercentage is 0'],
        default : 1    
    },
    brand : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    images : {
        type : [String],
        required : true,
    },
    deleted : {
        type : Boolean,
        default : false
    }

})

// to _id to id
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){ delete ret._id}
})

module.exports = mongoose.model('Product',productSchema);