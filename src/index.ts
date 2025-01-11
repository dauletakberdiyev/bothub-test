import express, { Request, Response } from 'express';
import authRoutes from './domains/auth/auth.routes';
import userRoutes from './domains/user/user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
