import React from 'react';
import { Typography } from '@mui/material';
import { colors } from '../../utils/globalVariables';

interface IProps {
  text: string;
  isDark?: boolean;
}

function H2({ text, isDark }: IProps) {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: 'max(1.5rem, 2vw)',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: isDark ? colors.color3 : colors.color1,
      }}
    >
      {text}
    </Typography>
  );
}

export default H2;
