import { useState } from 'react';
import { RESOURCE_TYPES, RESOURCE_TYPE_LABELS, SKILL_COLORS } from '../lib/constants';

const ALL_TOPICS = Object.keys(SKILL_COLORS);

export default function ResourceForm({ userId, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    url: '',
    title: '',
    type: '',
    topics: [],
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleTopic = (topic) => {
    setForm((f) => ({
      ...f,
      topics: f.topics.includes(topic)
        ? f.topics.filter((t) => t !== topic)
        : [...f.topics, topic],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.topics.length === 0) {
      setError('Please select at least one topic.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        submitted_by: userId,
      });
    } catch (err) {
      setError(err.message || 'Failed to add resource.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">URL</label>
        <input
          className="form-input"
          type="url"
          placeholder="https://..."
          value={form.url}
          onChange={(e) => update('url', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          type="text"
          placeholder="Resource title"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) => update('type', e.target.value)}
          required
        >
          <option value="">Select type...</option>
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>{RESOURCE_TYPE_LABELS[t]}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Topics</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ALL_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`filter-chip ${form.topics.includes(topic) ? 'active' : ''}`}
              onClick={() => toggleTopic(topic)}
              style={{ fontSize: '0.8rem' }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          placeholder="Brief description of this resource..."
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          required
        />
      </div>

      {error && (
        <p style={{ color: 'var(--color-red)', fontSize: '0.88rem', marginBottom: 14 }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
}
