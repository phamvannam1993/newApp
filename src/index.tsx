import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/:id', async (c) => {
  const userId = c.req.param("id");
  console.log(c.env)
  try {
      const stmt = c.env.DB.prepare('SELECT * FROM Customers LIMIT 3');
  const { results } = await stmt.all();
    return c.json(results);
  } catch (e) {
    return c.json({ err: e.message }, 500);
  }

  return c.text('Hello Hono!')
})

export default app