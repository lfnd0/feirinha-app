import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import "../styles/global.css";

export default function Layout() {
  return (
    <>
      <StatusBar />
      <Slot />
    </>
  );
}
