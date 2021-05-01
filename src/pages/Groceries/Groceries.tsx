import React from "react";
import { useGroceryLists } from "utils/api/hooks/groceryLists";
import { Link } from "react-router-dom";
import Loading from "pages/Loading";
import Page from "components/templates/Page";

const Groceries: React.FunctionComponent = () => {
  const { isSuccess, groceryLists } = useGroceryLists();
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <Page>
      {groceryLists.map((list) => (
        <div key={list.identifier}>
          <Link to={`/groceries/${list.identifier}`}> {list.title} </Link>
        </div>
      ))}
    </Page>
  );
};

export default Groceries;
