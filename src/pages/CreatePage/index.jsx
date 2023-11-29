import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  useEffect(() => {
    handleCreateMenu();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyPayload = {
    name: name,
    description: description,
    type: type,
    imageUrl: imageUrl,
    price: parseInt(price),
  };

  const handleCreateMenu = () => {
    axios
      .post(`https://api.mudoapi.tech/menu`, bodyPayload, config)
      .then((res) => {
        console.log(res.data.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const hadnleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnChangeType = (e) => {
    setType(e.target.value);
  };

  const handleOnChangeImage = (e) => {
    setImageUrl(e.target.value);
  };

  const handleOnChangePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div>
      <h1>Create Page</h1>
      <label>Name:</label>
      <input type="text" onChange={handleOnChangeName} />
      <label>Desc:</label>
      <input type="text" onChange={hadnleOnChangeDescription} />
      <label>type:</label>
      <input type="text" onChange={handleOnChangeType} />
      <label>image:</label>
      <input type="text" onChange={handleOnChangeImage} />
      <label>price:</label>
      <input type="number" onChange={handleOnChangePrice} />
      <button onClick={handleCreateMenu}>Submit</button>
    </div>
  );
};

export default CreatePage;
