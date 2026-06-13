import type { CollectionConfig } from 'payload'

export const Audits: CollectionConfig = {
  slug: 'audits',
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
        { label: 'Queued', value: 'Queued' },
        { label: 'Checked', value: 'Checked' },
        { label: 'Remediation', value: 'Remediation' },
      ],
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'scope',
      type: 'textarea',
      required: true,
    },
    {
      name: 'checks',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'passed',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'evidence',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'requiresRemediation',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
