import express from 'express';
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import nomineesRoutes from './routes/nominees.js';
import votesRouter from './routes/votes.js';
import editionsRouter from './routes/editions.js';

const PORT = 5011;
const app = express()

await connectDB();

app.use(cors())
app.use(express.json(
  {
    origin: ['https://devlafuente.es', 'https://www.devlafuente.es'],
    credentials: true
  }
))
app.use('/uploads', express.static('uploads'))

app.use('/auth', authRoutes)
app.use('/editions', editionsRouter)
app.use('/categories', categoriesRoutes)
app.use('/nominees', nomineesRoutes)
app.use('/votes', votesRouter)

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`)
})
