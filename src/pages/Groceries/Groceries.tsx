import React from "react";
import { useGroceryLists } from "utils/api/hooks/groceryLists";
import LinkButton from "components/atoms/LinkButton";
import GoBackHeader from "components/atoms/GoBackHeader";
import Loading from "pages/Loading";
import Page from "components/templates/Page";

const Groceries: React.FunctionComponent = () => {
  const { isSuccess, groceryLists } = useGroceryLists();
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <Page>
      <GoBackHeader title="Groceries" />
      {groceryLists.map((list) => (
        <div key={list.identifier}>
          <LinkButton
            link={`/groceries/${list.identifier}`}
            title={list.title}
          />
        </div>
      ))}
    </Page>
  );
};

export default Groceries;
