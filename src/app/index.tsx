import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, Text, FlatList } from 'react-native';
import { CATEGORIES } from "@/utils/data/products"
import { useState } from 'react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartItemsQuantity={5} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={ { gap: 12, paddingHorizontal: 20 } }
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryButton title={item} isSelected={item === selectedCategory} onPress={() => handleCategorySelect(item)} />
        )}
      />
    </View>
  );
};