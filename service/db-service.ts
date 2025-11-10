import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

// Các kiểu dữ liệu vẫn giữ nguyên
export type Category = { id: number; name: string; };
export type Product = { id: number; name: string; price: number; img: string; categoryId: number; };
export type User = { id: number; username: string; password: string; role: string; };

const initialCategories: Category[] = [
  { id: 1, name: 'Áo' },
  { id: 2, name: 'Giày' },
  { id: 3, name: 'Balo' },
  { id: 4, name: 'Mũ' },
  { id: 5, name: 'Túi' },
];
const initialProducts: Product[] = [
  { id: 1, name: 'Áo sơ mi', price: 250000, img: 'hinh1.jpg', categoryId: 1 },
  { id: 2, name: 'Giày sneaker', price: 1100000, img: 'hinh1.jpg', categoryId: 2 },
  { id: 3, name: 'Balo thời trang', price: 490000, img: 'hinh1.jpg', categoryId: 3 },
  { id: 4, name: 'Mũ lưỡi trai', price: 120000, img: 'hinh1.jpg', categoryId: 4 },
  { id: 5, name: 'Túi xách nữ', price: 980000, img: 'hinh1.jpg', categoryId: 5 },
];

let db: SQLiteDatabase | null = null;

// Sử dụng `openDatabase` (hàm đồng bộ) để lấy đối tượng DB
const getDb = (): SQLiteDatabase => {
  if (db) return db;
  db = SQLite.openDatabaseSync('myDatabase.db');
  return db;
};

export const initDatabase = async (onSuccess?: () => void): Promise<void> => {
  try {
    const database = getDb();

    // Chuẩn bị các câu lệnh SQL
    const setupStatements: { sql: string; args?: any[] }[] = [
      // Categories
      { sql: 'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)', args: [] },
      ...initialCategories.map(category => ({
        sql: 'INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)',
        args: [category.id, category.name],
      })),

      // Products
      {
        sql: `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          price REAL,
          img TEXT,
          categoryId INTEGER,
          FOREIGN KEY (categoryId) REFERENCES categories(id)
        )`,
        args: [],
      },
      ...initialProducts.map(product => ({
        sql: 'INSERT OR IGNORE INTO products (id, name, price, img, categoryId) VALUES (?, ?, ?, ?, ?)',
        args: [product.id, product.name, product.price, product.img, product.categoryId],
      })),

      // Users
      {
        sql: `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT,
          role TEXT
        )`,
        args: [],
      },

      // Insert Admin (sử dụng INSERT OR IGNORE, đơn giản hơn)
      { sql: 'INSERT OR IGNORE INTO users (id, username, password, role) VALUES (1, ?, ?, ?)', args: ['admin', '123456', 'admin'] }
    ];

    // Thực thi tất cả các câu lệnh SQL trong một lần (có thể là một transaction)
    // execAsync expects a single SQL string; build a script by injecting arguments into SQL templates.
    const sqlBatch = setupStatements.map(stmt => {
      let sql = stmt.sql;
      if (stmt.args && stmt.args.length) {
        for (const arg of stmt.args) {
          const replacement =
            typeof arg === 'string'
              ? `'${arg.replace(/'/g, "''")}'`
              : arg === null
              ? 'NULL'
              : String(arg);
          sql = sql.replace('?', replacement);
        }
      }
      return sql;
    }).join(';');

    await database.execAsync(sqlBatch);

    console.log('✅ Database initialized and seeded');
    if (onSuccess) onSuccess();

  } catch (error) {
    console.error('❌ initDatabase error:', error);
  }
};

// 🔍 Lấy danh sách Categories (getAllAsync)
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const database = getDb();
    // getAllAsync trả về một mảng object
    const items = await database.getAllAsync<Category>('SELECT * FROM categories');
    return items;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
};

// 🔍 Lấy danh sách Products (getAllAsync)
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const database = getDb();
    const items = await database.getAllAsync<Product>('SELECT * FROM products');
    return items;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

// ➕ Thêm Product (runAsync)
export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const database = getDb();
    await database.runAsync(
      'INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)',
      [product.name, product.price, product.img, product.categoryId]
    );
    console.log('✅ Product added');
  } catch (error) {
    console.error('❌ Error adding product:', error);
  }
};

// 🔄 Cập nhật Product (runAsync)
export const updateProduct = async (product: Product) => {
  try {
    const database = getDb();
    await database.runAsync(
      'UPDATE products SET name = ?, price = ?, categoryId = ?, img = ? WHERE id = ?',
      [product.name, product.price, product.categoryId, product.img, product.id]
    );
    console.log('✅ Product updated with image');
  } catch (error) {
    console.error('❌ Error updating product:', error);
  }
};

// ❌ Xóa Product (runAsync)
export const deleteProduct = async (id: number) => {
  try {
    const database = getDb();
    await database.runAsync('DELETE FROM products WHERE id = ?', [id]);
    console.log('✅ Product deleted');
  } catch (error) {
    console.error('❌ Error deleting product:', error);
  }
};

// ----------------- Lọc & Tìm kiếm -----------------
// Lọc sản phẩm theo loại
export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    const db = getDb();
    const products = await db.getAllAsync<Product>(
      'SELECT * FROM products WHERE categoryId = ?',
      [categoryId]
    );
    return products;
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    return [];
  }
};

// Tìm kiếm sản phẩm theo tên sản phẩm hoặc theo tên loại
export const searchProductsByNameOrCategory = async (keyword: string): Promise<Product[]> => {
  try {
    const db = getDb();
    const likeKeyword = `%${keyword}%`;
    const products = await db.getAllAsync<Product>(
      `
      SELECT products.* FROM products
      JOIN categories ON products.categoryId = categories.id
      WHERE products.name LIKE ? OR categories.name LIKE ?
      `,
      [likeKeyword, likeKeyword]
    );
    return products;
  } catch (error) {
    console.error('❌ Error searching by name or category:', error);
    return [];
  }
};

// ------------------ crud user -----------------
// ➕ Thêm người dùng (runAsync)
export const addUser = async (username: string, password: string, role: string): Promise<boolean> => {
  try {
    const db = getDb();
    await db.runAsync(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    console.log('✅ User added');
    return true;
  } catch (error) {
    // Lỗi thường do UNIQUE constraint (username đã tồn tại)
    console.error('❌ Error adding user:', error);
    return false;
  }
};

// 🔄 Cập nhật người dùng (runAsync)
export const updateUser = async (user: User) => {
  try {
    const db = getDb();
    await db.runAsync(
      'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
      [user.username, user.password, user.role, user.id]
    );
    console.log('✅ User updated');
  } catch (error) {
    console.error('❌ Error updating user:', error);
  }
};

// ❌ Xóa người dùng theo id (runAsync)
export const deleteUser = async (id: number) => {
  try {
    const db = getDb();
    await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
    console.log('✅ User deleted');
  } catch (error) {
    console.error('❌ Error deleting user:', error);
  }
};

// 🔍 Lấy danh sách tất cả người dùng (getAllAsync)
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const db = getDb();
    const users = await db.getAllAsync<User>('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
};

// 🔑 Lấy người dùng theo username & password (getFirstAsync)
export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  try {
    const db = getDb();
    // getFirstAsync chỉ trả về hàng đầu tiên hoặc null
    const user = await db.getFirstAsync<User>(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    return user;
  } catch (error) {
    console.error('❌ Error getting user by credentials:', error);
    return null;
  }
};

// 🔍 Lấy người dùng theo id (getFirstAsync)
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const db = getDb();
    const user = await db.getFirstAsync<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return user;
  } catch (error) {
    console.error('❌ Error getting user by id:', error);
    return null;
  }
};