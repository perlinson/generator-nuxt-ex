import mongoose, { Schema } from 'mongoose'

const cardSchema = new Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  details: {
    type: String
  },
  image: {
    type: String
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

cardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      desc: this.desc,
      details: this.details,
      image: this.image,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Card', cardSchema)

export const schema = model.schema
export default model
