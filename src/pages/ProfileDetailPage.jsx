import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProfileDetail from '../components/ProfileDetail';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProfileDetailPage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileRes, resourcesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        supabase.from('resources').select('*').eq('submitted_by', id).order('created_at', { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (resourcesRes.data) setResources(resourcesRes.data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!profile) return <div className="container page"><p>Profile not found.</p></div>;

  return (
    <div className="container page">
      <ProfileDetail profile={profile} resources={resources} />
    </div>
  );
}
