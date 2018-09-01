import { PermissionsAndroid } from "react-native";

const PermissionManager = {
  async requestExternalStorageRead() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      // Handle this error
      return false;
    }
  }
};

export default PermissionManager;
