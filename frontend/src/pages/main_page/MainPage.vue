<template>
<!-- this is for the html part of the code-->
  <div id="app"> 
    <button><router-link :to="{name: 'Cart'}"> cart </router-link></button>
    <!-- this is for the select button for different sorting categories-->
    <select v-model="sortBy">
      <option disabled value="">Sort by</option>
      <option value="subject">Sort by Subject</option>
      <option value="location">Sort by Location</option>
      <option value="price">Sort by Price</option>
      <option value="places">Sort by Places Available</option>
    </select>
    <!-- This is for the button for chosing the sort by order-->
    <br>
    <span>Sort by order: {{ inputSortingOrder }}</span>
    <br>
    <input type="radio" id="one" value="ASC" v-model="inputSortingOrder" >
    <label for="one">ascending/a to z</label>
    <br>
    <input type="radio" id="two" value="DESC" v-model="inputSortingOrder" >
    <label for="two">descending /z to a</label>
    <br>
    <!-- This is for displaying the lessons-->
    <div v-for="lesson in sortedLessons" :key="lesson.id" v-bind:class="changeSortByOrder"> 
      <!-- This is the list with lessons details-->
      <ul>
       <li>Subject: {{ lesson.subject}}</li>
      <li>Location: {{ lesson.location}} </li>
      <li>Price: {{ lesson.price}}</li>
      <li>Spaces: {{ lesson.places}}</li> 
      </ul>
      <!-- This is for adding to chart-->
      <button v-on:click="addtochart(this, lesson)" :disabled="isDisabled(lesson)"> addtochart </button>
    </div>
  </div>
</template>

<script>
//import lessonData from "./lessons.json"; // to import the lesson.json file
export default {
  name: 'App',
  data() {
    return{
      lessons:[],
      sortBy: "",
      inputSortingOrder: "ASC", //this is the order selected by the user
      defaultSortingOrder: "ASC", //this is the current order being used 
      shoppingcart: [], //this array stores the lessons added to cart
    }
  },
 async created() { //this is making a request for api/lessons.
    const result = await fetch('https://fahadcst3145.herokuapp.com/lessons')
          .then(response => response.json()) //parsing the response
          .then(data => {
            console.log(data)
            return data
            });
      this.lessons = result;

  },
  computed:{ 
    //this is the function to sort the array of lessons
    sortedLessons: function() {
      // check if order needs updating
      if(this.defaultSortingOrder != this.inputSortingOrder)
      {
        this.changeSortByOrder();
      }
      // to check what categories to sort by
     switch(this.sortBy) {
        case "subject":
          return this.sortedBySubject();
        case "location":
          return this.sortedByLocation();
        case "price":
          return this.sortedByPrice();
        case "places":
          return this.sortedByPlacesAvailable();
        default:
          return this.lessons;
      }
    }
  },
  methods:{ 
    // update the lesson details after adding to chart
    addtochart (button, lessontoadd) { 
       if (lessontoadd.places > 0)
      {
        let id = lessontoadd.id;
        //look for the lesson in the array
        var arrayLength = this.lessons.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.lessons[i].id == id)
            {
              //subtract one place from lesson
              this.lessons[i].places -= 1;
              //add this lesson to the shopping cart
              this.shoppingcart.push(
                {
                  id: lessontoadd.id, 
                  subject: lessontoadd.subject,
                  location: lessontoadd.location,
                  price: lessontoadd.price,
                  places: lessontoadd.places,
                }
              )
              break;
            }
        }
        //this saves the lesson added in the browser
        const parsed = JSON.stringify(this.shoppingcart);
        localStorage.setItem('shoppingcart', parsed);

      }

    },
    // check if add to chart button should be disabled 
     isDisabled(lesson) {
      if (lesson.places === 0)
        return true;
      else
        return false;
    },
    // change the current sorting order to the new one
    changeSortByOrder: function () {
      this.defaultSortingOrder = this.inputSortingOrder;
    },
    // sort lessons array by subject 
    sortedBySubject: function () {
      // this is for sorting in descending order
      function descending(a, b) {
        if (a.subject > b.subject)
          return -1;
        if (a.subject < b.subject)
          return 1;
        return 0;
      }
      // this is for sorting in ascending order
      function ascending(a, b) {
        if (a.subject < b.subject)
          return -1;
        if (a.subject > b.subject)
          return 1;
        return 0;
      }
      if ( this.defaultSortingOrder == "ASC" )
      {
        let sortedArray = this.lessons;
        sortedArray.sort(ascending);
        return sortedArray;
      }
      else if (this.defaultSortingOrder == "DESC")
      {
        let sortedArray = this.lessons;
        sortedArray.sort(descending);
        return sortedArray;
      }
    },
    // sort lessons array by subject 
     sortedByLocation: function(){
       // this is for sorting in descending order
      function descending(a, b) {
        if (a.location > b.location)
          return -1;
        if (a.location < b.location)
          return 1;
        return 0;
      }
      // this is for sorting in ascending order
      function ascending(a, b) {
        if (a.location < b.location)
          return -1;
        if (a.location > b.location)
          return 1;
        return 0;
      }
      if ( this.defaultSortingOrder == "ASC" )
      {
        let sortedArray = this.lessons;
        sortedArray.sort(ascending);
        return sortedArray;
      }
      else if (this.defaultSortingOrder == "DESC")
      {
        let sortedArray = this.lessons;
        sortedArray.sort(descending);
        return sortedArray;
      }

    },
    // sort lessons array by subject 
     sortedByPrice: function(){
       // this is for sorting in descending order
      function descending(a, b) {
        if (a.price > b.price)
          return -1;
        if (a.price < b.price)
          return 1;
        return 0;
      }
      // this is for sorting in ascending order
      function ascending(a, b) {
        if (a.price < b.price)
          return -1;
        if (a.price > b.price)
          return 1;
        return 0;
      }
      if ( this.defaultSortingOrder == "ASC" )
      {
        let sortedArray = this.lessons;
        sortedArray.sort(ascending);
        return sortedArray;
      }
      else if (this.defaultSortingOrder == "DESC")
      {
        let sortedArray = this.lessons;
        sortedArray.sort(descending);
        return sortedArray;
      }
    }, 
    // sort lessons array by subject 
     sortedByPlacesAvailable: function(){
        // this is for sorting in descending order
      function descending(a, b) {
        if (a.places > b.places)
          return -1;
        if (a.places < b.places)
          return 1;
        return 0;
      }
      // this is for sorting in ascending order
      function ascending(a, b) {
        if (a.places < b.places)
          return -1;
        if (a.places > b.places)
          return 1;
        return 0;
      }
      if ( this.defaultSortingOrder == "ASC" )
      {
        let sortedArray = this.lessons;
        sortedArray.sort(ascending);
        return sortedArray;
      }
      else if (this.defaultSortingOrder == "DESC")
      {
        let sortedArray = this.lessons;
        sortedArray.sort(descending);
        return sortedArray;
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: 60,60,60;
  margin-top: 60px;
}
</style>
