import type { CollectionConfig } from 'payload'

export const GapAnalyses: CollectionConfig = {
  slug: 'gap-analyses',
  admin: {
    useAsTitle: 'area',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'area',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'text',
      required: true,
    },
    {
      name: 'details',
      type: 'text',
      required: true,
    },
  ],
}
