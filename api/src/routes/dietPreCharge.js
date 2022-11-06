const Diet = require('../db')

export default function dietPreCharged(){
    const diets = ["gluten free","paleolithic", "vegetarian", "lacto ovo vegetarian","vegan","pescatarian","primal","whole 30", "fodmap friendly","dairyFree"]
    diets?.forEach(async (diet) => await Diet.create({where: {name: diet}}))
}