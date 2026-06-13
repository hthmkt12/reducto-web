import type { CollectionConfig } from 'payload'

export const SchemaTemplates: CollectionConfig = {
  slug: 'schema-templates',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'endpoint',
      type: 'text',
      required: true,
    },
    {
      name: 'ownership',
      type: 'text',
      required: true,
    },
    {
      name: 'workflow',
      type: 'text',
      required: true,
    },
    {
      name: 'fields',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Rich Text', value: 'richText' },
            { label: 'Select', value: 'select' },
            { label: 'Date', value: 'date' },
            { label: 'Group', value: 'group' },
            { label: 'Array', value: 'array' },
            { label: 'Relationship', value: 'relationship' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          required: true,
          defaultValue: false,
        },
        {
          name: 'note',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'relationships',
      type: 'array',
      fields: [
        {
          name: 'relation',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
