import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.textarea`
  flex: 1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.secondary};
`;

const SendButton = styled.button`
  padding: 10px;
  background-color: ${props => props.disabled ? props.theme.colors.secondary : props.theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const CreateNoteModal = ({ isOpen, onRequestClose, onCreateNote, groupName }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (content.trim()) {
      onCreateNote({
        content,
        group: groupName  // Updated to use groupName
      });
      setContent('');
      onRequestClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Create Note Modal"
      ariaHideApp={false}
    >
      <ModalContent>
        <TextInput 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          placeholder="Enter your text here..."
        />
        <SendButton 
          onClick={handleSend} 
          disabled={!content.trim()}
        >
          Send
        </SendButton>
      </ModalContent>
    </Modal>
  );
};

export default CreateNoteModal;
