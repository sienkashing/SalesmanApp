import React, { PureComponent } from "react";
import {
  TouchableWithoutFeedback, ScrollView, View, Text, Modal
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Thumbnail from "./Thumbnail";
import styles from "./styles";

type AddImageProps = {
  onPress: Function
};
const AddImage = (props: AddImageProps) => {
  const { onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.thumbnail, styles.addImageThumbnail]}>
        <Text style={styles.thumbnailText}>+ Add Photo</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  imageUriList: Array<string>,
  onAddImage: Function
};
type State = {
  showImageViewer: boolean,
  viewerIndex: number
};
export default class ThumbnailViewer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showImageViewer: false
    };
  }

  showImageViewer = (viewerIndex: number) => {
    const { showImageViewer } = this.state;

    this.setState({ showImageViewer: !showImageViewer, viewerIndex });
  };

  render() {
    const { imageUriList, onAddImage } = this.props;
    const { showImageViewer, viewerIndex } = this.state;

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailViewer}
        >
          {imageUriList !== null
            && imageUriList.map((uri, index) => (
              <Thumbnail key={index} imageUri={uri} onPress={() => this.showImageViewer(index)} />
            ))}
          <AddImage onPress={onAddImage} />
        </ScrollView>
        <Modal
          visible={showImageViewer}
          transparent
          onRequestClose={() => this.setState({ showImageViewer: false })}
        >
          <View style={{ width: "100%", height: 50, backgroundColor: "white" }}>
            <Text>{viewerIndex}</Text>
          </View>
          <ImageViewer
            onChange={index => this.setState({ viewerIndex: index })}
            imageUrls={imageUriList.map(imageUri => ({ url: imageUri }))}
            index={viewerIndex}
          />
        </Modal>
      </View>
    );
  }
}
