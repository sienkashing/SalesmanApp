import { StyleSheet } from "react-native";
import Colors from "../../../Colors";

const styles = StyleSheet.create({
  thumbnail: {
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: 10,
    marginRight: 0
  },
  addImageThumbnail: {
    borderStyle: "dashed",
    borderRadius: 1,
    backgroundColor: "white",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  thumbnailText: {
    color: Colors.primary,
    fontSize: 10
  },
  thumbnailViewer: {
    width: "100%",
    backgroundColor: "white"
  }
});

export default styles;
