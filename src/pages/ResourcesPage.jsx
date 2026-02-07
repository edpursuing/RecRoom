import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import ResourceCard from '../components/ResourceCard';
import ResourceForm from '../components/ResourceForm';
import Modal from '../components/Modal';
import SkillFilter from '../components/SkillFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { RESOURCE_TYPE_LABELS } from '../lib/constants';

const TYPE_FILTERS = ['all', 'tutorial', 'video', 'article', 'tool', 'docs'];

export default function ResourcesPage({ user }) {
  const { resources, loading, addResource } = useResources();
  const [showModal, setShowModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState([]);
  const [sort, setSort] = useState('recent');

  const allTopics = useMemo(() => {
    const set = new Set();
    resources.forEach((r) => r.topics?.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [resources]);

  const filtered = useMemo(() => {
    let result = [...resources];

    if (typeFilter !== 'all') {
      result = result.filter((r) => r.type === typeFilter);
    }

    if (topicFilter.length > 0) {
      result = result.filter((r) =>
        topicFilter.some((t) => r.topics?.includes(t))
      );
    }

    if (sort === 'upvotes') {
      result.sort((a, b) => (b.upvote_count || 0) - (a.upvote_count || 0));
    } else {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [resources, typeFilter, topicFilter, sort]);

  const handleAdd = async (resource) => {
    await addResource(resource);
    setShowModal(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container page">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1 className="page-title">Resources</h1>
          <p className="page-subtitle">Share and discover learning resources</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      {/* Type filter */}
      <div className="filter-bar">
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            className={`filter-chip ${typeFilter === type ? 'active' : ''}`}
            onClick={() => setTypeFilter(type)}
          >
            {type === 'all' ? 'All' : RESOURCE_TYPE_LABELS[type]}
          </button>
        ))}

        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: 'auto', width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
        >
          <option value="recent">Most Recent</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      {/* Topic filter */}
      {allTopics.length > 0 && (
        <SkillFilter
          allSkills={allTopics}
          selected={topicFilter}
          onChange={setTopicFilter}
        />
      )}

      {/* Resources list */}
      {resources.length === 0 ? (
        <EmptyState
          message="No resources yet. Be the first to share!"
          actionLabel="Add Resource"
          onAction={() => setShowModal(true)}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          message="No resources match your filters"
          actionLabel="Clear filters"
          onAction={() => { setTypeFilter('all'); setTopicFilter([]); }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} userId={user.id} />
          ))}
        </div>
      )}

      <Modal title="Add Resource" isOpen={showModal} onClose={() => setShowModal(false)}>
        <ResourceForm
          userId={user.id}
          onSubmit={handleAdd}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
