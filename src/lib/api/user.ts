import { User } from '@/types/api/user.type';
import fs from 'fs';
import path from 'path';

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
  userId:string
  name?:string
  category?: string
  page?: number
  limit?: number
}){
  const user = await getUserById(userId);
  if(!user) return null;
  let filtered = user.favorites;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (name) {
    filtered = filtered.filter((p) => p.name.includes(name));
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