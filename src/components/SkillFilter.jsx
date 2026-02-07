export default function SkillFilter({ allSkills, selected, onChange }) {
  const toggle = (skill) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  return (
    <div className="filter-bar">
      {allSkills.map((skill) => (
        <button
          key={skill}
          className={`filter-chip ${selected.includes(skill) ? 'active' : ''}`}
          onClick={() => toggle(skill)}
        >
          {skill}
        </button>
      ))}
      {selected.length > 0 && (
        <button
          className="filter-chip"
          style={{ fontStyle: 'italic' }}
          onClick={() => onChange([])}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
