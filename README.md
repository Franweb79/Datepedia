# what does this program?

- Used promises to get used to async programming. As Angular´s httpClient get() method provides async request, I used Promises to ensure I obtain and control data flow the way I need.
- I also provide a branch with the same code below, but using async/await to see the differences. Async await provides a cleaner code since the behavior is more similar to what we see on synchronous code
- Date inputs are ordered. 
- Random results from the api for each date, ensuring can´t be repeated.Promesas, cambio d efecha ordenada, resultados aleatorios
- Used interfaces to create custom data type to be shown to the user, it makes data retrieved by the API easier to manipulate and ensure integrity and maintenance
- Used angular animations
- Reactive forms with built-in and custom validators. For example, custom validator is created to ensure, if user inputs same exact date, form will be invalid.
- Basic testing with karma and jasmine, maybe learn Protactor in the future if I find easier and faster to automate.
- Form styles found here https://codepen.io/prathkum/pen/OJRvVzY
- You can enter the dates in the order you want. It was kind of logic challenge
- Customized 404 error page. Code snippet used available here https://codepen.io/Navedkhan012/pen/vrWQMY
- If requested date has same day and month but different year (e.g: "2021-04-06" and "2022-04-06"), modal header will properly show date one time instead of two. Has no sense to show "Some events happened on November 03 and November 03"
- For the same reason and in the same case from above, we control the async requests to the API to ensure we make only a request instead of two. We don´t need to request and show two times for a date with same day and month. With one object with events is enough.





