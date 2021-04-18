import styled from "styled-components";
import {
  height,
  HeightProps,
  padding,
  PaddingProps,
  FlexboxProps,
  flexbox,
} from "styled-system";

type PageProps = PaddingProps & FlexboxProps & HeightProps;

const Page = styled.div<PageProps>`
  ${height};
  ${padding};
  ${flexbox};
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: scroll;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.cyan};
`;

Page.defaultProps = {
  flexDirection: "column",
  alignItems: "center",
  padding: 1,
};

export default Page;
