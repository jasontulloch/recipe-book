import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Chef from '../models/chefModel.js';
import Fraction from 'fraction.js'

import twilio from 'twilio';

const textGroceryList = asyncHandler(async (req, res) => {

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  const client = twilio(accountSid, authToken);

  const _id = req.body._id
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const phone_number = req.body.phone_number
  const savedIngredients = req.body.savedIngredients

  const countryCode = "+1"

  function Comparator(a, b) {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  }

  const sortedIngredients = savedIngredients.sort(Comparator)

  const cleanedSavedIngredients = (savedIngredients.length > 0) && (
    sortedIngredients.map((groceries) =>
      new Fraction(eval(groceries[0])).toFraction(true) + ' ' + groceries[1] + ' ' + groceries[2] + "\n"
    ).join('')
  )

  const defaultMessage = `${first_name}, thanks for using RecipeBook! Your ingredients are below...\n\n${cleanedSavedIngredients}\n Happy cooking!`

  if (phone_number !== "") {

    client.messages
      .create({
         from: process.env.TWILIO_PHONE_NUMBER,
         to: countryCode + phone_number,
         body: defaultMessage
       })

  } else {
    res.status(401)
    throw new Error('You must be signed in and have an accont to send your grocery list.')
  }

})

export {
  textGroceryList
}
