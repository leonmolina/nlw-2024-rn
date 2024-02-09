import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { CartProduct, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, Linking, TouchableWithoutFeedback, View } from "react-native";

// FORMAT: XX YY ZZZZZZZZZ
// XX: International dialing code
// YY: National destination code
// ZZZZZZZZZ: Subscriber number
const PHONE_NUMBER = "XXYYZZZZZZZZZ";

export default function Cart() {
  const navigation = useNavigation();
  const cartStore = useCartStore();
  const [address, setAddress] = useState("");

  const total = formatCurrency(cartStore.products.reduce((acc, product) => acc + product.price * product.quantity, 0)); 

  const handleProductRemove = (product: CartProduct) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product),
      }
    ]);
  }

  const handleSendOrder = () => {
    if (address.trim().length === 0) {
      Alert.alert("Pedido", "Informe o endereço de entrega.");
      return;
    }
    const products = cartStore.products
    .map((product) => `\n ${product.quantity} - ${product.title}`)
    .join("");

    const message = `
      🍔 NOVO PEDIDO
      \n Entregar em: ${address}

      ${products}

      \n Valor total: ${total}
    `;

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 pt-8">
          <Header title="Seu carrinho" />
          <ScrollView className="border-b border-slate-700">
            {cartStore.products.length > 0 ? (
              <View className="p-5 flex-1">
                {/* TODO: Add buttons to increase quantity/remove */}
                {cartStore.products.map((product) => (
                  <Product key={product.id} onPress={() => handleProductRemove(product)} data={product} />
                ))}
              </View>
            ) : (
              <Text className="text-slate-400 font-body text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}
          </ScrollView>
            <View className="p-5 gap-5">
              <View className="flex-row gap-x-2 items-center">
                <Text className="text-white text-xl font-subtitle">Total:</Text>
                <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
              </View>
              {/* TODO: Add modal with multiple inputs instead of one */}
              <Input
                onChangeText={setAddress}
                placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                onSubmitEditing={handleSendOrder}
                blurOnSubmit
                returnKeyType="send"
              />
              <Button onPress={handleSendOrder}>
                <Button.Text>Enviar pedido</Button.Text>
                <Button.Icon>
                  <Feather name="arrow-right-circle" size={20} />
                </Button.Icon>
              </Button>
              <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};