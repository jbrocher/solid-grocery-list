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
        <span>
          {list.title} {list.items[0].object.name}{" "}
        </span>
      ))}
    </div>
  );
};

export default Groceries;
