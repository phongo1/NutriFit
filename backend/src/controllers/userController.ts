import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { connectDB } from '../config/db';
import mongoose from 'mongoose';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    const { firstName, lastName, username, password, fitnessGoal } = req.body;
    if (!firstName || !lastName || !username || !password || !fitnessGoal) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Connect to the database
    await connectDB();
    // Check if the username already exists
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "Username already exists"});
      return;
    }

    const newUser = new User({
      username: username,
      firstname: firstName,
      lastname: lastName,
      password: password, // Remember to hash this in production
      fitnessgoal: fitnessGoal,
      saveditems: [],
    });
    const result = await newUser.save();
    // const user = await collections.users?.findOne({ _id: result?.insertedId });

    res.status(201).json({ 
      userId: result._id,
      username,
      firstName,
      lastName,
      fitnessGoal
    
    });

    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Failed to create user");
  }
}




export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
//  try {
//   const {username, password} = req.body;

//   const user = await collections.users?.findOne({ username});
// if(!user || user.password !== password){
//   res.status(401).json({ error: "Invalid username or password"});
//   return;
// }
//   res.status(200).json({ message: "Login successful", userId: user._id });
//  } catch (error) {
//   console.error("Error loggin in:", error);
//   res.status(500).send("Login failed");
//  }
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
