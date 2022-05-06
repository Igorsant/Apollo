import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box } from '@mui/material';

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  color: #42332b;
  width: 100%;
  margin: 0 0 10px 0;
`;

const Input = styled.input`
  display: none;
`;

const Image = styled.img`
  heigth: 120px;
  width: 120px;
`;

const ClickToEdit = styled.p`
  color: var(--title);
  font-size: 0.6em; ;
`;

const HoverBox = styled(Box)`
  &:hover {
    cursor: pointer;
  }
  width: 120px;
  min-height: 120px;
  background-color: #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  onChangeImage: Function;
}

export const ImageInput: React.FC<ImageInputProps> = ({ label, name, value, onChangeImage }) => {
  const ImagePreview = () => {
    if (value) {
      return <Image src={value} />;
    } else {
      return (
        <HoverBox>
          <FileUploadIcon color="primary" sx={{ fontSize: 50 }}></FileUploadIcon>
          <ClickToEdit>Clique para Editar</ClickToEdit>
        </HoverBox>
      );
    }
  };

  const handlePictureSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        onChangeImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Div>
      <Label>{label}</Label>
      <label htmlFor="input-image">
        <Input
          id="input-image"
          type="file"
          accept="image/png, image/jpeg"
          name={name}
          onChange={handlePictureSelected}
        />
        <ImagePreview></ImagePreview>
      </label>
    </Div>
  );
};
