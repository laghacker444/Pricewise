// src/pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const user = new User({ email, password });
  await user.save();

  return res.status(201).json({ message: "User created successfully" });
}
