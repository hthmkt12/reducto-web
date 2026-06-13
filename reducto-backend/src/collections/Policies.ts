import type { CollectionConfig } from 'payload'

export const Policies: CollectionConfig = {
  slug: 'policies',
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
        { label: 'Proposed', value: 'Proposed' },
        { label: 'Compliance review', value: 'Compliance review' },
        { label: 'Active', value: 'Active' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'jurisdiction',
      type: 'text',
      required: true,
    },
    {
      name: 'effectiveDate',
      type: 'date',
      required: true,
    },
    {
      name: 'exceptions',
      type: 'array',
      fields: [
        {
          name: 'rationale',
          type: 'textarea',
          required: true,
        },
        {
          name: 'owner',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
  ],
}
