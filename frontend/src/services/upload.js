const sign = (fileMeta) => {
  return fetch(`${process.env.REACT_APP_API_URL}/sign`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(fileMeta),
  }).then((res) => res.json());
};

const makePublic = (fileMeta) => {
  return fetch(`${process.env.REACT_APP_API_URL}/makePublic`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(fileMeta),
  }).then((res) => res.json());
};

const uploadToStorage = (url, rawFile) => {
  return fetch(url, {
    method: "put",
    headers: { "Content-Type": rawFile.type },
    body: rawFile,
  });
};

const upload = async (rawFile, name) => {
  const res = await sign({ name: name || rawFile.name, type: rawFile.type });
  const uploaded = await uploadToStorage(res.signedUrl, rawFile);
  const published = await makePublic({ name: name || rawFile.name });
  return published.name;
};

export default upload;
