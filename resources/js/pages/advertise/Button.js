import { styled } from "@mui/system";
import MuiButton from "@mui/material/Button";

export const Button = styled(MuiButton)(({ theme, pill }) => ({
  borderRadius: pill ? theme.shape.pillRadius : theme.shape.borderRadius
}));
