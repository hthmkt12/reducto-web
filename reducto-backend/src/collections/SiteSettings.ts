import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
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
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'landingSections',
      type: 'array',
      fields: [
        {
          name: 'sectionId',
          type: 'select',
          required: true,
          options: [
            { label: 'Integrations', value: 'integrations' },
            { label: 'Docs', value: 'docs' },
            { label: 'Pricing', value: 'pricing' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaHref',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'detail',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
