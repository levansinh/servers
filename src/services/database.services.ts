import { Collection, Db, MongoClient } from 'mongodb';
import { config } from 'dotenv';
import User from '@/models/schemas/User.schema';
import Category from '@/models/schemas/Category.schema';
import Product from '@/models/schemas/Product.schema';
import { RefreshToken } from '@/models/schemas/RefreshToken.schema';

config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ie7ncdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

// const uri = process.env.URL as string;

class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async connect() {
    try {
      await this.client.connect();
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      throw new Error('server disconnect!!');
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USER as string);
  }

  get category(): Collection<Category> {
    return this.db.collection(process.env.DB_COLLECTION_CATEGORY as string);
  }

  get product(): Collection<Product> {
    return this.db.collection(process.env.DB_COLLECTION_PRODUCT as string);
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_COLLECTION_REFRESH_TOKEN as string);
  }
}
const databaseService = new DatabaseService();

export default databaseService;
