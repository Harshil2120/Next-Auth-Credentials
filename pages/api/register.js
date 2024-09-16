import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    const { email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("EaseMind");

    const user = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      chathistory: [],
    });
    console.log(user);

    return res.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return res.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
