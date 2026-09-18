import axios from "axios";
import { Platform } from "react-native";

// Android Emulator uses 10.0.2.2 to access host machine; iOS uses localhost or PC's local IP
const BASE_URL = Platform.OS === "android" 
  ? "http://10.0.2.2:5000" 
  : "http://127.0.0.1:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});