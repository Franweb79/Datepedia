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

# NOTES FOR DEVELOPERS

1 -  

    with Viewchild, we bind two properties on the child component

    firstDateToShowWhenFlipped

    lastDateToShowWhenFlipped

    This are changed on each onSubmit() method like specified below

    this.showDays.firstDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(firstOrderedDate);

    this.showDays.lastDateToShowWhenFlipped=this._dates.convertArrayOfNumbersIntoString(lastOrderedDate);

    These way we ensure they will be properly changed and shown with correct values
    each time they are changed.
    
    Other way of sending data to child components is like we did on the HTML template
    this way, with valuetotalDays and isDivFlipped, which are properties on the
    child component which receive data from totalDays and isFlipped, which are
    properties on this current component.

          <app-show-days [valueTotalDays]=totalDays [isDivFlipped]="isFlipped" #showDaysComponentTemplateReference></app-show-days>

   
    In both ways, the child component properties must be using the @Input() decorator
    to "listen"
    
2 - 

    arrayOfEventsToShow is used here on modal component HTML template
    to show the events on a certain date.

    I have declared it as 'any' because in order to use it on the template
    is easier to access properties. With a more strict type was giving problems.
    //TODO look for a better solution

    It receives its value from parent component show-days-component,
    through a property of parent component called arrayOfObjectsWithEvents

    Both are binded on show-days-component HTML template
    and also value is assigned inside that component´s .ts code
    on the _callApi service´s getEventsPromise() method

3 - 

    firstDateToShowWhenFlipped

    and

    lastDateToShowWhenFlipped
  
    These 2 string properties will be used to show dates when this component is flipped.

    for example: "total days between 2021-06-01 and 2021-07-02 are... "

    As the order to show dates can be different on this component than on modal,
    because year is not present, I also will declare 2 new properties:

    firstDateToShowOnModal

    lastDateToShowOnModal


4 - 

    firstDateToShowOnModal

    and 

    lastDateToShowOnModal

    are used to pass its values to child component app-modal, then
    values can be shown on the modal.

    These two properties receive their values from date1 and date2 properties from the _dates service.

    We use them because service is private, so can´t use it on the template (outside the class), 
    so we need properties with public visibility
    in order to be used on component´s HTML template

    As date and date 2 have a number[] type, we will convert them to string with a custom method 
    created on the service

5 - 

    arrayNumberWithFirstDateToBeSentToApi

    and

    arrayNumberWithLastDateToBeSentToApi
  
    This two properties will be sent to the API on the proper order.

    We need them because the API requires them to be numbers,
    so we can´t simply send the same string properties we declared above, to send dates to modals.

    Also array of numbers can't be directly piped on the template as we can do with strings, 
    so for the moment I find easier to do this way: 
      -string properties with dates to be shown on modals, 
      -array of numbers with dates to be sent to API

6 - 

    Maybe this arrayOfObjectsWithEvents could have been declared as customEvent type, with our own interface we have created, but I need to use the push() method on it so I find it better to be declared as array of Objects for now.

    The value from this property will be sent to app-modal child component, 
    to the property called arrayOfEventsToShow
  