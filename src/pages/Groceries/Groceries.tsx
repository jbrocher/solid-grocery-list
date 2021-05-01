import React from "react";
import { useGroceryLists } from "utils/api/hooks/groceryLists";
import { Link } from "react-router-dom";
import Loading from "pages/Loading";

const Groceries: React.FunctionComponent = () => {
  const { isSuccess, groceryLists } = useGroceryLists();
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <div>
      {groceryLists.map((list) => (
        <div key={list.identifier}>
          <Link to={`/groceries/${list.identifier}`}> {list.title} </Link>
        </div>
      ))}
    </div>
  );
};

export default Groceries;
