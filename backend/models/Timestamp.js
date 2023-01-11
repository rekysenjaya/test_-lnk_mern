const { Schema, model } = require('mongoose')

const timestampSchema = new Schema({
    login: {
        type: String,
    },
    logout: {
        type: String,
    },
    executor: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Timestamp', timestampSchema);