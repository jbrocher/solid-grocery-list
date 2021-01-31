import styled from "styled-components";
import { padding, PaddingProps, FlexboxProps, flexbox } from "styled-system";

const Page = styled.div<PaddingProps & FlexboxProps>`
  ${padding};
  ${flexbox};
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.colors.cyan};
`;

Page.defaultProps = {
  flexDirection: "column",
  alignItems: "center",
};

export default Page;
