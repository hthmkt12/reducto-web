import type { CollectionConfig } from 'payload'

export const Comparisons: CollectionConfig = {
  slug: 'comparisons',
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
        { label: 'Selected', value: 'Selected' },
        { label: 'Compared', value: 'Compared' },
        { label: 'Resolved', value: 'Resolved' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'baselineDocument',
      type: 'relationship',
      relationTo: 'documents',
      required: true,
    },
    {
      name: 'candidateDocument',
      type: 'relationship',
      relationTo: 'documents',
      required: true,
    },
    {
      name: 'deltas',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Addition', value: 'addition' },
            { label: 'Removal', value: 'removal' },
            { label: 'Modification', value: 'modification' },
          ],
        },
        {
          name: 'clause',
          type: 'relationship',
          relationTo: 'clauses',
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
    },
  ],
}
