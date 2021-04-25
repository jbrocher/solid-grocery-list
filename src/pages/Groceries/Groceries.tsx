import React from "react";
import { useGroceryLists } from "utils/api/hooks/groceryLists";
import Loading from "pages/Loading";

const Groceries: React.FunctionComponent = () => {
  const { isSuccess, groceryLists } = useGroceryLists();
  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <div>
      {groceryLists!.map((list) => (
        <div key={list.identifier}>
          <h1>{list.title} </h1>
          {list.items.map((item) => `${item.object.name} - ${item.quantity}`)}
        </div>
      ))}
    </div>
  );
};

export default Groceries;
