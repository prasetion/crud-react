import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar";

const DetailPage = () => {
  const param = useParams();
  const [detailMenu, setDetailMenu] = useState({});

  useEffect(() => {
    getDetailMenu();
  }, []);

  const getDetailMenu = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${param.id}`)
      .then((res) => {
        console.log(res.data.data);
        setDetailMenu(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <h2>{detailMenu.name}</h2>
      <p>{detailMenu.description}</p>
      <p>{detailMenu.price}</p>
      <img src={detailMenu.imageUrl} alt="" />
    </div>
  );
};

export default DetailPage;
