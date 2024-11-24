import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cmsImage',
  title: 'Image Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
