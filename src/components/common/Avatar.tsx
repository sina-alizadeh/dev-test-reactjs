import React, { FC, useState } from "react";
import { Avatar as MUIAvatar, SxProps } from "@mui/material";

interface IAvatarProps {
  src: string;
  sx?: SxProps;
  onClick?: () => void;
}

const DefaultAvatar =
  "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg";

const Avatar: FC<IAvatarProps> = ({ src, sx, onClick }) => {
  const [error, setError] = useState<boolean>(false);
  return (
    <MUIAvatar
      onClick={onClick}
      src={error ? DefaultAvatar : src}
      onError={() => setError(true)}
      sx={sx}
    />
  );
};

export default Avatar;
