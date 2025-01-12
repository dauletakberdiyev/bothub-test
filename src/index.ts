import express from 'express';
import authRoutes from './domains/auth/auth.routes';
import userRoutes from './domains/user/user.routes';
import feedbackRoutes from './domains/feedback/feedback.routes';
import categoryRoutes from './domains/category/category.routes';
import statusRoutes from './domains/status/status.routes';
import upvoteRoutes from './domains/upvote/upvote.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Feedback Service API',
      version: '1.0.0',
      description: 'API documentation for the Feedback Service',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/domains/**/*.controller.ts'], // Path to the controllers with Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/category', categoryRoutes);
app.use('/status', statusRoutes);
app.use('/upvote', upvoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
