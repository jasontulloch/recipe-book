const recipes = [
  {
    recipe_name: 'Chickn Parm',
    recipe_cover_image: '/images/chickn_parm.jpg',
    steps: ['Cook the damn thing', 'What we do next', 'hi there'],
    ingredient_1: 'Chickn',
    country: 'Italy',
    cook_time: '60',
    serving_size: '4',
    isPremium: 'false',
    isPublished: 'false',
    diets: [{
      isVegan: true,
    }],
    allergins: [
      {
        isDairy: false
      }
    ]
  }
]

export default recipes;
