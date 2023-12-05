import axios from "axios";

export async function getMenus(dataPage, dataName, dataType) {
  const res = await axios.get(
    `https://api.mudoapi.tech/menus?perPage=5&page=${dataPage}&name=${dataName}&type=${dataType}`
  );
  return res;
}
