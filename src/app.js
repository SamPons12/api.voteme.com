import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import nomineesRoutes from './routes/nominees.js';
import votesRouter from './routes/votes.js';
import editionsRouter from './routes/editions.js';
import helmet from 'helmet';
import compression from 'compression';

const PORT = 5011;
const app = express()

await connectDB();

app.disable('x-powered-by')
app.use(cors())
app.use(express.json(
  {
    origin: process.env.APP_APP_URL.split(', '),
    credentials: true
  }
))
app.use(helmet());
app.use(compression());

app.use('/auth', authRoutes)
app.use('/editions', editionsRouter)
app.use('/categories', categoriesRoutes)
app.use('/nominees', nomineesRoutes)
app.use('/votes', votesRouter)

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`)
})
