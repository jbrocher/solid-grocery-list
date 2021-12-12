import Box from "@mui/material/Box";

import GoBackHeader from "components/atoms/GoBackHeader";
import BottomBar from "components/organisms/BottomBar";

import Content from "./Content";

interface PageProps {
  title: string;
}

interface PageType extends React.FunctionComponent<PageProps> {
  Content: typeof Content;
}

const Page: PageType = ({ title, children }) => {
  return (
    <Box
      display="flex"
      flex-direction="column"
      box-sizing="border-box"
      paddingTop={1}
    >
      <GoBackHeader title={title} />
      {children}
      <BottomBar />
    </Box>
  );
};
Page.Content = Content;

export default Page;
