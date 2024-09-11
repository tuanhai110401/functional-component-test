import { HiOutlinePlusSmall } from "react-icons/hi2";

export default function SearchSuggest({ data, handleAddItem }) {
  return (
    data &&
    data.map((item, index) => (
      <div
        key={index}
        className="suggest-item"
        onClick={() => {
          handleAddItem(item);
        }}
      >
        <div className="suggest-img">
          <img src={item.image} />
        </div>
        <div className="suggest-info">
          <div>
            <p className="suggest-info_title">{item.title}</p>
            <p className="suggest-info_desc">{"$" + item.price}</p>
          </div>
          <HiOutlinePlusSmall className="suggest-info_icon" />
        </div>
      </div>
    ))
  );
}
