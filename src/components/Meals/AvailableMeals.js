import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

// import {DUMMY_MEALS} from './dummy-meals';


const dbBaseUrl = "https://food-ordering-app-9d663-default-rtdb.firebaseio.com/foods.json";


const AvailableMeals = () => {
  const [ mealsList, setMealsList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ httpError, setHttpError ] = useState(null);

  useEffect(() => {

      const fetchMeals = async () => {
        const response = await fetch(dbBaseUrl)

        if (!response.ok){
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData){

            console.log(key)
            loadedMeals.push({
              id: key,
              name:responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price
            })

          };

        setMealsList(loadedMeals);

        setIsLoading(false);
      }

      fetchMeals()
      .then()
      .catch((error)=>{
        setIsLoading(false)
        setHttpError(error.message)
      });

    }, []);

  if (isLoading){
    return (
      <section className={classes.MealsLoading}>
      <p> Loading... </p>
      </section>
    )
  };


  if(httpError){
    return (
      <section className={classes.MealsError}>
      <p>{httpError}</p>
      </section>
    );
  };

  const mealsListItems = mealsList.map((meal) => {

    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  })

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsListItems}
        </ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;
