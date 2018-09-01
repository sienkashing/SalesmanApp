// @flow
import background from "./images/background.jpeg";
import network from "./images/network.png";

const image = {
  background,
  network
};

const getImages = (name: string) => image[name];

export default getImages;
