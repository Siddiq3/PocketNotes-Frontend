import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupPopup from './GroupPopup';

function GroupList({ onSelectGroup }) {
  const [groups, setGroups] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/groups').then(response => setGroups(response.data));
  }, []);

  const handleCreateGroup = (group) => {
    axios.post('/api/groups', group).then(response => {
      setGroups([...groups, response.data]);
      setIsPopupOpen(false);
    });
  };

  return (
    <div>
      <h2>Pocket Notes</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id} onClick={() => onSelectGroup(group._id)}>
            {group.name}
          </li>
        ))}
      </ul>
      <button onClick={() => setIsPopupOpen(true)}>Create Group</button>
      {isPopupOpen && <GroupPopup onClose={() => setIsPopupOpen(false)} onSave={handleCreateGroup} />}
    </div>
  );
}

export default GroupList;
