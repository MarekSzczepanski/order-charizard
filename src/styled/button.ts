import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../utils/globalVariables';

const StyledButton = styled(Button)({
  alignSelf: 'center',
  minWidth: '230px',
  marginTop: 'max(3rem, 3.5vw)',
  paddingTop: 'max(.4rem, .6vw)',
  paddingBottom: 'max(.4rem, .6vw)',
  fontSize: 'max(.7rem, .8vw)',
  fontWeight: '700',
  borderRadius: '20px',
  backgroundColor: colors.color2,
});

export default StyledButton;
