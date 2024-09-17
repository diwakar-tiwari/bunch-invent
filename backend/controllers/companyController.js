const db = require('../config/db');

// Get company info
exports.getCompanyInfo = async (req, res) => {
  try {
    const [companyInfo] = await db.execute('SELECT * FROM company_info LIMIT 1');
    res.json(companyInfo[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
