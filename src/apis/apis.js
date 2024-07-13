import instance from "../api-instance";

const handledAPIPost = async (path, payload) => {
  try {
    const resposne = await instance.post(path, payload);

    return resposne.data;
  } catch (err) {
    console.error(err);

    throw new Error(err.response.data.msg);
  }
};

const handledAPIGet = async (path) => {
  try {
    const resposne = await instance.get(path);

    return resposne.data;
  } catch (err) {
    console.error(err);
  }
};

export { handledAPIGet, handledAPIPost };