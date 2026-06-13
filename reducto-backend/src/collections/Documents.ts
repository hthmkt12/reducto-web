import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
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
        { label: 'Draft', value: 'Draft' },
        { label: 'Legal review', value: 'Legal review' },
        { label: 'Signed off', value: 'Signed off' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'sourceFile',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'notes',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'signoff',
      type: 'group',
      fields: [
        {
          name: 'approver',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'timestamp',
          type: 'date',
        },
        {
          name: 'disposition',
          type: 'select',
          options: [
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ],
        },
      ],
    },
  ],
}
