import { styled } from "@mui/material/styles";
import theme from "theme";

const Page = styled("div")`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;
  padding-top: ${theme.spacing(8)};
`;

export default Page;
