import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (_request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Fetch or Seed Site Settings
  let siteSettingsList = await payload.find({
    collection: 'site-settings',
    limit: 1,
  })

  if (siteSettingsList.docs.length === 0) {
    // Seed site settings
    await payload.create({
      collection: 'site-settings',
      data: {
        title: 'Reducto Settings',
        navItems: [
          { label: 'Use Case Driven Workflow', href: '#workflow' },
          { label: 'Integrations', href: '#integrations' },
          { label: 'Docs', href: '#docs' },
          { label: 'Pricing', href: '#pricing' },
        ],
        landingSections: [
          {
            sectionId: 'integrations',
            title: 'Integrations',
            summary: 'Connect document inputs, editorial review, and future CMS publishing without pulling backend code into the landing page.',
            ctaLabel: 'Open schema',
            ctaHref: '#schema',
            items: [
              { label: 'Payload boundary', detail: 'Frontend content stays behind the typed ReductoContent adapter.' },
              { label: 'Document sources', detail: 'Contracts, policies, audits, clauses, and comparisons map into reusable workflow records.' },
              { label: 'Review systems', detail: 'Gap status and owner-ready metadata prepare each model for approval paths.' },
            ],
          },
          {
            sectionId: 'docs',
            title: 'Docs',
            summary: 'Keep the operating manual close to the workflow: use cases, schema notes, checks, and rollout decisions in one readable trail.',
            ctaLabel: 'View use cases',
            ctaHref: '#use-cases',
            items: [
              { label: 'Use-case notes', detail: 'Each audience need is captured before schema work starts.' },
              { label: 'Schema references', detail: 'Payload model previews make future CMS handoff explicit.' },
              { label: 'Known issues', detail: 'Navigation, build, and smoke-test learnings stay documented for the next pass.' },
            ],
          },
          {
            sectionId: 'pricing',
            title: 'Pricing',
            summary: 'Start with the editorial frontend, then scale the backend boundary when the document workflow is proven.',
            ctaLabel: 'Request a demo',
            ctaHref: '#contact',
            items: [
              { label: 'Starter', detail: 'Static workflow page, typed seed content, and Vercel-ready build.' },
              { label: 'Team', detail: 'Payload API contract, editorial roles, and review state planning.' },
              { label: 'Scale', detail: 'Multi-channel publishing, localization, and governance-ready expansion.' },
            ],
          },
        ],
      },
    })
    siteSettingsList = await payload.find({
      collection: 'site-settings',
      limit: 1,
    })
  }

  // 2. Fetch or Seed Workflow Phases
  let phasesList = await payload.find({
    collection: 'workflow-phases',
    sort: 'index',
  })

  if (phasesList.docs.length === 0) {
    const phasesData = [
      {
        index: '01',
        label: 'Brief',
        summary: 'Capture goals, context, audience, and success criteria.',
        href: '#brief',
        kicker: '01 / Brief',
        title: 'Turn a document request into a usable editorial brief.',
        description: 'Capture the audience, job-to-be-done, source material, and success criteria before the team starts shaping content or schema.',
        artifact: 'Brief packet with audience, owner, source documents, and approval path.',
        checks: [{ check: 'Audience and owner named' }, { check: 'Source material attached' }, { check: 'Success criteria written' }],
      },
      {
        index: '02',
        label: 'Build',
        summary: 'Structure content and data models that reflect real editorial needs.',
        href: '#build',
        kicker: '02 / Build',
        title: 'Shape the content and model around the work it must support.',
        description: 'Translate the brief into structured content blocks, relationships, and Payload-ready fields without crossing the frontend/backend boundary.',
        artifact: 'Draft content model and selected use-case schema preview.',
        checks: [{ check: 'Fields match workflow needs' }, { check: 'Relationships are traceable' }, { check: 'Status states are explicit' }],
      },
      {
        index: '03',
        label: 'Check',
        summary: 'Compare the draft against coverage, quality, and review rules.',
        href: '#check',
        kicker: '03 / Check',
        title: 'Compare the draft against coverage, quality, and review rules.',
        description: 'Use the gap analysis to find missing metadata, weak relationships, inconsistent status, and ownership issues before publishing.',
        artifact: 'Gap table with status, impact, and next correction.',
        checks: [{ check: 'Required fields covered' }, { check: 'Review state visible' }, { check: 'Weak links called out' }],
      },
      {
        index: '04',
        label: 'Patch',
        summary: 'Resolve gaps and refine content, schema, and relationships.',
        href: '#patch',
        kicker: '04 / Patch',
        title: 'Close the gaps while the context is still fresh.',
        description: 'Patch content, schema, and review notes together so fixes do not drift away from the use case that justified them.',
        artifact: 'Resolved gap list with changed fields and reviewer notes.',
        checks: [{ check: 'Each gap has an owner' }, { check: 'Patch reason is recorded' }, { check: 'Schema preview still compiles' }],
      },
      {
        index: '05',
        label: 'Expand',
        summary: 'Scale with confidence across channels, locales, and teams.',
        href: '#expand',
        kicker: '05 / Expand',
        title: 'Scale the workflow to new teams, channels, and variants.',
        description: 'Promote proven patterns into reusable editorial rails for more document types, languages, and downstream review surfaces.',
        artifact: 'Reusable workflow pattern ready for a future API client or CMS backend.',
        checks: [{ check: 'Pattern is reusable' }, { check: 'Channel needs are named' }, { check: 'Backend contract remains stable' }],
      },
    ]

    for (const phase of phasesData) {
      await payload.create({
        collection: 'workflow-phases',
        data: phase,
      })
    }

    phasesList = await payload.find({
      collection: 'workflow-phases',
      sort: 'index',
    })
  }

  // 3. Fetch or Seed Use Cases
  let useCasesList = await payload.find({
    collection: 'use-cases',
  })

  if (useCasesList.docs.length === 0) {
    const useCasesData = [
      {
        id: 'contract-review',
        title: 'Contract Review',
        audience: 'Legal',
        priority: 'High' as const,
        status: 'Defined' as const,
        slug: 'documents',
        details: 'Long-form review with structured sections and traceable edits.',
        gap: 'Missing author notes and signed-off metadata.',
      },
      {
        id: 'policy-analysis',
        title: 'Policy Analysis',
        audience: 'Operations',
        priority: 'High' as const,
        status: 'Defined' as const,
        slug: 'policies',
        details: 'Editorial analysis for compliance, updates, and exceptions.',
        gap: 'No reusable policy variants or change history.',
      },
      {
        id: 'compliance-check',
        title: 'Compliance Check',
        audience: 'Reviewers',
        priority: 'Medium' as const,
        status: 'In Progress' as const,
        slug: 'audits',
        details: 'Validate required fields, approvals, and ownership boundaries.',
        gap: 'Validation rules still need stricter ownership checks.',
      },
      {
        id: 'clause-extraction',
        title: 'Clause Extraction',
        audience: 'Analysts',
        priority: 'Medium' as const,
        status: 'Draft' as const,
        slug: 'clauses',
        details: 'Turn long documents into searchable structured records.',
        gap: 'Structured blocks not mapped to repeatable CMS fields yet.',
      },
      {
        id: 'document-comparison',
        title: 'Document Comparison',
        audience: 'Teams',
        priority: 'Low' as const,
        status: 'Draft' as const,
        slug: 'comparisons',
        details: 'Show change deltas across versions, authors, and markets.',
        gap: 'Diff view needs a richer timeline and version anchors.',
      },
    ]

    for (const uc of useCasesData) {
      await payload.create({
        collection: 'use-cases',
        data: uc,
      })
    }

    useCasesList = await payload.find({
      collection: 'use-cases',
    })
  }

  // 4. Fetch or Seed Gap Analyses
  let gapAnalysesList = await payload.find({
    collection: 'gap-analyses',
  })

  if (gapAnalysesList.docs.length === 0) {
    const gapRowsData = [
      { area: 'Metadata', status: 'Open', details: 'Missing fields in 3 models' },
      { area: 'Relationships', status: 'Open', details: '2 weak links detected' },
      { area: 'Validations', status: 'In progress', details: '5 rules need refinement' },
      { area: 'Permissions', status: 'Open', details: 'Role scope mismatch' },
      { area: 'Workflows', status: 'In progress', details: '2 flows incomplete' },
    ]

    for (const row of gapRowsData) {
      await payload.create({
        collection: 'gap-analyses',
        data: row,
      })
    }

    gapAnalysesList = await payload.find({
      collection: 'gap-analyses',
    })
  }

  // 5. Fetch or Seed Schema Templates (handoff previews)
  let schemaTemplatesList = await payload.find({
    collection: 'schema-templates',
  })

  if (schemaTemplatesList.docs.length === 0) {
    const sharedFields = [
      { name: 'title', fieldType: 'text' as const, required: true, note: 'Primary editorial label used in workflow lists.' },
      { name: 'status', fieldType: 'select' as const, required: true, note: 'Draft, review, approved, or archived publishing state.' },
      { name: 'owner', fieldType: 'relationship' as const, required: true, note: 'Links the record to the responsible team or reviewer.' },
    ]

    const schemasData = [
      {
        slug: 'documents',
        label: 'Documents',
        endpoint: '/api/documents',
        ownership: 'Legal editors',
        workflow: 'Draft -> Legal review -> Signed off',
        fields: [
          ...sharedFields,
          { name: 'sourceFile', fieldType: 'relationship' as const, required: true, note: 'References the uploaded contract or source artifact.' },
          { name: 'sections', fieldType: 'array' as const, required: true, note: 'Repeatable contract sections with extracted text and notes.' },
          { name: 'signoff', fieldType: 'group' as const, required: true, note: 'Approver, timestamp, and final review disposition.' },
        ],
        relationships: [{ relation: 'owners' }, { relation: 'source-files' }, { relation: 'clauses' }],
      },
      {
        slug: 'policies',
        label: 'Policies',
        endpoint: '/api/policies',
        ownership: 'Operations leads',
        workflow: 'Proposed -> Compliance review -> Active',
        fields: [
          ...sharedFields,
          { name: 'jurisdiction', fieldType: 'text' as const, required: true, note: 'Market, region, or operating unit the policy applies to.' },
          { name: 'effectiveDate', fieldType: 'date' as const, required: true, note: 'Date the policy version becomes active.' },
          { name: 'exceptions', fieldType: 'array' as const, required: false, note: 'Structured exception records with rationale and owner.' },
        ],
        relationships: [{ relation: 'owners' }, { relation: 'audits' }, { relation: 'policy-versions' }],
      },
      {
        slug: 'audits',
        label: 'Audits',
        endpoint: '/api/audits',
        ownership: 'Review managers',
        workflow: 'Queued -> Checked -> Remediation',
        fields: [
          ...sharedFields,
          { name: 'scope', fieldType: 'textarea' as const, required: true, note: 'The documents, policy areas, and controls included.' },
          { name: 'checks', fieldType: 'array' as const, required: true, note: 'Validation checklist with pass/fail and evidence fields.' },
          { name: 'requiresRemediation', fieldType: 'checkbox' as const, required: false, note: 'Flags whether follow-up workflow should be opened.' },
        ],
        relationships: [{ relation: 'owners' }, { relation: 'documents' }, { relation: 'policies' }],
      },
      {
        slug: 'clauses',
        label: 'Clauses',
        endpoint: '/api/clauses',
        ownership: 'Analyst team',
        workflow: 'Extracted -> Classified -> Reusable',
        fields: [
          ...sharedFields,
          { name: 'clauseText', fieldType: 'richText' as const, required: true, note: 'Canonical clause body preserved with editorial markup.' },
          { name: 'clauseType', fieldType: 'select' as const, required: true, note: 'Classification used for search, routing, and comparison.' },
          { name: 'sourceLocation', fieldType: 'group' as const, required: true, note: 'Document, page, section, and confidence metadata.' },
        ],
        relationships: [{ relation: 'documents' }, { relation: 'comparisons' }, { relation: 'owners' }],
      },
      {
        slug: 'comparisons',
        label: 'Comparisons',
        endpoint: '/api/comparisons',
        ownership: 'Cross-functional teams',
        workflow: 'Selected -> Compared -> Resolved',
        fields: [
          ...sharedFields,
          { name: 'baselineDocument', fieldType: 'relationship' as const, required: true, note: 'The approved record used as comparison baseline.' },
          { name: 'candidateDocument', fieldType: 'relationship' as const, required: true, note: 'The new or alternate record being compared.' },
          { name: 'deltas', fieldType: 'array' as const, required: true, note: 'Structured additions, removals, and changed clauses.' },
        ],
        relationships: [{ relation: 'documents' }, { relation: 'clauses' }, { relation: 'owners' }],
      },
    ]

    for (const schema of schemasData) {
      await payload.create({
        collection: 'schema-templates',
        data: schema,
      })
    }

    schemaTemplatesList = await payload.find({
      collection: 'schema-templates',
    })
  }

  // 6. Map to ReductoContent contract
  const settings = siteSettingsList.docs[0]
  const responseContent = {
    navItems: settings.navItems?.map((item) => ({
      label: item.label,
      href: item.href,
    })) || [],
    phases: phasesList.docs.map((p) => ({
      index: p.index,
      label: p.label,
      summary: p.summary,
    })),
    useCases: useCasesList.docs.map((uc) => ({
      id: uc.id,
      title: uc.title,
      audience: uc.audience,
      priority: uc.priority,
      status: uc.status,
      slug: uc.slug,
      details: uc.details,
      gap: uc.gap,
    })),
    gapRows: gapAnalysesList.docs.map((g) => ({
      area: g.area,
      status: g.status,
      details: g.details,
    })),
    landingSections: settings.landingSections?.map((s) => ({
      id: s.sectionId as 'integrations' | 'docs' | 'pricing',
      title: s.title,
      summary: s.summary,
      ctaLabel: s.ctaLabel,
      ctaHref: s.ctaHref,
      items: s.items?.map((it) => ({
        label: it.label,
        detail: it.detail,
      })) || [],
    })) || [],
    payloadCollectionPreviews: schemaTemplatesList.docs.map((st) => ({
      slug: st.slug,
      label: st.label,
      endpoint: st.endpoint,
      ownership: st.ownership,
      workflow: st.workflow,
      fields: st.fields?.map((f) => ({
        name: f.name,
        type: f.fieldType as 'text' | 'textarea' | 'richText' | 'select' | 'date' | 'group' | 'array' | 'relationship' | 'checkbox',
        required: f.required,
        note: f.note,
      })) || [],
      relationships: st.relationships?.map((r) => r.relation) || [],
    })),
  }

  return Response.json(responseContent, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
