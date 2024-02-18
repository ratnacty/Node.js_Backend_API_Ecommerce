import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// Registration 

export const registerUser = async (req, res) => {
    try {
      const { email, name, password, roleId } = req.body;

       // Check if the email is unique
    
      const existingUser = await prisma.user.findUnique({
      where: {email: req.body.email}
       });
       if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use. Please choose another email.' });
       }
  
    // validate roleId
    if(roleId === 1){
      return res.json({message: "We Already have Admin, Please choose another role"})
    }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: {
            connect: { id: roleId },
          },
        },
      });
  
      res.json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const jwtSecret = process.env.JWT_SECRET;

// Login endpoint
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          role: true,
        },
      });
  
      // Check if the user exists and the provided password is correct
      if (user && await bcrypt.compare(password, user.password)) {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
  
        // Save the token in the database
        await prisma.token.create({
          data: {
            token,
            expires_at: new Date(Date.now() + 3600000), // 1 hour expiration
            user: { connect: { id: user.id } },
          },
        });
  
        res.json({ token, user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// login


// const login = async (req, res) => {

// }




// export default registerUser;