//STAY IN

const ideas=["Have an indoor picnic","Beer tasting","Scotch tasting","Ice cream night!","Make Sushi together", "Learn to bake a new dessert together", "YouTube karaoke. Look up karaoke versions of your favorite songs on YouTube", "Paint together","Paint eachother", "Wine tasting", "Stargazing", "Roast marshmallows" ,"Play videogames together", "Foot rubs", "Curl up on the couch with a bowl of popcorn and watch a movie", "Turn off all of the lights and enjoy candle light.  Makes board games more fun, I hear.","Travel the world in your living room!  Cook something from a different culture, and play some of their music", "Everyone loves puzzles", "Make a pizza together", "Blind taste testing... if you trust your partner", "Work together to make a playlist for your time together... or for your life together as told in an action anime", "Learn a new hobby!", "Play cards", "Play darts", "Plan your next trip together","Read to eachother", "YouTube dance lessons! You know you want to salsa", "Play a childhood game", "Boardgame! I call the tophat.", "Make top 10 lists together", "Take a walk together","Build a fort!","Take a bath together","Start a journal together", "Write a story together","Get a super fancy dessert from a bakery near you","Take turns asking eachother questions, you never know what you might learn","Recreate your first date together", "Set up a tent in your living room. Everyone loves camping when you don't need to go outside!","Play 'Would you rather'", "Theme night! Agree on a theme ahead of time and try to think of creative ways to fill it.","Fondue? More like Fun-do!","Hit the Guinness Book of World Records! Anything you can  break together?","Movie marathon","Play Twister!"];

const edamamSearchURL='https://api.edamam.com/search';

function stayInButton(){
	$('.outOrInBox').on('click','.stayInButton', function(){
		console.log('stayInButton pressed');
		$('.outOrInPage').prop('hidden',true);
		$('.inPage').prop('hidden',false);
	});
}

function ideaSubmit(){
   $('.ideaContainer').on('click','.ideaButton', function(){
    console.log("ideaButton pressed");
    $('.ideaResults').prop('hidden',false);
    $('.ideaResults').html("");
		let randomIdea=ideas[Math.floor(Math.random()*ideas.length)];
		$('.ideaResults').html(randomIdea);
  });
}

function recipeSubmit(){
  $('.recipeRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.recipeInput');
    const recipeInput=queryTarget.val();
    queryTarget.val('');
    console.log('recipeSubmit ran with search term '+recipeInput);
    getRecipes(recipeInput,displayRecipeResults);
    $('.recipeResults').prop('hidden',false);
  });
}

function getRecipes(searchTerm,callback){
    settings={
      method:'GET',
      dataType: 'json',
      url:edamamSearchURL,
      data:{
        from:0,
        to:10,
        app_id:'0ddfcbda',
        app_key:'ff994fb730845d74622198d22cb55dfd',
        q:`${searchTerm}`
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getRecipes ran');
} 

function displayRecipeResults(data){
  const results=data.hits.map((item)=> renderRecipes(item));
  $('.recipeResults').html(results);
  console.log (results);
  console.log('displayRecipeResults ran');
  // const ingredientString=`${item.recipe.ingredientLines}`;
  // const ingredients=ingredientString.split(',');
  // for (i=0; i<ingredients.length; i++){
    // $('.resultHolder ul').append(`<li>${item.recipe.ingredientLines[i]}</li>`);
  // }
}

function renderRecipes(item){
  console.log('renderRecipes ran');
  return`<div class="resultHolder">
      <a href="${item.recipe.url}">
       <img class="foodPic" src="${item.recipe.image}">
      </a>
      </br>
      <p>${item.recipe.label}</p>
    </div>`;
}

// GO OUT

const cityURL="https://developers.zomato.com/api/v2.1/locations";

const foodURL="https://developers.zomato.com/api/v2.1/search";

const eventURL="http://api.eventful.com/jsonp/events/search";

function goOutButton(){
	$('.outOrInBox').on('click','.goOutButton', function(){
		console.log('goOutButton pressed');
		$('.outOrInPage').prop('hidden',true);
		$('.outPage').prop('hidden',false);
	});
}

function citySubmit(){
  $('.cityRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.cityInput');
    const cityInput=queryTarget.val();
    queryTarget.val('');
    console.log('citySubmit ran with search term '+cityInput);
    getCity(cityInput,entityFind);
    eventCity=cityInput;
   $('.foodRequestContainer').prop('hidden',false);
   $('.eventRequestContainer').prop('hidden',false);
   $('.cityResults').prop('hidden',false);
   $('.cityResults').html('');
   $('.cityResults').html(`I hear good things about ${cityInput}!`);
  });
}

function getCity(searchTerm,callback){
    settings={
      method:'GET',
      url:cityURL,
      headers:{
        "user-key":"dfade01cfcbfa8fa156c5d8a39248d21"
      },
      data:{
        query:searchTerm
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getCity ran');
} 

function entityFind(data){
  console.log("entityFind ran");
  const results=data.location_suggestions.map((item)=> renderEntity(item));
}

function renderEntity(item){
  console.log('renderEntity ran');
  entity=`${item.entity_id}`;
}

function foodSubmit(){
  $('.foodRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.foodInput');
    const foodInput=queryTarget.val();
    queryTarget.val('');
    console.log('foodSubmit ran with search term '+foodInput);
    getFood(foodInput,displayFoodResults);
  });
}

function getFood(searchTerm,callback){
    console.log(entity);
    settings={
      method:'GET',
      dataType: 'json',
      url:foodURL,
      headers:{
        "user-key":"dfade01cfcbfa8fa156c5d8a39248d21"
      },
      data:{
        count:10,
        entity_id:entity,
        q:searchTerm
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getFood ran');
}

function displayFoodResults(data){
  console.log('displayFoodResults is running '+data);
  const results=data.restaurants.map((item)=> renderFood(item));
  $('.foodResults').prop('hidden',false);
  $('.foodResults').html(results);
  console.log('displayFoodResults ran');
}

function renderFood(item){
  console.log('renderRecipes ran');
  return`
      <div class="resultHolder">
      <a href="${item.restaurant.url}">
       ${item.restaurant.name}
      </a>
      </br>
      <p>User Rating: ${item.restaurant.user_rating.rating_text}</p>
      <p>Price Range: ${item.restaurant.price_range}/5</p>
      <p>${item.restaurant.location.address}</p>
      </div>
    `;
}

function eventSubmit(){
  $('.eventRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.eventInput');
    const eventInput=queryTarget.val();
    queryTarget.val('');
    console.log('eventSubmit ran with search term '+eventInput);
    getEvent(eventInput,displayEventResults);
  });
}

function getEvent(searchTerm,callback){
    settings={
      method:'GET',
      dataType:'jsonp',
      url:eventURL,
      data:{
        app_key:"tsTVsnpR6pkcLkn6",
        location:eventCity,
        date:"Today",
        keywords:searchTerm
      },
      success:callback
    };
  $.ajax(settings);
  console.log(eventURL);
  console.log(eventCity);
  console.log('getEvent ran');
}

function displayEventResults(data){
  console.log(data);
  console.log('displayEventResults is running '+data);
  const results=data.events.map((item)=> renderEvent(item));
  $('.eventResults').prop('hidden',false);
  $('.eventResults').html(results);
  console.log('displayFoodResults ran');
}

function renderEvent(item){
  console.log('renderEvent ran');
  return`
      <div class="resultHolder">
        <a href="${item.event.url}">
          <img src="${item.event.image.thumb.url}">
        </a>
        </br>
        <p>Event: ${item.event.title}</p>
        <p>Starts: ${item.event.start_time}</p>
        <p>Venue: </p><a href="${item.event.venue_url}">${item.event.venue_name}</a>
        </br>
        <p>Address: ${item.event.venue_address}</p>
        <p>${item.event.city_name}, ${item.event.region_abbr}  ${item.event.postal_code}</p>
      </div>
    `;
}


// OTHER

function homeButton(){
  $('.returnHome').on('click','.homeButton', function(){
    console.log("homeButton pressed");
    $('.outOrInPage').prop('hidden',false);
		$('.outPage').prop('hidden',true);
		$('.inPage').prop('hidden',true);
		$('.recipeResults').prop('hidden',true);
		$('.ideaResults').prop('hidden',true);
		$('.foodResults').prop('hidden',true);
		$('.eventResults').prop('hidden',true);
		$('.cityResults').prop('hidden',true);
		$('.foodRequestContainer').prop('hidden',true);
		$('.eventRequestContainer').prop('hidden',true);
  });
}

function functionRunner(){
	goOutButton();
	stayInButton();
	homeButton();
	recipeSubmit();
	citySubmit();
	foodSubmit();
	eventSubmit();
	ideaSubmit();
}

$(functionRunner);