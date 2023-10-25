import React from 'react';
import { Typography } from '@mui/material';

interface IProps {
  text: string;
  textSize?: string;
  textAlign?: string;
}

function H3({ text, textSize, textAlign }: IProps) {
  return (
    <Typography
      variant="h3"
      fontSize={textSize || 'max(.8rem, 1.3vw)'}
      sx={{
        marginTop: '1.5rem',
        fontWeight: '600',
        textAlign: textAlign || 'center',
        lineHeight: 'max(1.1rem, 1.6vw)',
      }}
    >
      {text}
    </Typography>
  );
}

export default H3;
