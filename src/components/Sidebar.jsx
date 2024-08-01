import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #f8f9fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #dee2e6;
  position: relative;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #000000;
`;

const GroupItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  color: #000000;
  text-align: left;

  &:hover {
    background-color: #e9ecef;
  }
`;

const GroupIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #ffffff;
  font-weight: bold;
`;

const GroupName = styled.div`
  flex-grow: 1;
`;

const AddGroupButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Sidebar = ({ groups, onGroupClick, onAddGroup }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');

  const filteredGroups = groups.filter(group =>
    normalizeString(group.name).includes(normalizeString(searchTerm))
  );

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.map(word => word.charAt(0)).join('');
  };

  return (
    <SidebarContainer>
      <Heading>Pocket Notes</Heading>
      <SearchInput
        type="text"
        placeholder="Search groups"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredGroups.map((group, index) => (
        <GroupItem key={index} onClick={() => onGroupClick(group)}>
          <GroupIcon color={group.color}>
            {getInitials(group.name)}
          </GroupIcon>
          <GroupName>{group.name}</GroupName>
        </GroupItem>
      ))}
      <AddGroupButton onClick={onAddGroup}>+</AddGroupButton>
    </SidebarContainer>
  );
};

export default Sidebar;
