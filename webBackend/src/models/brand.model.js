const mongoose = require("mongoose");
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;
const brandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
                default: null
            }
        ]
    },
    {
        timestamps: true,
    }
)
// add plugin that converts mongoose to json
brandSchema.plugin(toJSON);
brandSchema.plugin(paginate);
const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;