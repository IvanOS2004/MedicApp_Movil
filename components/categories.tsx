import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface Category {
  name: string;
  icon: string;
  color: string;
}

interface CategoriesProps {
  categories: Category[];
  showHeader?: boolean;
  onCategoryPress?: (category: Category) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  showHeader = true,
  onCategoryPress,
}) => {
  const handleCategoryPress = (category: Category) => {
    if (onCategoryPress) {
      onCategoryPress(category);
    }
  };

  return (
    <View className="mb-6 px-4">
      {showHeader && (
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-800">Categories</Text>
          <TouchableOpacity>
            <Text className="text-sm font-medium text-teal-600">See All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenedor corregido - sin desbordamiento */}
      <View className="flex-row flex-wrap justify-between">
        {categories.map((category, index) => (
          <View
            key={index}
            className="w-[23%] mb-4 items-center" // Cambiado de 22% a 23% para mejor ajuste
          >
            <TouchableOpacity
              onPress={() => handleCategoryPress(category)}
              className="w-full items-center"
            >
              <View
                className={`h-16 w-16 ${category.color} mb-2 items-center justify-center rounded-xl`}
              >
                <Text className="text-2xl">{category.icon}</Text>
              </View>
              <Text className="text-center text-xs text-gray-700">
                {category.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Categories;
