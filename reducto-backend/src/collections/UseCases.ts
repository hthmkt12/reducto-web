import type { CollectionConfig } from 'payload'

export const UseCases: CollectionConfig = {
  slug: 'use-cases',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'audience',
      type: 'text',
      required: true,
    },
    {
      name: 'priority',
      type: 'select',
      required: true,
      options: [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Defined', value: 'Defined' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Draft', value: 'Draft' },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'details',
      type: 'text',
      required: true,
    },
    {
      name: 'gap',
      type: 'text',
      required: true,
    },
  ],
}
