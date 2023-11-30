const { UserProducts, UserServices, Users } = require("../../db");
const updateOrderHandler = require("../../handlers/payments/updateOrder");
const samples = require("../../utils/mails/samples");
const getOrderOwner = require("../../handlers/payments/getOrderOwner");
const sendEmail = require("../../handlers/mailer/sendEmail");

const updateOrder = async (req, res) => {
  try {
    // Update orders
    await updateOrderHandler(req.query);

    // Get user data
    const { external_reference, status } = req.query;
    const user = await getOrderOwner(external_reference);

    // Delete Cart
    if (status === "approved") {
      const productsCart = await UserProducts.findAll({
        where: {
          userID: user.userID,
          mp_status: "inCart",
        },
      });
      const servicesCart = await UserServices.findAll({
        where: {
          userID: user.userID,
          mp_status: "inCart",
        },
      });
      if (productsCart.length) {
        productsCart.map((product) => {
          product.destroy();
        });
      }
      if (servicesCart.length) {
        servicesCart.map((service) => {
          service.destroy();
        });
      }
    }
    // Send email notification
    const messageData =
      (status === "approved" && samples.success) ||
      (status === "in_process" && samples.pending) ||
      samples.failure;
    sendEmail(user, messageData);

    console.log(req.query);
  } catch (error) {
    console.log(error);
  } finally {
    if (req.headers.referer) {
      const refererHost = new URL(req.headers.referer).origin;
      res.redirect(refererHost);
    } else {
      const url = process.env.URL_FRONT || "https://gymspace.up.railway.app";
      return res.redirect(url);
    }
  }
};

module.exports = updateOrder;
