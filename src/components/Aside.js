import {
  HiOutlineBuildingStorefront,
  HiOutlineCog6Tooth,
  HiOutlineIdentification,
  HiOutlineShoppingCart,
  HiOutlineInboxStack,
} from "react-icons/hi2";

function Aside() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">
        React<span>Store</span>
      </h3>
      <nav>
        <ul>
          <li>
            <a href="#">
              <HiOutlineBuildingStorefront className="sidebar-icon" />
              Home
            </a>
          </li>
          <li className="active">
            <a href="#">
              <HiOutlineShoppingCart className="sidebar-icon" />
              Order
            </a>
          </li>
          <li>
            <a href="#">
              <HiOutlineInboxStack className="sidebar-icon" />
              Products
            </a>
          </li>
          <li>
            <a href="#">
              <HiOutlineIdentification className="sidebar-icon" />
              Customer
            </a>
          </li>
          <li></li>
        </ul>
        <a href="#">
          <HiOutlineCog6Tooth className="sidebar-icon" />
          Setting
        </a>
      </nav>
    </aside>
  );
}

export default Aside;
