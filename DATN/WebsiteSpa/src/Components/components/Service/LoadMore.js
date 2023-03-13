import React, { useContext } from "react";
import { Service } from "../../GlobalState";

function LoadMore() {
  const state = useContext(Service);
  const [page, setPage] = state.servicesAPI.page;
  const [result] = state.servicesAPI.result;

  return (
    <div className="load_more">
      {result < page * 8 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

export default LoadMore;
