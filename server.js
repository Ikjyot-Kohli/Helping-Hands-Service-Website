const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB, run, all, get } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================
// SERVER-SIDE VALIDATION
// =========================================================

const PHONE_REGEX = /^[0-9]{10}$/;

const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const NAME_REGEX =
  /^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;

function cleanServerText(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function validPhone(value) {
  return PHONE_REGEX.test(cleanServerText(value));
}

function validEmail(value) {
  return EMAIL_REGEX.test(cleanServerText(value));
}

function validName(value) {
  const name = cleanServerText(value);

  if (!NAME_REGEX.test(name)) {
    return false;
  }

  const letters = name.replace(/[^\p{L}]/gu, '');

  return letters.length >= 2;
}

function validText(value, minLength = 2) {
  const text = cleanServerText(value);

  return (
    text.length >= minLength &&
    /\p{L}/u.test(text)
  );
}

function properName(value) {
  return cleanServerText(value)
    .toLowerCase()
    .split(' ')
    .map(word =>
      word
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(' ');
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


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

    if (!title || !category || !location || !donor_name || !donor_phone) {
      return res.status(400).json({
        error: 'Title, category, location, donor name and phone are required.'
      });
    }

    if (!validName(donor_name)) {
      return res.status(400).json({
        error: 'Invalid donor name.'
      });
    }

    if (!validPhone(donor_phone)) {
      return res.status(400).json({
        error: 'Phone number must contain exactly 10 digits.'
      });
    }

    if (!validText(title)) {
      return res.status(400).json({
        error: 'Invalid item title.'
      });
    }
    const defaultImg = category === 'Book'
      ? 'https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80';

    const result = await run(
      `INSERT INTO items (title, category, sub_category, location, distance, status, author_or_age, class_or_gender, condition, donor_name, donor_phone, description, image_url)
       VALUES (?, ?, ?, ?, ?, 'Available', ?, ?, ?, ?, ?, ?, ?)`,
      [
        cleanServerText(title),
        category,
        sub_category || (category === 'Book' ? 'Textbook' : 'Casual Wear'),
        cleanServerText(location),
        distance || '1.0 km',
        cleanServerText(author_or_age || 'N/A'),
        cleanServerText(class_or_gender || 'General'),
        condition || 'Good',
        properName(donor_name),
        cleanServerText(donor_phone),
        cleanServerText(
          description || 'Donated with love for the Vasai community.'),
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
      return res.status(400).json({
        error: 'Name, email, phone and location are required.'
      });
    }

    if (!validName(name)) {
      return res.status(400).json({
        error: 'Please enter a valid name.'
      });
    }

    if (!validEmail(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address.'
      });
    }

    if (!validPhone(phone)) {
      return res.status(400).json({
        error: 'Phone number must contain exactly 10 digits.'
      });
    }
    [
      properName(name),
      cleanServerText(email).toLowerCase(),
      cleanServerText(phone),
      cleanServerText(location),
      role || 'Teaching Drive',
      availability || 'Weekends'
    ]

    const result = await run(
      `INSERT INTO volunteers
  (name, email, phone, location, role, availability, status)
  VALUES (?, ?, ?, ?, ?, ?, 'Active')`,
      [
        properName(name),
        cleanServerText(email).toLowerCase(),
        cleanServerText(phone),
        cleanServerText(location),
        role || 'Teaching Drive',
        availability || 'Weekends'
      ]
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
      return res.status(400).json({
        error: 'Name, phone and item title are required.'
      });
    }

    if (!validName(requester_name)) {
      return res.status(400).json({
        error: 'Please enter a valid name.'
      });
    }

    if (!validPhone(requester_phone)) {
      return res.status(400).json({
        error: 'Phone number must contain exactly 10 digits.'
      });
    }

    if (address && !validText(address)) {
      return res.status(400).json({
        error: 'Please enter a valid address.'
      });
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

// =========================================================
// API: MONETARY DONATIONS
// =========================================================

app.post('/api/donations', async (req, res) => {
  try {
    const {
      donor_name,
      email,
      amount,
      cause
    } = req.body;

    if (!donor_name || !email || !amount) {
      return res.status(400).json({
        error: 'Donor name, email and amount are required.'
      });
    }

    if (!validName(donor_name)) {
      return res.status(400).json({
        error: 'Please enter a valid donor name.'
      });
    }

    if (!validEmail(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address.'
      });
    }

    const donationAmount = Number(amount);

    if (!Number.isFinite(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({
        error: 'Please enter a valid donation amount.'
      });
    }

    const result = await run(
      `INSERT INTO monetary_donations
      (donor_name, email, amount, cause)
      VALUES (?, ?, ?, ?)`,
      [
        properName(donor_name),
        cleanServerText(email).toLowerCase(),
        donationAmount,
        cause || 'Education & Clothes'
      ]
    );

    res.status(201).json({
      id: result.id,
      message: 'Thank you for your generous donation!'
    });

  } catch (err) {
    console.error('Donation error:', err);

    res.status(500).json({
      error: 'Unable to process donation.'
    });
  }
});


// =========================================================
// API: CONTACT FORM
// =========================================================

app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email and message are required.'
      });
    }

    if (!validName(name)) {
      return res.status(400).json({
        error: 'Please enter a valid name.'
      });
    }

    if (!validEmail(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address.'
      });
    }

    if (!validText(message, 5)) {
      return res.status(400).json({
        error: 'Please enter a meaningful message.'
      });
    }

    if (subject && !validText(subject, 3)) {
      return res.status(400).json({
        error: 'Please enter a valid subject.'
      });
    }

    const result = await run(
      `INSERT INTO contact_messages
      (name, email, subject, message)
      VALUES (?, ?, ?, ?)`,
      [
        properName(name),
        cleanServerText(email).toLowerCase(),
        subject ? cleanServerText(subject) : 'General Query',
        cleanServerText(message)
      ]
    );

    res.status(201).json({
      id: result.id,
      message: 'Your message has been sent successfully!'
    });

  } catch (err) {
    console.error('Contact form error:', err);

    res.status(500).json({
      error: 'Unable to send your message.'
    });
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

/*Start Server
app.listen(PORT, () => {
  console.log(`Helping Hands server running at http://localhost:${PORT}`);
});*/

// =========================================================
// START SERVER AFTER DATABASE INITIALIZATION
// =========================================================

async function startServer() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Helping Hands server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();