// @flow
import React, { Component } from "react";
import { View, CameraRoll, Button } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import PermissionManager from "app/services/PermissionManager";
import ErrorToast from "app/components/common/ErrorToast";
import uploadImages from "app/api/survey/uploadImages";
import ThumbnailViewer from "./ThumbnailViewer";

type Props = {};
type State = {
  imageUriList: Array<string>
};
export default class ProductSurvey extends Component<Props, State> {
  static navigationOptions = {
    title: "Product Survey"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      imageUriList: []
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = async () => {
    // Before calling getPhotos, request permission
    if (await PermissionManager.requestExternalStorageRead()) {
      CameraRoll.getPhotos({
        first: 5,
        groupName: "Salesman"
      })
        .then((r: any) => {
          this.setState({ imageUriList: r.edges.map(edge => edge.node.image.uri) });
        })
        .catch((error) => {
          ErrorToast(error.message);
        });
    }
  };

  handleAddImage = () => {
    const { imageUriList } = this.state;

    ImagePicker.openPicker({
      multiple: true
    })
      .then(images => this.setState({
        imageUriList: [...imageUriList, ...images.map(image => image.path)]
      }))
      .catch(() => {});
  };

  handleUpload = () => {
    const { imageUriList } = this.state;

    uploadImages(imageUriList);
  };

  render() {
    const { imageUriList } = this.state;
    return (
      <View>
        <ThumbnailViewer imageUriList={imageUriList} onAddImage={this.handleAddImage} />
        <Button title="Upload Images" onPress={this.handleUpload} />
      </View>
    );
  }
}
