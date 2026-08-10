const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'helping_hands.db');
const db = new sqlite3.Database(dbPath);

// Promisified query helpers
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function initDB() {
  db.serialize(async () => {
    // Create items table
    await run(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        sub_category TEXT,
        location TEXT NOT NULL,
        distance TEXT,
        status TEXT DEFAULT 'Available',
        author_or_age TEXT,
        class_or_gender TEXT,
        condition TEXT,
        donor_name TEXT NOT NULL,
        donor_phone TEXT,
        description TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create volunteers table
    await run(`
      CREATE TABLE IF NOT EXISTS volunteers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        location TEXT NOT NULL,
        role TEXT NOT NULL,
        availability TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create borrow_requests table
    await run(`
      CREATE TABLE IF NOT EXISTS borrow_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER,
        item_title TEXT NOT NULL,
        requester_name TEXT NOT NULL,
        requester_phone TEXT NOT NULL,
        address TEXT,
        notes TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create monetary_donations table
    await run(`
      CREATE TABLE IF NOT EXISTS monetary_donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donor_name TEXT NOT NULL,
        email TEXT NOT NULL,
        amount INTEGER NOT NULL,
        cause TEXT,
        payment_method TEXT DEFAULT 'UPI',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create contact_messages table
    await run(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if items table is empty; if so, seed with initial data
    const itemCount = await get('SELECT COUNT(*) as count FROM items');
    if (itemCount.count === 0) {
      console.log('Seeding initial database items...');
      const initialItems = [
        {
          title: 'Mathematics Class 10 (NCERT)',
          category: 'Book',
          sub_category: 'Textbooks',
          location: 'Vasai West',
          distance: '0.8 km',
          status: 'Available',
          author_or_age: 'R.D. Sharma',
          class_or_gender: 'Class 10',
          condition: 'Good (90%)',
          donor_name: 'Rajesh Sharma',
          donor_phone: '+91 98765 43210',
          description: 'NCERT Class 10 Mathematics textbook in excellent condition with clear solved examples.',
          image_url: 'https://images.unsplash.com/photo-1599689868384-59cb2b01bb21?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Winter Woolen Sweaters (Pack of 3)',
          category: 'Clothes',
          sub_category: 'Warm Wear',
          location: 'Vasai East',
          distance: '1.2 km',
          status: 'Available',
          author_or_age: '8-12 Years',
          class_or_gender: 'Unisex',
          condition: 'Like New',
          donor_name: 'Priya Deshmukh',
          donor_phone: '+91 98234 56789',
          description: 'Warm high-quality winter woolen sweaters suitable for kids aged 8 to 12 years.',
          image_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Science & Technology Explorer',
          category: 'Book',
          sub_category: 'Reference',
          location: 'Nalasopara West',
          distance: '3.5 km',
          status: 'Reserved',
          author_or_age: 'Dr. H. C. Verma',
          class_or_gender: 'Class 8-9',
          condition: 'Fair',
          donor_name: 'Amit Patel',
          donor_phone: '+91 97112 33445',
          description: 'Comprehensive physics and chemistry reference book with diagrams and practice questions.',
          image_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'School Uniform Sets (White & Blue)',
          category: 'Clothes',
          sub_category: 'School Uniform',
          location: 'Virar West',
          distance: '5.1 km',
          status: 'Available',
          author_or_age: '10-14 Years',
          class_or_gender: 'Boys',
          condition: 'Good',
          donor_name: 'Sunita Patil',
          donor_phone: '+91 99887 76655',
          description: 'Pair of blue trousers and white shirts for secondary school students in Vasai/Virar region.',
          image_url: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'English Grammar & Composition',
          category: 'Book',
          sub_category: 'Language',
          location: 'Mumbai Central',
          distance: '12 km',
          status: 'Collected',
          author_or_age: 'Wren & Martin',
          class_or_gender: 'Class 6-8',
          condition: 'Good',
          donor_name: 'Meena Kulkarni',
          donor_phone: '+91 91234 56780',
          description: 'Classic English grammar guide essential for middle school students learning sentence structures.',
          image_url: 'https://images.unsplash.com/photo-1516042438821-0abd7a73c4b3?auto=format&fit=crop&w=600&q=80'
        },
        {
          title: 'Kids Casual Jackets & Rainwear',
          category: 'Clothes',
          sub_category: 'Outerwear',
          location: 'Vasai West',
          distance: '1.5 km',
          status: 'Available',
          author_or_age: '5-9 Years',
          class_or_gender: 'Unisex',
          condition: 'Like New',
          donor_name: 'Vikram Joshi',
          donor_phone: '+91 98900 11223',
          description: 'Waterproof raincoat and cozy windbreaker jacket for school commuting during monsoon.',
          image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80'
        }
      ];

      for (const item of initialItems) {
        await run(
          `INSERT INTO items (title, category, sub_category, location, distance, status, author_or_age, class_or_gender, condition, donor_name, donor_phone, description, image_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.title, item.category, item.sub_category, item.location, item.distance,
            item.status, item.author_or_age, item.class_or_gender, item.condition,
            item.donor_name, item.donor_phone, item.description, item.image_url
          ]
        );
      }
    }

    // Check volunteers seed
    const volCount = await get('SELECT COUNT(*) as count FROM volunteers');
    if (volCount.count === 0) {
      const initialVolunteers = [
        { name: 'Aarav Mehta', email: 'aarav@gmail.com', phone: '+91 98111 22334', location: 'Vasai West', role: 'Teaching Drive', availability: 'Weekends', status: 'Active' },
        { name: 'Neha Gupta', email: 'neha@gmail.com', phone: '+91 98222 33445', location: 'Virar East', role: 'Book Sorting', availability: 'Weekdays', status: 'Active' },
        { name: 'Siddharth Rao', email: 'sid@gmail.com', phone: '+91 98333 44556', location: 'Nalasopara West', role: 'Clothes Distribution', availability: 'Any time', status: 'Pending' }
      ];
      for (const vol of initialVolunteers) {
        await run(
          `INSERT INTO volunteers (name, email, phone, location, role, availability, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [vol.name, vol.email, vol.phone, vol.location, vol.role, vol.availability, vol.status]
        );
      }
    }
  });
}

module.exports = {
  db,
  run,
  all,
  get,
  initDB
};
