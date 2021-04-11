import styled from "styled-components";
import { padding, PaddingProps, FlexboxProps, flexbox } from "styled-system";

const Page = styled.div<PaddingProps & FlexboxProps>`
  ${padding};
  ${flexbox};
  height: 100vh;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: scroll;
  background-color: ${(props) => props.theme.colors.cyan};
`;

Page.defaultProps = {
  flexDirection: "column",
  alignItems: "center",
  padding: 1,
};

export default Page;
