import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import * as requestAPI from "../../helpers/apis";

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

  const handleGetMenus = async (
    selectedPage = "",
    dataName = "",
    dataType = ""
  ) => {
    console.log("selectedpage: ", selectedPage);
    // axios
    //   .get(
    //     `https://api.mudoapi.tech/menus?perPage=5&page=${selectedPage}&name=${dataName}&type=${dataType}`
    //   )
    //   .then((res) => {
    //     console.log(res.data.data);
    //     setPage({
    //       perPage: res.data.data.perPage,
    //       total: res.data.data.total,
    //       currentPage: res.data.data.currentPage,
    //       previousPage: res.data.data.previousPage,
    //       nextPage: res.data.data.nextPage,
    //     });
    //     setMenus(res.data.data.Data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    try {
      const res = await requestAPI.getMenus(selectedPage, dataName, dataType);
      console.log(res.data.data);
      setPage({
        perPage: res.data.data.perPage,
        total: res.data.data.total,
        currentPage: res.data.data.currentPage,
        previousPage: res.data.data.previousPage,
        nextPage: res.data.data.nextPage,
      });
      setMenus(res.data.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleDeleteMenu = (idMenu) => {
    axios
      .delete(`https://api.mudoapi.tech/menu/${idMenu}`, config)
      .then((res) => {
        console.log(res.data.data);
        handleGetMenus();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <button
        disabled={page.previousPage <= 0 ? true : false}
        onClick={() => handleGetMenus(page.previousPage, "", "")}
      >
        Prev
      </button>
      <button
        disabled={page.total <= page.currentPage * page.perPage}
        onClick={() => handleGetMenus(page.nextPage, "", "")}
      >
        Next
      </button>
      {menus.map((menu, index) => (
        <div>
          <h2>{menu.name}</h2>
          <img src={menu.imageUrl} alt="" />
          {/* <Link to={`/delete/${menu.id}`}>Detail</Link> */}
          <Link to={`/edit/${menu.id}`}>Edit Menu</Link>
          <button onClick={() => handleDeleteMenu(menu.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
