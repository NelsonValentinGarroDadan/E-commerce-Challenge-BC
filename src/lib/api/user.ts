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