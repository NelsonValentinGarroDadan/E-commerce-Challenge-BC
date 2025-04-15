import { User } from "@/types/api/user.type";
import { Login, Register } from "@/types/auth.type"
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "my-secret";
const usersPath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  const file = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(file);
}

function writeUsers(users: User[]) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf-8');
}

export async function registerUser(data: Register) {
    if (data.password !== data.confirm) {
      return {
        statusCode: 400,
        result: null,
        errors: [{ name: 'ValidationError', description: 'Las contraseñas no coinciden' }]
      }
    }
  
    const users = readUsers();

    const existing = users.find((user: User) => user.email === data.email);
    if (existing) {
        return {
        statusCode: 409,
        result: null,
        errors: [{ title: 'Conflict', description: 'El mail ya esta en uso' }]
        }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser:User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: hashedPassword
    };

    users.push(newUser);
    writeUsers(users);
    return {
      statusCode: 201,
      result: { message: 'Usuario registrado' },
      errors: []
    }
  }
  
export async function loginUser(data:Login) {
    const users = readUsers();

    const user = users.find((u: User) => u.email === data.email);
    if (!user) {
      return {
        statusCode: 400,
        result: null,
        errors: [{ title: 'BadRequest', description: 'Credenciales incorrectas' }]
      };
    }
  
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return {
        statusCode: 400,
        result: null,
        errors: [{ title: 'BadRequest', description: 'Credenciales incorrectas' }]
      };
    }
    const token = jwt.sign(
      { id: user.id},
      SECRET,
      { expiresIn: "1h" }
    );
    return {
      statusCode: 200,
      result: { message: 'Login exitoso', token },
      errors: []
    }
  }