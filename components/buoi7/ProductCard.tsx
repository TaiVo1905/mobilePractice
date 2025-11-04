import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type ProductCardProps = {
  id?: string,
  title: string,
  price: number,
  oldPrice: number,
  rating: number,
  discount: number,
  imageUrl: string,
};

export default function ProductCard({ title, price, oldPrice, rating, discount, imageUrl }: ProductCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Product image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        {/* Promotion section */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{discount}% OFF</Text>
        </View>
      </View>

      {/* Product info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        {/* Price section */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.oldPrice}>${oldPrice}</Text>
        </View>

        {/* Feedback section */}
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {Array(5).fill(0).map((_, index) => (
                <Icon key={index} name="star" size={12} color="#F59E0B" />
              ))}
          </View>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        {/* Add to cart */}
        <TouchableOpacity style={styles.button}>
          <Icon name="cart-outline" size={12} color="#FFFFFF" />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    margin: 8,
    minHeight: 200,
  },
  imageContainer: {
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 4,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 50,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#333333',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    minHeight: 34,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 4,
    marginBottom: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingBox: {
    backgroundColor: '#FFFBEA',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginLeft: 6,
  },
  ratingText: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D2939',
    padding: 4,
    borderRadius: 10,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 8,
  },
});