import styled from "styled-components";
import {
  typography,
  TypographyProps,
  margin,
  MarginProps,
  variant,
} from "styled-system";

type TextProps = {
  type: "title";
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
      title: {
        fontSize: 4,
      },
    },
  })
);

export default Text;
