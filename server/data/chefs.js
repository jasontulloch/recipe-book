import bcrypt from 'bcryptjs';

const chefs = [
  {
    first_name: 'Jason',
    last_name: 'Tulloch',
    username: 'jasontulloch',
    email: 'jasonbtulloch@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isPremium: true,
    isVegan: true,
    isDairy: true,
  }
]
export default chefs;
