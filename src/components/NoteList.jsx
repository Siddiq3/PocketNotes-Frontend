import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaShareAlt } from 'react-icons/fa';

const NoteListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  background-color: ${props => props.color};
  color: #ffffff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Add space between elements */
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.circleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  margin-right: 10px;
  font-size: 20px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const ShareGroupIcon = styled(FaShareAlt)`
  cursor: pointer;
  color: #ffffff;
  font-size: 20px;
`;

const NotesContainer = styled.div`
  margin-top: 20px;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #e9ecef;
  max-height: calc(100vh - 200px); /* Adjust based on your layout */
`;

const NoteItem = styled.div`
  background-color: #ffffff;
  padding: 10px;
  padding-right: 40px; /* Add space for icons */
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  word-break: break-word;
  position: relative;
`;

const NoteContent = styled.p`
  margin: 0;
  padding-right: 40px; /* Add space for icons */
  white-space: pre-wrap; /* Preserve whitespace and wrap long words */
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  line-height: 28.83px;
  letter-spacing: 0.035em;
  text-align: left;
`;

const NoteTimestamp = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
  line-height: 28.83px;
  letter-spacing: 0.035em;
  text-align: right;
`;

const ShareIcon = styled(FaShareAlt)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: ${props => props.color};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${props => props.color};
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  padding-right: 40px; /* Add some space for the icon */
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide overflow */
  min-height: 50px; /* Set a minimum height */
`;

const SendButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 10px;
  background-color: ${props => (props.disabled ? '#ccc' : props.color)};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const getInitials = (name) => {
  const nameArray = name.split(' ');
  const initials = nameArray.map(word => word[0]).join('');
  return initials.toUpperCase();
};

const lightenOrDarkenColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1).toUpperCase()}`;
};

const isColorLight = (color) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  // Using the luminance formula to determine brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

const NoteList = ({ groupName, groupColor, notes, onNoteCreate }) => {
  const [noteContent, setNoteContent] = useState('');
  const circleColor = isColorLight(groupColor)
    ? lightenOrDarkenColor(groupColor, -40) // Darken if color is light
    : lightenOrDarkenColor(groupColor, 40); // Lighten if color is dark
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [noteContent]);

  const handleCreateNote = () => {
    if (noteContent.trim()) {
      onNoteCreate({
        content: noteContent,
        group: groupName,
      });
      setNoteContent(''); // Clear the input field
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const handleShareNote = (note) => {
    if (navigator.share) {
      navigator.share({
        title: `${groupName} Note`,
        text: note.content,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  const handleShareGroup = () => {
    const groupContent = notes.map(note => note.content).join('\n\n');
    if (navigator.share) {
      navigator.share({
        title: `${groupName} Notes`,
        text: groupContent,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <NoteListContainer>
      <Header color={groupColor}>
        <HeaderLeft>
          <HeaderCircle circleColor={circleColor}>
            {getInitials(groupName)}
          </HeaderCircle>
          <HeaderTitle>{groupName}</HeaderTitle>
        </HeaderLeft>
        <ShareGroupIcon onClick={handleShareGroup} />
      </Header>
      <NotesContainer>
        {notes.map(note => (
          <NoteItem key={note._id}>
            <NoteContent>{note.content}</NoteContent>
            <NoteTimestamp>{formatDate(note.createdAt)}</NoteTimestamp>
            <ShareIcon color={groupColor} onClick={() => handleShareNote(note)} />
          </NoteItem>
        ))}
      </NotesContainer>
      <InputContainer color={groupColor}>
        <TextArea
          ref={textAreaRef}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter your text here..."
          rows="1" 
        />
        <SendButton
          onClick={handleCreateNote}
          disabled={!noteContent.trim()}
          color={groupColor}
        >
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </NoteListContainer>
  );
};

export default NoteList;
