// @flow
import RNFetchBlob from "rn-fetch-blob";
import AuthToken from "app/services/AuthToken";
import ErrorToast from "app/components/common/ErrorToast";
import ROOTURL from "../const";

const uploadImage = async (imageURIs: Array<string>) => {
  const imageData = imageURIs.map(data => ({
    name: "avatar",
    filename: `1.jpeg`,
    data: RNFetchBlob.wrap(data)
  }));

  try {
    const authToken = await AuthToken.authenticationToken();

    return await RNFetchBlob.fetch(
      "POST",
      `${ROOTURL}/survey/productimage`,
      {
        ...authToken,
        "Content-Type": "multipart/form-data"
      },
      imageData
    );
  } catch (err) {
    ErrorToast(err.message);
    return null;
  }
};

export default uploadImage;
