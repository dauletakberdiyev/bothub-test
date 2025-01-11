import express, { Request, Response } from 'express';
import authRoutes from './domains/auth/auth.routes';
import userRoutes from './domains/user/user.routes';
import feedbackRoutes from './domains/feedback/feedback.routes';
import categoryRoutes from './domains/category/category.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/category', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
