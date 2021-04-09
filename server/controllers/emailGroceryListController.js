import asyncHandler from 'express-async-handler';
import Chef from '../models/chefModel.js';
import Fraction from 'fraction.js'

import nodemailer from 'nodemailer'

const emailGroceryList = asyncHandler(async (req, res) => {

  const {
    _id,
    first_name,
    last_name,
    email,
    savedIngredients
  } = req.body

  const chef = await Chef.findById(_id)

    if (chef) {
      const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
          user: process.env.GROCERY_LIST_EMAIL,
          pass: process.env.GROCERY_LIST_PASSWORD
        }
      });

      function Comparator(a, b) {
        if (a[2] < b[2]) return -1;
        if (a[2] > b[2]) return 1;
        return 0;
      }

      const sortedIngredients = savedIngredients.sort(Comparator)

      const cleanedSavedIngredients = (savedIngredients.length > 0) && (
        sortedIngredients.map((groceries) =>
          new Fraction(eval(groceries[0])).toFraction(true) + ' ' + groceries[1] + ' ' + groceries[2] + '<br>'
        ).join('')
      )

      const defaultMessage = `
        <h3>${first_name}, thanks for using RecipeBook! Your ingredients are below...</h3>
        ${cleanedSavedIngredients}
        <h4>Happy cooking!<h/4>
      `

      // setup email data with unicode symbols
      const mailOptions = {
        from: '"RecipeBook" <therecipebook.io@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "My Grocery List", // Subject line
        html: defaultMessage // html text
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return
          console.log(error);
        }
        res.json(info);
      });
    } else {
      res.status(401)
      throw new Error('You must be signed in and have an accont to send your grocery list.')
    }
})

export {
  emailGroceryList
}
