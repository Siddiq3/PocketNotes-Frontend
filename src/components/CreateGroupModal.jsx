import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back icon

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

const ModalContent = styled.div`
  height: 317px;
  width:740px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Make sure the back icon can be positioned absolutely */
`;

const BackIcon = styled(FaArrowLeft)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const ModalHeader = styled.h2`
  margin: 0;
  padding-bottom: 10px;
  width: 248px
  height:46px;
  text-align: center;
  font-size: 29px;
  font-weight:500;
  color: rgba(0, 0, 0, 1);
`;

const ModalBody = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
 
   width: 189px;
  height: 44px;
  font-family: Roboto;
  font-size: 27.31px;
  font-weight: 500;
  line-height: 43.75px;
  letter-spacing: 0.035em;
  text-align: left;
  
  color: background: rgba(0, 0, 0, 1); /* Ensures text is visible against the black background */
  margin-bottom: 10px;
  opacity: 1; /* Ensure the label is visible */
  display: block;
`;

const Input = styled.input`
 width: 435px;
  height: 51px;
  border-radius: 22px 0 0 0;
  border: 2px solid rgba(204, 204, 204, 1);
  background: rgba(255, 255, 255, 1);
  opacity: 1; /* Assuming you want it to be visible, change from 0 */
  font-size: 16px;
  padding: 0 15px; /* Added padding for better text placement */
  margin: 10px 0;
  box-sizing: border-box;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
  border: ${props => (props.selected ? '2px solid #000' : 'none')};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreateGroupModal = ({ isOpen, onRequestClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = () => {
    if (groupName.trim() && selectedColor) {
      onCreateGroup({ name: groupName, color: selectedColor });
      setGroupName('');
      setSelectedColor('');
      onRequestClose();  // Close the modal after creating the group
    }
  };

  const colors = [
    '#D291BC', '#FF8E72', '#7DE2FC', '#FFAAA6', '#72DDF7', '#0047BB'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          background: 'none',
          border: 'none',
          padding: '0',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
      ariaHideApp={false}
    >
      <ModalContainer>
        <ModalContent>
          <BackIcon onClick={onRequestClose} /> {/* Add the back icon */}
          <ModalHeader>Create New Group</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Group Name</Label>
              <Input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Choose Colour</Label>
              <ColorPicker>
                {colors.map(color => (
                  <ColorOption
                    key={color}
                    color={color}
                    selected={color === selectedColor}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </ColorPicker>
            </FormGroup>
            <Button onClick={handleSubmit}>Create</Button>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;
