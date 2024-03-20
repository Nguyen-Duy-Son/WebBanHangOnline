const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const productSchema = new Schema ({
    name:{
        type:String,
        required:[true,"Please provide your nameProduct!"],
        trim: true,
        unique: true
    },
    nameBrand:{
        type:String,
        required:[true,"Please provide your nameBrand!"],
        trim: true,
    },
    cost:{
        type:Number,
        required:[true,"Please provide your costProduct!"],
    },
    image:{
        type: String,
        default: null,
    }
})

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;




