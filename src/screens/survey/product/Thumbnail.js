// @flow
import React from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import styles from "./styles";

type Props = {
  imageUri: string,
  onPress: Function
};
const Thumbnail = (props: Props) => {
  const { imageUri, onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.thumbnail}>
        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Thumbnail;
