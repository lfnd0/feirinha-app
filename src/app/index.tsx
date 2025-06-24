import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../components/container";
import { itens } from "../mocks";

type Item = {
  isChecked?: boolean;
  name: string;
  price: number;
  quantity: number;
};

export default function App() {
  const [item, setItem] = useState<Item>({
    isChecked: false,
    name: "",
    price: 0,
    quantity: 0,
  });

  const [list, setList] = useState<Item[]>(itens);

  function addItem() {
    if (!item.name) {
      return;
    }

    setList((prevList) => [...prevList, item]);
    setItem({
      isChecked: false,
      name: "",
      price: 0.0,
      quantity: 0,
    });
  }

  function changeChecked(index: number) {
    setList((prevList) => {
      return prevList.map((item, i) => {
        const isChecked = !item.isChecked;
        return index === i ? { ...item, isChecked } : item;
      });
    });
  }

  function changePrice(index: number, price: string) {
    const formattedPrice = Number(price.replace(/\D/g, "")) / 100;
    setList((prevList) =>
      prevList.map((item, i) =>
        index === i ? { ...item, price: formattedPrice } : item
      )
    );
  }

  function changeTotal() {
    return list
      .filter((item) => item.isChecked)
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView className="flex mx-4 my-4">
      <Text className="text-center font-bold uppercase">Feirinha App</Text>

      <Container>
        <TextInput
          className="text-center border rounded py-3 px-2 w-12"
          value={item.quantity.toString()}
          onChangeText={(quantity) =>
            setItem((prev) => ({
              ...prev,
              quantity: Number(quantity.replace(/[^0-9]/g, "")),
            }))
          }
          keyboardType="numeric"
        />
        <TextInput
          className="border rounded flex-1 ml-2 py-3 px-2"
          value={item.name}
          onChangeText={(name) => setItem((prev) => ({ ...prev, name }))}
          placeholder="Nome"
        />
        <TouchableOpacity className="ml-1 p-0 justify-center" onPress={addItem}>
          <MaterialIcons name="add-circle" size={30} color="black" />
        </TouchableOpacity>
      </Container>

      <View className="flex-row mb-4">
        <Text>Total: </Text>
        <Text>{changeTotal()}</Text>
      </View>

      <FlatList
        style={{ height: height * 0.78 }}
        data={list}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View className="flex-row items-center mb-2">
            <Text className="w-10 font-bold">Adc.</Text>
            <Text className="w-10 font-bold">Qtd.</Text>
            <Text className="flex-1 font-bold">Nome</Text>
            <Text className="w-24 font-bold">Preço (und.)</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View className="flex-row items-center mb-2">
            <View className="items-center w-10">
              <BouncyCheckbox
                size={18}
                fillColor="#000"
                key={index}
                isChecked={item.isChecked}
                onPress={() => {
                  changeChecked(index);
                }}
              />
            </View>
            <Text className="w-10">{item.quantity}</Text>
            <Text className="flex-1">{item.name}</Text>
            <TextInput
              className="w-24 border rounded py-1 px-1"
              keyboardType="numeric"
              value={item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              onChangeText={(price) => changePrice(index, price)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
