const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB, run, all, get } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
initDB()
  .then(() => console.log('Database initialized successfully.'))
  .catch((err) => console.error('Database initialization error:', err));

// API: Stats counter
app.get('/api/stats', async (req, res) => {
  try {
    const books = await get("SELECT COUNT(*) as count FROM items WHERE category = 'Book'");
    const clothes = await get("SELECT COUNT(*) as count FROM items WHERE category = 'Clothes'");
    const volunteers = await get("SELECT COUNT(*) as count FROM volunteers");
    const children = 1420 + (books.count * 2) + (clothes.count * 3);

    res.json({
      booksDonated: 3450 + books.count,
      clothesShared: 1890 + clothes.count,
      activeVolunteers: 450 + volunteers.count,
      childrenBenefited: children
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get items (with search, category, location, status filters)
app.get('/api/items', async (req, res) => {
  try {
    const { search, category, location, status } = req.query;
    let sql = 'SELECT * FROM items WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (location && location !== 'All') {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (status && status !== 'All') {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (search && search.trim() !== '') {
      sql += ' AND (title LIKE ? OR description LIKE ? OR author_or_age LIKE ? OR location LIKE ? OR sub_category LIKE ?)';
      const queryStr = `%${search.trim()}%`;
      params.push(queryStr, queryStr, queryStr, queryStr, queryStr);
    }

    sql += ' ORDER BY id DESC';

    const items = await all(sql, params);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await get('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Create new item (Book or Clothes donation)
app.post('/api/items', async (req, res) => {
  try {
    const {
      title,
      category,
      sub_category,
      location,
      distance,
      author_or_age,
      class_or_gender,
      condition,
      donor_name,
      donor_phone,
      description,
      image_url
    } = req.body;

    if (!title || !category || !location || !donor_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const defaultImg = category === 'Book'
      ? 'https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80';

    const result = await run(
      `INSERT INTO items (title, category, sub_category, location, distance, status, author_or_age, class_or_gender, condition, donor_name, donor_phone, description, image_url)
       VALUES (?, ?, ?, ?, ?, 'Available', ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category,
        sub_category || (category === 'Book' ? 'Textbook' : 'Casual Wear'),
        location,
        distance || '1.0 km',
        author_or_age || 'N/A',
        class_or_gender || 'General',
        condition || 'Good',
        donor_name,
        donor_phone || '+91 98000 00000',
        description || 'Donated with love for the Vasai community.',
        image_url || defaultImg
      ]
    );

    const newItem = await get('SELECT * FROM items WHERE id = ?', [result.id]);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Update item status (Available, Reserved, Collected)
app.patch('/api/items/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Available', 'Reserved', 'Collected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    await run('UPDATE items SET status = ? WHERE id = ?', [status, req.params.id]);
    const updated = await get('SELECT * FROM items WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete item (Admin function)
app.delete('/api/items/:id', async (req, res) => {
  try {
    await run('DELETE FROM items WHERE id = ?', [req.params.id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Volunteer registration & management
app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await all('SELECT * FROM volunteers ORDER BY id DESC');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/volunteers', async (req, res) => {
  try {
    const { name, email, phone, location, role, availability } = req.body;
    if (!name || !email || !phone || !location) {
      return res.status(400).json({ error: 'Missing required volunteer fields' });
    }

    const result = await run(
      `INSERT INTO volunteers (name, email, phone, location, role, availability, status) VALUES (?, ?, ?, ?, ?, ?, 'Active')`,
      [name, email, phone, location, role || 'Teaching Drive', availability || 'Weekends']
    );

    const newVol = await get('SELECT * FROM volunteers WHERE id = ?', [result.id]);
    res.status(201).json(newVol);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Borrow / Pickup requests
app.get('/api/borrow', async (req, res) => {
  try {
    const requests = await all('SELECT * FROM borrow_requests ORDER BY id DESC');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/borrow', async (req, res) => {
  try {
    const { item_id, item_title, requester_name, requester_phone, address, notes } = req.body;
    if (!item_title || !requester_name || !requester_phone) {
      return res.status(400).json({ error: 'Missing required request fields' });
    }

    const result = await run(
      `INSERT INTO borrow_requests (item_id, item_title, requester_name, requester_phone, address, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, 'Pending')`,
      [item_id || null, item_title, requester_name, requester_phone, address || 'Vasai Local', notes || '']
    );

    // Optionally mark item as Reserved
    if (item_id) {
      await run("UPDATE items SET status = 'Reserved' WHERE id = ?", [item_id]);
    }

    const newReq = await get('SELECT * FROM borrow_requests WHERE id = ?', [result.id]);
    res.status(201).json(newReq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Monetary Donations
app.post('/api/donations', async (req, res) => {
  try {
    const { donor_name, email, amount, cause } = req.body;
    const result = await run(
      `INSERT INTO monetary_donations (donor_name, email, amount, cause) VALUES (?, ?, ?, ?)`,
      [donor_name || 'Anonymous', email || 'donor@helpinghand.org', amount || 500, cause || 'Education & Clothes']
    );
    res.status(201).json({ id: result.id, message: 'Thank you for your generous donation!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const result = await run(
      `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
      [name, email, subject || 'General Query', message]
    );
    res.status(201).json({ id: result.id, message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Notifications Feed
app.get('/api/notifications', async (req, res) => {
  res.json([
    { id: 1, title: 'New Donation!', message: 'Rajesh Sharma listed Class 10 Maths book in Vasai West.', time: '10 mins ago', icon: '📚' },
    { id: 2, title: 'Volunteer Joined', message: 'Aarav Mehta registered for Vasai Weekend Drive.', time: '25 mins ago', icon: '🙋' },
    { id: 3, title: 'Clothes Drive Active', message: 'Winter woolen sweaters collected in Vasai East.', time: '1 hour ago', icon: '👕' },
    { id: 4, title: 'Book Picked Up', message: 'Science Explorer delivered to Nalasopara student.', time: '2 hours ago', icon: '✅' }
  ]);
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Helping Hand Service Website is running live on:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`====================================================`);
});
