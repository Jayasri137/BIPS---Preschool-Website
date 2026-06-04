const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const app = express();
const PORT = process.env.PORT || 5000;

EMAIL_USER = "bluestonesoftwaredeveloper@gmail.com"
EMAIL_PASS = "lels ujhr ngmm lfcy"

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// --- DATABASE CONFIG ---
const dbConfig = process.env.DATABASE_URL || {
  host: "auth-db1278.hstgr.io",
  user: "u287260207_preschool_user",
  password: "YouTooPword123!",
  database: "u287260207_preschool_db"
};

async function getDbConnection() {
  return await mysql.createConnection(dbConfig);
}

// --- INITIALIZE DATABASE ---
async function initDB() {
  try {
    const connection = await getDbConnection();

    // 1. Create admissions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parentName VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(255),
        studentName VARCHAR(255),
        dob DATE,
        gender VARCHAR(20),
        program VARCHAR(100),
        message TEXT,
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create enquiries table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parentName VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(255),
        program VARCHAR(100),
        message TEXT,
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create admins table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Create media table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(100),
        section_name VARCHAR(100),
        image_url LONGTEXT,
        image_alt VARCHAR(255),
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Create franchise_enquiries table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS franchise_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20),
        city VARCHAR(255),
        message TEXT,
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Create centers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS centers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        hours VARCHAR(255),
        mapSrc TEXT,
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create testimonials table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        role VARCHAR(255),
        text TEXT,
        image_url LONGTEXT,
        bg_color VARCHAR(50),
        gender VARCHAR(10) DEFAULT 'female',
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // --- MIGRATIONS ---
    const tablesToMigrate = ["admissions", "enquiries", "franchise_enquiries", "media", "centers", "testimonials"];
    for (const table of tablesToMigrate) {
      const [cols] = await connection.query(`SHOW COLUMNS FROM ${table} LIKE 'status'`);
      if (cols.length === 0) {
        await connection.query(`ALTER TABLE ${table} ADD COLUMN status TINYINT DEFAULT 1`);
        // console.log(`✅ Migration: Added status TINYINT to ${table}`);
      }
    }

    // Change image_url to LONGTEXT if it's still VARCHAR(255)
    const [imageURLCol] = await connection.query("SHOW COLUMNS FROM media LIKE 'image_url'");
    if (imageURLCol.length > 0 && imageURLCol[0].Type.toLowerCase().includes('varchar')) {
      await connection.query("ALTER TABLE media MODIFY COLUMN image_url LONGTEXT");
      // console.log("✅ Migration: Modified image_url to LONGTEXT");
    }

    // 6. Create logs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        action_type VARCHAR(50),
        module VARCHAR(100),
        record_id INT,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default admin if none exists
    const [admins] = await connection.query("SELECT * FROM admins LIMIT 1");
    if (admins.length === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await connection.query("INSERT INTO admins (username, password) VALUES (?, ?)", ["admin", hashedPassword]);
      // console.log("✅ Default admin created: admin / admin123");
    }

    // console.log("✅ MySQL Tables Verified");
    await connection.end();
  } catch (err) {
    // console.error("❌ MySQL Init Error:", err.message);
  }
}
initDB();

// --- JWT CONFIG ---
const JWT_SECRET = process.env.JWT_SECRET || "bluestone-secret-key-123";

// --- MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

// --- MULTER CONFIG (Media Uploads) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- EMAIL CONFIG ---
const ADMIN_EMAIL = process.env.EMAIL_USER || "bluestonesoftwaredeveloper@gmail.com";
const APP_PASSWORD = process.env.EMAIL_PASS || "lels ujhr ngmm lfcy";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: APP_PASSWORD
  },
  tls: {
    // This tells Nodemailer to ignore the certificate error
    rejectUnauthorized: false
  }
});

app.get("/health", async (req, res) => {
  const status = {
    database: "unknown",
    email: "unknown",
    env: {
      has_email_user: !!process.env.EMAIL_USER,
      has_email_pass: !!process.env.EMAIL_PASS,
    }
  };

  try {
    const connection = await getDbConnection();
    await connection.query("SELECT 1");
    await connection.end();
    status.database = "ok";
  } catch (err) {
    status.database = `error: ${err.message}`;
  }

  try {
    await transporter.verify();
    status.email = "ok";
  } catch (err) {
    status.email = `error: ${err.message}`;
  }

  res.json(status);
});

// --- ADMISSIONS ROUTE (UPDATED) ---
app.post("/admissions", async (req, res) => {
  try {
    const { parentName, phone, email, studentName, dob, gender, program, message } = req.body;

    const connection = await getDbConnection();

    // Updated SQL query to include student details
    const sql = `INSERT INTO admissions 
                 (parentName, phone, email, studentName, dob, gender, program, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      parentName || null,
      phone || null,
      email || null,
      studentName || null,
      dob || null,
      gender || null,
      program || null,
      message || null
    ];

    // 1. Save to database
    // console.log("Saving to database...");
    try {
      await connection.execute(sql, params);
      await connection.end();
      // console.log("✅ Saved to database.");
    } catch (dbError) {
      // console.error("❌ Database Save Error:", dbError.message);
      return res.status(500).json({ success: false, error: `Database error: ${dbError.message}` });
    }

    // 2. Send email
    // console.log("Sending email...");
    try {
      await transporter.sendMail({
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Admission Request: ${studentName} (Parent: ${parentName})`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #6c5ce7;">New Student Admission Form</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Parent Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${parentName}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
              <tr style="background-color: #f9f9f9;"><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Student Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${studentName}</td></tr>
              <tr style="background-color: #f9f9f9;"><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date of Birth:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${dob}</td></tr>
              <tr style="background-color: #f9f9f9;"><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Gender:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${gender}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Program:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${program}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${message || "N/A"}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #7f8c8d;">Submission received from BlueStone Website Admission Portal.</p>
          </div>
        `
      });
      // console.log("✅ Email sent successfully.");
    } catch (emailError) {
      // console.error("❌ Email Error (Non-fatal for response):", emailError.message);
      // We still return success: true because it's saved in DB, but we add a warning
      return res.json({ success: true, warning: `Admission saved, but email failed: ${emailError.message}` });
    }

    res.json({ success: true });
  } catch (error) {
    // console.error("❌ Admission Error detail:", error);
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
});

// --- ENQUIRIES ROUTE ---
app.post("/enquiries", async (req, res) => {
  try {
    const { parentName, phone, email, program, message } = req.body;

    const connection = await getDbConnection();
    const sql = `INSERT INTO enquiries (parentName, phone, email, program, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [parentName || null, phone || null, email || null, program || null, message || null];

    await connection.execute(sql, params);
    await connection.end();

    // Send email
    try {
      await transporter.sendMail({
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New General Enquiry: ${parentName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #e67e22;">New General Enquiry</h2>
            <p><strong>Name:</strong> ${parentName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Program/Subject:</strong> ${program}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
        `
      });
    } catch (emailError) {
      // console.error("❌ Email Error:", emailError.message);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- ADMIN LOGIN ---
app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM admins WHERE username = ?", [username]);
    await connection.end();

    if (rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN PROTECTED ROUTES ---

// Fetch Admissions
app.get("/admin/admissions", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM admissions ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Enquiries
app.get("/admin/enquiries", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM enquiries ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Franchise Enquiries
app.get("/admin/franchise", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM franchise_enquiries ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public Media Endpoint
app.get("/media/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const connection = await getDbConnection();
    const [rows] = await connection.query(
      "SELECT section_name, image_url, image_alt FROM media WHERE page_name = ? AND status = 1",
      [page]
    );
    await connection.end();

// Group by section for easier frontend consumption
    const mediaBySection = rows.reduce((acc, current) => {
      acc[current.section_name] = acc[current.section_name] || [];
      acc[current.section_name].push(current);
      return acc;
    }, {});

    res.json(mediaBySection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CENTERS ROUTES ---

// Public Centers Endpoint
app.get("/centers", async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query(
      "SELECT * FROM centers WHERE status = 1 ORDER BY created_at ASC"
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Centers Management
app.get("/admin/centers", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM centers ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/admin/centers", authenticateToken, async (req, res) => {
  try {
    const { name, address, phone, email, hours, mapSrc } = req.body;
    const connection = await getDbConnection();
    await connection.query(
      "INSERT INTO centers (name, address, phone, email, hours, mapSrc) VALUES (?, ?, ?, ?, ?, ?)",
      [name, address, phone, email, hours, mapSrc]
    );
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/admin/centers/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, email, hours, mapSrc } = req.body;
    const connection = await getDbConnection();
    await connection.query(
      "UPDATE centers SET name = ?, address = ?, phone = ?, email = ?, hours = ?, mapSrc = ? WHERE id = ?",
      [name, address, phone, email, hours, mapSrc, id]
    );
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/centers/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();
    await connection.query("DELETE FROM centers WHERE id = ?", [id]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- TESTIMONIALS ROUTES ---

// Public Testimonials Endpoint
app.get("/testimonials", async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query(
      "SELECT * FROM testimonials WHERE status = 1 ORDER BY created_at DESC"
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Testimonials Management
app.get("/admin/testimonials", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM testimonials ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/admin/testimonials", authenticateToken, async (req, res) => {
  try {
    const { name, role, text, image_url, bg_color, gender } = req.body;
    const connection = await getDbConnection();
    await connection.query(
      "INSERT INTO testimonials (name, role, text, image_url, bg_color, gender) VALUES (?, ?, ?, ?, ?, ?)",
      [name, role, text, image_url, bg_color, gender || 'female']
    );
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/admin/testimonials/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, text, image_url, bg_color, gender } = req.body;
    const connection = await getDbConnection();
    await connection.query(
      "UPDATE testimonials SET name = ?, role = ?, text = ?, image_url = ?, bg_color = ?, gender = ? WHERE id = ?",
      [name, role, text, image_url, bg_color, gender, id]
    );
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/testimonials/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();
    await connection.query("DELETE FROM testimonials WHERE id = ?", [id]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Media Management
app.get("/admin/media", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query("SELECT * FROM media ORDER BY created_at DESC");
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/admin/media/upload", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { page_name, section_name, image_alt } = req.body;
    const originalPath = req.file.path;

    // Read into memory to prevent EBUSY file locks
    const fileBuffer = fs.readFileSync(originalPath);

    // Compress using sharp to WebP (preserves transparency and compresses well)
    const webpBuffer = await sharp(fileBuffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Convert to Base64
    const base64String = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

    // Cleanup local file
    try {
      fs.unlinkSync(originalPath);
    } catch (e) {
      // console.warn("Could not delete uploaded temp file", e.message); 
    }

    const connection = await getDbConnection();
    await connection.query(
      "INSERT INTO media (page_name, section_name, image_url, image_alt) VALUES (?, ?, ?, ?)",
      [page_name, section_name, base64String, image_alt]
    );
    await connection.end();

    res.json({ success: true, image_url: base64String });
  } catch (error) {
    // console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/media/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();

    // We just need to delete the db row.
    await connection.query("DELETE FROM media WHERE id = ?", [id]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/admin/media/:id", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { image_alt, page_name, section_name } = req.body;

    let base64String = null;

    if (req.file) {
      const originalPath = req.file.path;

      // Read into memory to prevent EBUSY file locks
      const fileBuffer = fs.readFileSync(originalPath);

      // Compress using sharp to WebP (preserves transparency and compresses well)
      const webpBuffer = await sharp(fileBuffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      // Convert to Base64
      base64String = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

      // Cleanup local file
      try {
        fs.unlinkSync(originalPath);
      } catch (e) {
        // console.warn("Could not delete uploaded temp file", e.message); 
      }
    } else if (req.body.image_url) {
      // Allow passing a base64 string directly
      base64String = req.body.image_url;
    }

    const connection = await getDbConnection();

    if (base64String) {
      await connection.query(
        "UPDATE media SET image_url = ?, image_alt = ?, page_name = ?, section_name = ? WHERE id = ?",
        [base64String, image_alt || "", page_name, section_name, id]
      );
    } else {
      await connection.query(
        "UPDATE media SET image_alt = ?, page_name = ?, section_name = ? WHERE id = ?",
        [image_alt || "", page_name, section_name, id]
      );
    }

    await connection.end();
    res.json({ success: true, image_url: base64String });

  } catch (error) {
    // console.error("Update media error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN ACTION ROUTES (DELETE & EDIT) ---

// DELETE Admissions
app.delete("/admin/admissions/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();
    await connection.query("DELETE FROM admissions WHERE id = ?", [id]);
    await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, 'DELETE', 'ADMISSIONS', id, `Deleted admission record for ID: ${id}`]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT Admissions
app.put("/admin/admissions/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const connection = await getDbConnection();

    // Fetch original for diff
    const [original] = await connection.query("SELECT * FROM admissions WHERE id = ?", [id]);
    if (original.length === 0) return res.status(404).json({ error: "Not found" });

    const diff = [];
    for (const key in newData) {
      if (original[0][key] !== undefined && String(original[0][key]) !== String(newData[key])) {
        diff.push(`${key}: '${original[0][key]}' ➔ '${newData[key]}'`);
      }
    }

    await connection.query(
      "UPDATE admissions SET parentName=?, phone=?, email=?, studentName=?, dob=?, gender=?, program=?, message=? WHERE id=?",
      [newData.parentName, newData.phone, newData.email, newData.studentName, newData.dob, newData.gender, newData.program, newData.message, id]
    );

    if (diff.length > 0) {
      await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, 'EDIT', 'ADMISSIONS', id, `Changed: ${diff.join(", ")}`]);
    }

    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Enquiries
app.delete("/admin/enquiries/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();
    await connection.query("DELETE FROM enquiries WHERE id = ?", [id]);
    await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, 'DELETE', 'ENQUIRIES', id, `Deleted enquiry record for ID: ${id}`]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT Enquiries
app.put("/admin/enquiries/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const connection = await getDbConnection();

    // Fetch original
    const [original] = await connection.query("SELECT * FROM enquiries WHERE id = ?", [id]);
    if (original.length === 0) return res.status(404).json({ error: "Not found" });

    const diff = [];
    for (const key in newData) {
      if (original[0][key] !== undefined && String(original[0][key]) !== String(newData[key])) {
        diff.push(`${key}: '${original[0][key]}' ➔ '${newData[key]}'`);
      }
    }

    await connection.query(
      "UPDATE enquiries SET parentName=?, phone=?, email=?, program=?, message=? WHERE id=?",
      [newData.parentName, newData.phone, newData.email, newData.program, newData.message, id]
    );

    if (diff.length > 0) {
      await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, 'EDIT', 'ENQUIRIES', id, `Changed: ${diff.join(", ")}`]);
    }

    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Franchise
app.delete("/admin/franchise/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getDbConnection();
    await connection.query("DELETE FROM franchise_enquiries WHERE id = ?", [id]);
    await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, 'DELETE', 'FRANCHISE', id, `Deleted franchise record for ID: ${id}`]);
    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT Franchise
app.put("/admin/franchise/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const connection = await getDbConnection();

    // Fetch original
    const [original] = await connection.query("SELECT * FROM franchise_enquiries WHERE id = ?", [id]);
    if (original.length === 0) return res.status(404).json({ error: "Not found" });

    const diff = [];
    for (const key in newData) {
      if (original[0][key] !== undefined && String(original[0][key]) !== String(newData[key])) {
        diff.push(`${key}: '${original[0][key]}' ➔ '${newData[key]}'`);
      }
    }

    await connection.query(
      "UPDATE franchise_enquiries SET fullName=?, email=?, phone=?, city=?, message=? WHERE id=?",
      [newData.fullName, newData.email, newData.phone, newData.city, newData.message, id]
    );

    if (diff.length > 0) {
      await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, 'EDIT', 'FRANCHISE', id, `Changed: ${diff.join(", ")}`]);
    }

    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Record-Specific History Logs
app.get("/admin/history/:module/:id", authenticateToken, async (req, res) => {
  try {
    const { module, id } = req.params;
    const connection = await getDbConnection();
    const [rows] = await connection.query(`
      SELECT l.*, a.username as admin_name 
      FROM system_logs l 
      JOIN admins a ON l.admin_id = a.id 
      WHERE l.module = ? AND l.record_id = ?
      ORDER BY l.created_at DESC
    `, [module.toUpperCase(), id]);
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Global History Logs (Keep for stats or hidden use if needed, but remove from UI)
app.get("/admin/history", authenticateToken, async (req, res) => {
  try {
    const connection = await getDbConnection();
    const [rows] = await connection.query(`
      SELECT l.*, a.username as admin_name 
      FROM system_logs l 
      JOIN admins a ON l.admin_id = a.id 
      ORDER BY l.created_at DESC 
      LIMIT 100
    `);
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/franchise", async (req, res) => {
  try {
    const { fullName, email, phone, city, message } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: "Name and Phone are required." });
    }

    const connection = await getDbConnection();
    await connection.execute(
      "INSERT INTO franchise_enquiries (fullName, email, phone, city, message) VALUES (?, ?, ?, ?, ?)",
      [fullName || null, email || null, phone || null, city || null, message || null]
    );
    await connection.end();

    // 2. Send email
    try {
      await transporter.sendMail({
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Franchise Inquiry: ${fullName} (${city})`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #d35400;">New Franchise Partner Inquiry</h2>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message || "N/A"}</p>
          </div>
        `
      });
      // console.log("✅ Franchise email sent.");
    } catch (emailError) {
      // console.error("❌ Franchise Email Error (Non-fatal):", emailError.message);
      return res.json({ success: true, warning: `Inquiry saved, but email failed: ${emailError.message}` });
    }

    res.json({ success: true });
  } catch (error) {
    // console.error("❌ Franchise Route Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generic Status Toggle Route
app.put("/admin/status/:module/:id", authenticateToken, async (req, res) => {
  try {
    const { module, id } = req.params;
    const { status } = req.body; // 1 for Active, 0 for Inactive

    const validModules = {
      'admissions': 'admissions',
      'enquiries': 'enquiries',
      'franchise': 'franchise_enquiries',
      'media': 'media',
      'centers': 'centers',
      'testimonials': 'testimonials'
    };

    const tableName = validModules[module.toLowerCase()];
    if (!tableName) return res.status(400).json({ error: "Invalid module" });

    const connection = await getDbConnection();
    await connection.query(`UPDATE ${tableName} SET status = ? WHERE id = ?`, [status, id]);

    await connection.query("INSERT INTO system_logs (admin_id, action_type, module, record_id, details) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, 'STATUS_CHANGE', module.toUpperCase(), id, `Changed status to ${status === 1 ? 'Active' : 'Inactive'} for ID: ${id}`]);

    await connection.end();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => console.log(`🚀 BIPS Server on port ${PORT}`));