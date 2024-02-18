import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import bcrypt from "bcrypt"


export const getAllUsers = async (req, res) => {
    const user = await prisma.user.findMany()
    res.json(user)
}

export const createUser = async(req, res) => {
    
    const { name, email, password, roleId } = req.body
  
    if (!name || !email || !password || !roleId) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }

  
    const users = await prisma.user.create({
      data: { name, email, password, 
        role: {
          connect: { id: roleId },
        }, }
    })
  
    res.json({ message: 'user created successfully', users })
  }

  
export const getUser = async (req, res) => {
  const userId = req.params.id

  if(isNaN(userId)){
    res.status(400).json({message: 'Invalid ID'})
    return
  }

  try{
    const user = await prisma.user.findFirstOrThrow({where: {id:Number(userId)}})
    res.json(user)
  }catch(err){
    res.status(404).json({message: 'User Not found'})
  }
 
}


export const updateUser = async (req, res) => {
  const {name, email, password } = req.body

  if(!name || !email || !password){
    res.status(400).json({message: "Missing fields"})
    return
  }

  const userId = req.params.id
  const hashedPassword = await bcrypt.hash(password, 10);

  if(isNaN(userId)){
    res.status(400).json({message: 'Invalid ID'})
    return
  }

  try {
    const user = await prisma.user.update({
      where: {id:Number(userId)}, 
      data: {
        name, 
        email,
        password: hashedPassword,
      }
    })
    res.status(201).json({message: 'User Update Successfully', user})
  } catch (error) {
    req.status(404).json({message: 'User Not Found'})
  }
}

export const deleteUser = async (req, res) => {
  const params= Number(req.params.id)
 
  if(isNaN(params)){
    res.status(400).json({message:'Invalid ID'})
    return
  }

  try {
    const user = await prisma.user.delete({
      where: {id: Number(params)}
    }
    )
    res.status(200).json({message: "User deleted successfully", user})
  } catch (error) {
    res.status(404).json({message: 'User Not Found'})
  }

}