import { Request, Response } from "express";
import pool from "../config/mySql";
import { RowDataPacket } from "mysql2";

export const inputManualRectifier = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const { rectifier } = req.body;

    const query = `INSERT INTO power (rectifier) VALUES (?)`;
    await connection.query<RowDataPacket[]>(query, [rectifier]);
    connection.release();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error fetching power meter data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
