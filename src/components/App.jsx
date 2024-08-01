import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Sidebar from './Sidebar';
import NoteList from './NoteList';
import CreateGroupModal from './CreateGroupModal';
import CreateNoteModal from './CreateNoteModal';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import noteImage from '../assets/noteimage.png';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e9ecef;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #6c757d;
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
`;

const LockIcon = styled(FaLock)`
  margin-right: 5px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #007bff;
`;

const App = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGroups();
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('https://pocket-notes-backend-six.vercel.app/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchNotes = async (groupName) => {
    try {
      const response = await axios.get(`https://pocket-notes-backend-six.vercel.app/api/notes/${groupName}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    fetchNotes(group.name);
  };

  const handleGroupCreate = async (groupData) => {
    try {
      const response = await axios.post('https://pocket-notes-backend-six.vercel.app/api/groups', groupData);
      setGroups([...groups, response.data]);
      setGroupModalOpen(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleNoteCreate = async (noteData) => {
    try {
      const response = await axios.post('https://pocket-notes-backend-six.vercel.app/api/notes', noteData);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleBackClick = () => {
    setSelectedGroup(null);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppContainer>
      <MainContent>
        {(!selectedGroup || !isMobileView) && (
          <Sidebar
            groups={filteredGroups}
            onGroupClick={handleGroupClick}
            onAddGroup={() => setGroupModalOpen(true)}
            onSearch={setSearchQuery}
          />
        )}
        {selectedGroup && (
          <div style={{ flex: 1, padding: '20px' }}>
            {isMobileView && (
              <BackButton onClick={handleBackClick}>
                <FaArrowLeft style={{ marginRight: '5px' }} /> Back
              </BackButton>
            )}
            <NoteList
              groupName={selectedGroup.name}
              groupColor={selectedGroup.color}
              notes={filteredNotes}
              onNoteCreate={handleNoteCreate}
            />
          </div>
        )}
        {!selectedGroup && !isMobileView && (
          <ContentContainer>
            <Content>
              <Image src={noteImage} alt="Pocket Notes" />
              <h1>Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online.
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
            </Content>
            <Footer>
              <FooterText>
                <LockIcon />
                end-to-end encrypted
              </FooterText>
            </Footer>
          </ContentContainer>
        )}
      </MainContent>
      <CreateGroupModal
        isOpen={isGroupModalOpen}
        onRequestClose={() => setGroupModalOpen(false)}
        onCreateGroup={handleGroupCreate}
      />
      <CreateNoteModal
        isOpen={isNoteModalOpen}
        onRequestClose={() => setNoteModalOpen(false)}
        onCreateNote={handleNoteCreate}
      />
    </AppContainer>
  );
};

export default App;
