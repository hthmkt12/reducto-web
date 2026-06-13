import type { CollectionConfig } from 'payload'

export const WorkflowPhases: CollectionConfig = {
  slug: 'workflow-phases',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'index',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
    {
      name: 'kicker',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'artifact',
      type: 'text',
      required: true,
    },
    {
      name: 'checks',
      type: 'array',
      fields: [
        {
          name: 'check',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
