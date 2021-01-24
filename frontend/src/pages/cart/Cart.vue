<template>
  <div id="app">
    <router-view></router-view>
    <h1>This is the cart page</h1>
       <!-- This is for displaying the lessons-->
    <div v-for="lesson in cart" :key="lesson.id"> 
      <!-- This is the list with lessons details-->
      <ul>
       <li>Subject: {{ lesson.subject}}</li>
      <li>Location: {{ lesson.location}} </li>
      <li>Price: {{ lesson.price}}</li>
      <li>Spaces: {{ lesson.places}}</li> 
      </ul>
      <!-- this is the button to remove the lesson from shopping cart-->
      <button class="button"  v-on:click="remove(lesson)" >Remove</button>
    </div> 
    
    <button class="back-button" >
      <router-link to="/">Back</router-link>
    </button>
    <p>To checkout, fill out user information</p>
    <p>Name: <input v-model="name" placeholder="Your name here"></p>
    <p>Telephone number: <input v-model="phoneNumber" placeholder="Your phone number here"></p>
    <button v-on:click="submit">Submit</button>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: "",
      phoneNumber: "",
      cart: [],
    };
  },
  created() { 
    },
  mounted() {
    if (localStorage.getItem('shoppingcart')) {
      try {
        this.cart = JSON.parse(localStorage.getItem('shoppingcart'));
      } catch(e) {
        localStorage.removeItem('shoppingcart');
      }
    }
  },
  methods: {
    remove: function(lessontoremove) {
      let id = lessontoremove.id;
      //look for lessons in shopping cart array
        var arrayLength = this.cart.length;
        for (var i = 0; i < arrayLength; i++) {
            if (this.cart[i].id == id)
            {
              //remove item in location I
              this.cart.splice(i, 1);
              break;
            }
        }
    },
    submit: function() {
    /*const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Fahad", phoneNumber: "07913113089" })
        }; */

        const requestOptions = { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: this.name, 
            phoneNumber: this.phoneNumber,
            lessonId: this.cart[0].id,
            spaces: this.cart[0].places,
            })
        };
        fetch("/orders", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))

        //this is for putting the request
        const updateoptions = { 
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id:this.cart[0].id,
            places: this.cart[0].places,
            })
        };
        fetch("/lessons/update", updateoptions)
        .then(response => response.json())
        .then(data => console.log(data))
      //save data
      if( this.name  && this.phoneNumber)
      {
        alert('Thank you ' + this.name + ', your order has been submitted');
        return false;
      }
      else
      {
        alert('Please fill in your details');
        return true;
      } 
    },
  }
}
</script>