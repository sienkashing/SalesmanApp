import { StyleSheet } from "react-native";
import Colors from "../../Colors";

const styles = StyleSheet.create({
  titleStyle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    flexDirection: "row"
  },
  errorContainer: {
    borderColor: "red",
    justifyContent: "center",
    alignContent: "center",
    height: 40
  },
  inputStyle: {
    color: "black",
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 5
  }
});

export default styles;
