import styled from "styled-components";
import { EventHandler, InputHTMLAttributes } from "react";
import { ChangeEventHandler } from "react";
import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box } from "@mui/material";

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

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  onChangeImage: Function;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  label,
  name,
  value,
  onChangeImage,
}) => {
  const [image, setImage] = useState({ picture: {}, src: "" });

  const ImagePreview = () => {
    if (image.src) {
      return <Image src={image.src} />;
    } else {
      return (
        <Box
          sx={{
            width: 120,
            height: 120,
            backgroundColor: "#D7D7D7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FileUploadIcon
            color="primary"
            sx={{ fontSize: 50 }}
          ></FileUploadIcon>
          <ClickToEdit>Clique para Editar</ClickToEdit>
        </Box>
      );
    }
  };

  const handlePictureSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var file = event.target!.files![0];
    var src = URL.createObjectURL(file);

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        onChangeImage(name, reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    setImage({ picture: file, src: src });
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
