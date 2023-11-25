const { UserServices } = require("../../db")
const sendBulkEmails = require("../../handlers/userServices/sendBulkEmails")
const cron = require("node-cron");
const getUserServicesOptions = require("../userServices/getUserServicesOptions");

const checkUserServices = async () => {
    try {
        const filters = {
            sql: `("UserServices"."days_notice" IS NULL AND "UserServices"."finishDate" = CURRENT_DATE)
            OR
            ("UserServices"."days_notice" IS NOT NULL AND (CURRENT_DATE + "UserServices"."days_notice" * INTERVAL '1 DAY') = "UserServices"."finishDate")`
        };
        const messageData = {
            subject: "Your account is about to expire!",
            body: "Don't worry, It's a test email",
            link: "https://gymspace.up.railway.app/",
        }

        const userServicesOptions = getUserServicesOptions(filters)
        const orders = await UserServices.findAll(userServicesOptions)
        await sendBulkEmails(orders, messageData)
    } catch (error) {
        console.log(error);
    }
}

// cron.schedule("* * * * * *", () => checkUserServices())
// cron.schedule("55 11 24 11 *", () => checkUserServices())

cron.schedule('0 13,16 1-30 11 *', () => {
    console.log("Executing order checking ...");
    checkUserServices()
});