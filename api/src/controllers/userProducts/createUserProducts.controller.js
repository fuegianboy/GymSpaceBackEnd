const { UserProducts, Users, Products } = require('../../db');

const createUserProduct = async (req, res) => {
  const { userID, productID, valuation, qty, unitPrice, date, status, state } = req.body;
  try {
    if (!userID || !productID || !valuation || !qty || !unitPrice || !date || !status) {
      return res.status(400).json({ error: "Incomplete Data" });
    }

    const user = await Users.findByPk(userID);
    const product = await Products.findByPk(productID);

    if (!user || !product) {
      return res.status(404).json({ error: 'User or Product not found' });
    }

    const userproduct = await UserProducts.create({
      userID,
      productID,
      valuation,
      qty,
      unitPrice,
      date,
      status,
      state
    });

    return res.status(201).json({ message: "Data added to DB successfully", userproduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving userProduct record", error: error.message });
  }
};

module.exports = createUserProduct;