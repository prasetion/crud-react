import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    handleGetMenus();
  }, []);

  const [menuName, setMenuName] = useState("");
  const [menuType, setMenuType] = useState("");
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState({
    perPage: 1,
    total: 0,
    currentPage: 1,
    previousPage: 0,
    nextPage: 2,
  });

  // const [selectPage, setSelectPage] = useState(1);

  // const changePage = (paging) => {
  //   setSelectPage(paging);
  //   handleGetMenus();
  // };

  const handleGetMenus = (selectedPage) => {
    axios
      .get(
        `https://api.mudoapi.tech/menus?perPage=5&page=${selectedPage}` //&name=${menuName}&type=${menuType}`
      )
      .then((res) => {
        console.log(res.data.data);
        setPage({
          perPage: res.data.data.perPage,
          total: res.data.data.total,
          currentPage: res.data.data.currentPage,
          previousPage: res.data.data.previousPage,
          nextPage: res.data.data.nextPage,
        });
        setMenus(res.data.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <button
        disabled={page.previousPage <= 0 ? true : false}
        onClick={() => handleGetMenus(page.previousPage)}
      >
        Prev
      </button>
      <button
        disabled={page.total <= page.currentPage * page.perPage}
        onClick={() => handleGetMenus(page.nextPage)}
      >
        Next
      </button>
      {menus.map((menu, index) => (
        <div>
          <h2>{menu.name}</h2>
          <img src={menu.imageUrl} alt="" />
          {/* <Link to={`/delete/${menu.id}`}>Detail</Link> */}
          <Link to={`/edit/${menu.id}`}>Edit Menu</Link>
          <button onClick={console.log("handle delete menyusul")}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
