import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, Text, FlatList, SectionList } from 'react-native';
import { CATEGORIES, MENU } from "@/utils/data/products"
import { useRef, useState } from 'react';
import { Product } from '@/components/product';
import { Link } from 'expo-router';

export default function App() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  // TODO: Add select category on scroll
  const sectionListRef = useRef<SectionList>(null);
  const flatListRef = useRef<FlatList>(null);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((item) => item === selectedCategory);
    const itemIndex = MENU[sectionIndex].data.findIndex((item) => item.id === selectedCategory);

    if (sectionListRef.current && flatListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
      flatListRef.current.scrollToIndex({
        index: sectionIndex,
        animated: true,
        viewPosition: 0,
      });
    }
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartItemsQuantity={5} />
      <FlatList
        ref={flatListRef}
        data={CATEGORIES}
        keyExtractor={(item) => item}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={ { gap: 12, paddingHorizontal: 20 } }
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} />
        )}
      />
      <SectionList
        ref={sectionListRef}
        className="flex-1 p-5"
        contentContainerStyle={ { paddingBottom: 100 } }
        showsVerticalScrollIndicator={false}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
        )}
      />
    </View>
  );
};