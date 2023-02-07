import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../actions";

export default function Skills() {
  const { items, loading, error, search } = useSelector(
    (state) => state.skills
  );
  const dispatch = useDispatch();
  function handleChange(event) {
    dispatch(changeSearchField(event.target.value));
  }

  return (
    <div className="search">
      <div className="search-input-box">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Type something to search..."
        />
      </div>
      <ul className="search-list">
        {items &&
          items.map((el) => (
            <li className="search-list-item" key={el.id}>
              {el.name}
            </li>
          ))}
        {loading && <li className="loading">...loading</li>}
        {error && <li className="error">{error.message}</li>}
      </ul>
    </div>
  );
}
