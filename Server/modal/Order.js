const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    items : {
        type: [Schema.Types.Mixed],
        required : true,
    },
    totalAmount : {
        type : Number,
        required : true,
    },
    totalItemCount : {
        type : Number,
        required : true,
    },
    user : {
        type: Schema.Types.ObjectId, ref: 'User',
        required : true,
    },
    paymentMethod : {
        type: String,
        required : true,
    },
    status : {
        type: String,
        default: "pending"
    },
    selectedAddress : {
        type: Schema.Types.Mixed,
        required : true,
    }
})

// to _id to id
const virtual = orderSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){ delete ret._id}
})

module.exports = mongoose.model('Order',orderSchema);