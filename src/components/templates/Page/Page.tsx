import { use100vh } from "utils/use100vh";

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
  const windowHeight = use100vh();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height={windowHeight}
      boxSizing="border-box"
      alignItems="center"
      paddingTop={7}
    >
      <GoBackHeader title={title} />
      {children}
      <BottomBar />
    </Box>
  );
};
Page.Content = Content;

export default Page;
