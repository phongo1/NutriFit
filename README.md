# NutriFit

**NutriFit** is a health and wellness app focused on helping users make smarter dietary choices. It provides an intuitive way to compare nutrition labels and break down macronutrients between branded food items. NutriFit makes finding food products that most optimize your dietary goals .

## DEMO:
[Youtube Demo](https://youtu.be/yYXho5SDZvs)

## DEPOST Link:
[Devpost](https://devpost.com/software/nutrifit-yhqj6p)


## Features

- Nutrition comparison between branded food items
- Macronutrient breakdown (calories, protein, carbs, fats, etc.)
- Fast and accurate search functionality
- Ranked list of products based off nutritional value for your health goal (cutting, bulking, keto, diabetic)

## Tech Stack

- Frontend: React / Vite with Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- APIs: Nutritionix API, Kroger Product API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/Nutrifit.git
cd Nutrifit
```
2. Install dependencies:
```bash
npm install
```
3. Add a .env file to the 'backend' directory root with your configuration:

```ini
KROGER_CLIENT_ID = 'xxx'
KROGER_CLIENT_SECRET = 'xxx'
KROGER_REDIRECT_URI='http://localhost:3000/callback'
KROGER_SCOPE='product.compact'
KROGER_OAUTH_URL='https://api.kroger.com/v1/connect/oauth2'

NUTRITIONIX_APP_ID = 'xxx'
NUTRITIONIX_API_KEY = 'xxx'
NUTRITIONIX_URL = 'https://trackapi.nutritionix.com/v2/search/item/?upc='

PORT = 3636
NODE_ENV = 'development'

MONGO_USERNAME='xxx'
MONGO_PASSWORD='xxx'

MONGO_CONNECTION_STRING = 'xxx'
```
4. Start the React project
```bash
cd NutriFit
npm run start
```
5. Start the Express server
```bash
cd ..
cd backend
npm run dev
```
