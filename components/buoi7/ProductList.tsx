import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCard, {ProductCardProps} from './ProductCard';

const PRODUCTS_DATA = [
  { id: '1', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '2', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '3', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '4', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '5', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '6', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '7', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '8', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '9', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '10', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '11', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '12', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '13', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '14', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '15', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '16', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '17', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '18', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '19', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '20', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '21', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '22', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '23', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '24', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '25', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '26', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '27', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '28', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '29', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '30', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '31', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '32', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '33', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '34', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '35', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '36', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
  { id: '37', title: 'Nike Air MX Super 2500 - Red', price: 449, oldPrice: 699, rating: 5.0, discount: 39, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fSkuKLp95xhBnlbDFcNjSu98bUVP-9ky7Q&s' },
  { id: '38', title: 'Nike Air Zoom Pegasus', price: 389, oldPrice: 599, rating: 4.8, discount: 35, imageUrl: 'https://myshoes.vn/image/cache/catalog/2023/nike/nk08/giay-nike-air-zoom-pegasus-40-nam-den-trang-01-800x800.jpg' },
  { id: '39', title: 'Nike Revolution 6', price: 299, oldPrice: 450, rating: 4.5, discount: 33, imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/nike-revolution-6-next-nature-road-dc3728-003-01.jpg' },
  { id: '40', title: 'Nike Free Run', price: 519, oldPrice: 700, rating: 5.0, discount: 26, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7441a74f-7848-4c27-a74f-433e57eaceb2/custom-nike-free-rn-by-you.png' },
  { id: '41', title: 'Nike Waffle Debut', price: 320, oldPrice: 500, rating: 4.7, discount: 36, imageUrl: 'https://sneakerdaily.vn/wp-content/uploads/2024/04/Giay-Nike-Waffle-Debut-White-Black-DH9522-103.jpg' },
  { id: '42', title: 'Nike Air Max 90', price: 600, oldPrice: 899, rating: 4.9, discount: 33, imageUrl: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47081799-b7ec-4112-a934-a2eb2cf2c204/custom-nike-air-max-90-shoes-by-you.png' },
];

const ProductList = () => {
  const renderItem = ({item} : any) => (
    <ProductCard
      title={item.title}
      price={item.price}
      oldPrice={item.oldPrice}
      rating={item.rating}
      discount={item.discount}
      imageUrl={item.imageUrl}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#edeaeaff',
  },
});

export default ProductList;