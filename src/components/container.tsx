import { ReactNode } from "react";
import { View } from "react-native";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <View className="flex-row w-full h-12 my-4">{children}</View>;
}
