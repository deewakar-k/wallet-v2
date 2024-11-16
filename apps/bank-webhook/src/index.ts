import express from "express";
import db from "@wallet/db/client";

const app = express();

app.post("/hdfc-webhook", async (req, res) => {
  //TODO: add zod validation here

  const paymentInfo = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "error while processing webhook",
    });
  }
});
