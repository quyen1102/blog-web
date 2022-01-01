const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema
// const changeToSlug = require('../handlerActionPage/handleSlug.js')


const Blog = new Schema({
  name: {type: String, maxLength: 255, default: 'Quyen'},
  description: {type: String,  maxLength: 1000, default: 'hahaha'},
  img: {type: String, maxLength: 1000, default: ''},
  slug: {type: String, maxLength: 100, slug: 'name', unique: true},
}, {
  timestamps: true,
})


mongoose.plugin(slug)
Blog.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all',
 })
module.exports = mongoose.model('Blog', Blog);
