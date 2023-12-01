module.exports = {
    success: {
        subject: `Confirmation: Your order at GymSpace has been approved!`,
        body: `Great news! Your order has been approved and is in the process of preparation. If you need more details about the classes or products, we are here to help. Thank you for trusting GymSpace for your fitness needs; we hope you enjoy everything we offer to the fullest! Regards, GymSpace Team`,
        link: "https://gymspace.up.railway.app/",
    },
    failure: {
        subject: `Update on your purchase at GymSpace`,
        body: `We regret to inform you that the payment associated with your purchase at GymSpace has been rejected by the service provider. We recommend checking the payment details and contacting your financial provider to resolve this issue. We are here to assist you in this process and ensure you can complete your purchase smoothly. If you need additional help, feel free to contact us. Your satisfaction is our priority. Sincerely, GymSpace Team`,
        link: "https://gymspace.up.railway.app/",
    },
    pending: {
        subject: `Update on the status of your purchase at GymSpace`,
        body: `We wanted to inform you that we have received your order at GymSpace. Currently, the payment status is pending confirmation from the financial service provider. As soon as we receive confirmation of your payment, we will immediately contact you to initiate the delivery process of your product or service. If you have any questions or need more details, feel free to contact us. We are here to help you. Sincerely, GymSpace Team`,
        link: "https://gymspace.up.railway.app/",
    },
    userServiceAboutToExpire: {
        subject: `Service About to Expire`,
        body: `Service About to Expire`,
        link: "https://gymspace.up.railway.app/",
    },
    userServiceExpired: {
        subject: `Service Expired`,
        body: `Service Expired`,
        link: "https://gymspace.up.railway.app/",
    },
}