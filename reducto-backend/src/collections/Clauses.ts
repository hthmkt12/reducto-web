import type { CollectionConfig } from 'payload'

export const Clauses: CollectionConfig = {
  slug: 'clauses',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Extracted', value: 'Extracted' },
        { label: 'Classified', value: 'Classified' },
        { label: 'Reusable', value: 'Reusable' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'clauseText',
      type: 'richText',
      required: true,
    },
    {
      name: 'clauseType',
      type: 'select',
      required: true,
      options: [
        { label: 'Indemnity', value: 'Indemnity' },
        { label: 'Liability', value: 'Liability' },
        { label: 'Termination', value: 'Termination' },
        { label: 'IP', value: 'IP' },
        { label: 'Governing Law', value: 'Governing Law' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'sourceLocation',
      type: 'group',
      fields: [
        {
          name: 'document',
          type: 'relationship',
          relationTo: 'documents',
        },
        {
          name: 'page',
          type: 'text',
        },
        {
          name: 'section',
          type: 'text',
        },
        {
          name: 'confidence',
          type: 'text',
        },
      ],
    },
  ],
}
