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

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    await connectDB();

    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // No hashing, just a direct password comparison
    if (user.password !== password) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      fitnessGoal: user.fitnessgoal,
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Failed to log in");
  }
}

export async function getSavedItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user.saveditems);
  }
  catch (error) {
    console.error("Error fetching saved items:", error);
    res.status(500).send("Failed to fetch saved items");
  }
}

export async function updateNutritionPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: stub
}

// export async function deleteSavedItem(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     const userId = req.body.userId;
//     const item = req.body.item;
//     if (!userId || !item) {
//       res.status(400).json({ error: "User ID and item name are required" });
//       return;
//     }
//     await connectDB();
//     const upc = item.upc;
//     const savedItem = await User.findOneAndUpdate(
//       { _id: userId },
//       { $pull: { saveditems: { upc: upc } } },

//   }

export async function addSavedItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.body.userId;
    const item = req.body.item;

    if (!userId || !item) {
      res.status(400).json({ error: "User ID, item name, and item details are required" });
      return;
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.saveditems.push(item);
    await user.save();

    res.status(200).json(user.saveditems);
  }
  catch (error) {
    console.error("Error adding saved item:", error);
    res.status(500).send("Failed to add saved item");
  }
}
