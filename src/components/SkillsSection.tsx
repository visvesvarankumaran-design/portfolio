const SKILL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Design Systems & UI',
    items: [
      'Component-based design',
      'Figma — components, variants, tokens, auto-layout',
      'Design systems & component libraries',
      'Responsive & mobile-first',
      'Micro-interactions & motion (Figma / Framer)',
    ],
  },
  {
    label: 'UX',
    items: [
      'User-centered design',
      'User flows & wireframing',
      'Prototyping & interaction design',
      'Usability testing & research',
      'Information architecture',
      'Accessibility (WCAG)',
    ],
  },
  {
    label: 'Frontend',
    items: [
      'HTML, CSS, JavaScript, TypeScript',
      'React, Angular',
      'Tailwind CSS, PrimeNG, ShadCN',
      'Build-ready developer handoff',
    ],
  },
  {
    label: 'Collaboration & Tools',
    items: [
      'Cross-functional with PMs & engineers',
      'Design reviews & documentation',
      'Agile / Scrum',
      'Figma, FigJam, Framer, Notion',
      'AI-assisted workflows',
    ],
  },
]

export function SkillsSection() {
  return (
    <section className="pf-panel pf-skills" aria-label="Skills and toolkit">
      <div className="pf-skillsInner">
        <p className="pf-skillsKicker">SKILLS &amp; TOOLKIT</p>
        <h2 className="pf-skillsHead">WHAT I WORK WITH</h2>
        <div className="pf-skillsGrid">
          {SKILL_GROUPS.map((group) => (
            <div className="pf-skillsGroup" key={group.label}>
              <h3 className="pf-skillsGroupTitle">{group.label}</h3>
              <ul className="pf-skillsChips">
                {group.items.map((item) => (
                  <li className="pf-skillsChip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
