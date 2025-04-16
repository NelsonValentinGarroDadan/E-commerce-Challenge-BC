import { User } from '@/types/api/user.type';
import fs from 'fs';
import path from 'path';
import { findProductById } from './products';
import { Product } from '@/types/api';

const usersPath = path.join(process.cwd(), 'src/data/users.json');

export function readUsers() {
  const file = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(file);
}

export function writeUsers(users: User[]) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
}
export async function getUserById(userId:string) {
    const users = readUsers();
    const user: User | null = users.find((u: User) => u.id === userId);
    if(!user) return null
    const { password, id , ...rest } = user;
    if(false) console.log(password,id)
    return rest;
}

export async function getUserFavorites({ name,category, userId,page = 1, limit = 10 }: {
  userId:string;
  name?:string;
  category?: string;
  page?: number;
  limit?: number;
}){
  const user = await getUserById(userId);
  if(!user) return null;
  let filtered:Product[] = user.favorites;
  if (category && category !== 'undefined' ) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (name && name !== 'undefined' ) {
    filtered = filtered.filter((p) => p.name.includes(name ?? ""));
  }
  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    products: paginated,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}

export async function saveFavoriteProduct({userId, productId}:{userId:string; productId:string}){
  const users = readUsers();

  // Buscar al usuario con todo el contenido
  const userIndex = users.findIndex((u: User) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('Usuario no encontrado');
  }

  const user:User = users[userIndex];

  // Verificar si el producto ya está en favoritos
  const alreadyFavorite = user.favorites?.some(p => p.id === productId);
  if (alreadyFavorite) {
    return('El producto ya está en favoritos');
  }

  // Buscar el producto completo
  const product = findProductById(productId);
  if (!product) {
    return('Producto no encontrado');
  }

  // Asegurarse que el campo favorites existe
  if (!user.favorites) {
    user.favorites = [];
  }

  // Agregar el producto a favoritos
  user.favorites.push(product);

  // Actualizar el usuario en la lista
  users[userIndex] = user;

  // Guardar el archivo
  writeUsers(users);
  return null
}