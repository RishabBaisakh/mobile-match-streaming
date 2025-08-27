import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [recording, setRecording] = useState(false); // ✅ new state
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const toggleRecording = async () => {
    if (recording) {
      console.log("Stopping recording...");
      cameraRef.current?.stopRecording();
      // No return — let recordAsync resolve below
      return;
    }

    console.log("Starting recording...");
    setRecording(true);

    try {
      const video = await cameraRef.current?.recordAsync();
      console.log("Recorded video:", video);
    } catch (err) {
      console.error("Recording error:", err);
    } finally {
      setRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <Text>Camera On</Text>
        </TouchableOpacity>
      ) : (
        <>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onCameraReady={() =>
              console.log("Camera ready — overlay function could run here")
            }
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>

            {/* One button for start/stop */}
            <TouchableOpacity style={styles.button} onPress={toggleRecording}>
              <Text style={styles.text}>{recording ? "Stop" : "Record"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowCamera(false)}>
            <Text>Camera Off</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
