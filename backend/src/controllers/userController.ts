import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { collections } from '../services/database.service';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
try {

  const { firstName, lastName, username, password } = req.body;

  const existingUser = await collections.users?.findOne({ username });
  if (existingUser) {
    res.status(400).json({ error: "Username already exists"});
    return;
  }

  const newUser = new User(firstName, lastName, username, password);
  const result = await collections.users?.insertOne(newUser);
  const user = await collections.users?.findOne({ _id: result?.insertedId });

  res.status(201).json({ 
    userId: result?.insertedId,
  
  });
} catch (error) {
  console.error("Error creating user:", error);
  res.status(500).send("Failed to create user");
}
}




export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
 try {
  const {username, password} = req.body;

  const user = await collections.users?.findOne({ username});
if(!user || user.password !== password){
  res.status(401).json({ error: "Invalid username or password"});
  return;
}
  res.status(200).json({ message: "Login successful", userId: user._id });
 } catch (error) {
  console.error("Error loggin in:", error);
  res.status(500).send("Login failed");
 }
}

export async function getSavedItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: stub
}

export async function updateNutritionPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: stub
}

export async function addSavedItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: stub
}
