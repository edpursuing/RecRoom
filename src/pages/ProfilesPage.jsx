import { useState, useMemo } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';
import SkillFilter from '../components/SkillFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function ProfilesPage() {
  const { profiles, loading } = useProfiles();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    profiles.forEach((p) => p.skills?.forEach((s) => skillSet.add(s)));
    return [...skillSet].sort();
  }, [profiles]);

  const filtered = useMemo(() => {
    if (selectedSkills.length === 0) return profiles;
    return profiles.filter((p) =>
      selectedSkills.some((skill) => p.skills?.includes(skill))
    );
  }, [profiles, selectedSkills]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">Classmates</h1>
        <p className="page-subtitle">Discover skills and connect with your cohort</p>
      </div>

      <SkillFilter
        allSkills={allSkills}
        selected={selectedSkills}
        onChange={setSelectedSkills}
      />

      {filtered.length === 0 ? (
        <EmptyState
          message="No classmates match your filters"
          actionLabel="Clear filters"
          onAction={() => setSelectedSkills([])}
        />
      ) : (
        <div className="grid-3">
          {filtered.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
