import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EditPage = () => {
  const param = useParams();
  const [detailMenu, setDetailMenu] = useState({});

  // const [menuName, setMenuName] = useState("");
  // const [description, setDescription] = useState("");
  // const [type, setType] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDetailMenu();
  }, []);

  // const handleOnChangeName = (e) => {
  //   setMenuName(e.target.value);
  // };

  // const hadnleOnChangeDescription = (e) => {
  //   setDescription(e.target.value);
  // };

  // const handleOnChangeType = (e) => {
  //   setType(e.target.value);
  // };

  // const handleOnChangeImage = (e) => {
  //   setImageUrl(e.target.value);
  // };

  // const handleOnChangePrice = (e) => {
  //   setPrice(e.target.value);
  // };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDetailMenu({
      ...detailMenu,
      [name]: value,
    });
  };

  const getDetailMenu = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${param.id}`)
      .then((res) => {
        console.log(res.data.data);
        setDetailMenu(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyPayload = {
    name: detailMenu.name,
    description: detailMenu.description,
    type: detailMenu.type,
    imageUrl: detailMenu.imageUrl,
    price: parseInt(detailMenu.price),
  };

  const updateDetailMenu = () => {
    axios
      .put(`https://api.mudoapi.tech/menu/${param.id}`, bodyPayload, config)
      .then((res) => {
        console.log(res.data.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Edit Page</h1>
      <div>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          onChange={handleOnChange}
          value={detailMenu.name}
        />
        <label>Desc:</label>
        <input
          name="description"
          type="text"
          onChange={handleOnChange}
          value={detailMenu.description}
        />
        <label>type:</label>
        <input
          name="type"
          type="text"
          onChange={handleOnChange}
          value={detailMenu.type}
        />
        <label>image:</label>
        <input
          name="imageUrl"
          type="text"
          onChange={handleOnChange}
          value={detailMenu.imageUrl}
        />
        <label>price:</label>
        <input
          name="price"
          type="number"
          onChange={handleOnChange}
          value={detailMenu.price}
        />
        <button onClick={updateDetailMenu}>Submit</button>
      </div>
    </div>
  );
};

export default EditPage;
