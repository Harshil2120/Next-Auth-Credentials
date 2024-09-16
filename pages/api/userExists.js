import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const { email } = req.body; // No need for 'await' here, just access req.body directly
    console.log("In userExists", email);

    const client = await clientPromise;
    const db = client.db("EaseMind");

    const user = await db.collection("users").findOne({ email }); // Await the findOne operation
    console.log(user);

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in userExists", error);
    return res
      .status(500)
      .json({ message: "An error occurred in checking user" });
  }
}
