import express, { Request, Response } from 'express';
import authRoutes from './domains/auth/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
