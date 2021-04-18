import styled from "styled-components";
import {
  typography,
  TypographyProps,
  margin,
  MarginProps,
  variant,
} from "styled-system";

type TextProps = {
  type: "h2" | "h3" | "h1" | "body";
} & TypographyProps &
  MarginProps;
const Text = styled.div<TextProps>(
  typography,
  margin,
  (props) => ({
    fontFamily: props.theme.fonts.body,
    color: props.theme.colors.grey,
    fontSize: props.theme.fontSizes[0],
  }),
  variant({
    prop: "type",
    variants: {
      h1: {
        fontSize: 3,
      },
      h2: {
        fontSize: 2,
      },
      h3: {
        fontSize: 1,
        fontWeights: "bold",
      },
      body: {
        fontSize: 0,
      },
    },
  })
);

export default Text;
