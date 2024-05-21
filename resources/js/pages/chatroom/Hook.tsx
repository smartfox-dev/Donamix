import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const config = {
  mode: "rtc",
  codec: "vp8",
};
function useAgora() {
  const useClient = createClient({
    mode: "rtc",
    codec: "vp8",
  });
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  return [useClient, useMicrophoneAndCameraTracks];
}
export default useAgora;
