const mongoose = require("mongoose");
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;
const basketSchema = new Schema(
    {
        purchasedProducts: [
            {
                productId:{
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    default: null,
                },
                numberOfProduct:{
                    type:Number,
                    default:1
                }
            }
        ],
        userId:{
                type: Schema.Types.ObjectId,
                ref: "User",
                default: null
        },
        totalCost:{
            type:Number,
            default:0
        }

    },
    {
        timestamps: true,
    }
)
// add plugin that converts mongoose to json
basketSchema.plugin(toJSON);
basketSchema.plugin(paginate);
const Basket = mongoose.model("Basket", basketSchema);
module.exports = Basket;