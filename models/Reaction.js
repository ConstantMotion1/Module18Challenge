const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            Required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            Required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
              },
        }
    },
    {
        toJSON: {
          getters: true,
        },
      },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;