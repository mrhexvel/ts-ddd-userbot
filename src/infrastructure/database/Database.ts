import mysql from "mysql2/promise";

export class Database {
  private connection!: mysql.Connection;

  constructor(
    private host: string,
    private user: string,
    private password: string,
    private database: string
  ) {}

  async initialize() {
    this.connection = await mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });

    await this.connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        token TEXT NOT NULL,
        other_data TEXT
      );
    `);
  }

  async addUser(
    userId: number,
    token: string,
    otherData?: string
  ): Promise<void> {
    await this.connection.execute(
      "INSERT INTO users (id, token, other_data) VALUES (?, ?, ?)",
      [userId, token, otherData]
    );
  }
  async getUser(userId: number): Promise<any> {
    const [rows] = (await this.connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    )) as [mysql.RowDataPacket[], mysql.FieldPacket[]];
    return rows[0];
  }

  async getAllUsers(): Promise<any[]> {
    const [rows] = (await this.connection.execute("SELECT * FROM users")) as [
      mysql.RowDataPacket[],
      mysql.FieldPacket[]
    ];
    return rows;
  }

  async removeUser(userId: number): Promise<void> {
    await this.connection.execute("DELETE FROM users WHERE id = ?", [userId]);
  }
}
