var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var FeedTime,lastfed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  FeedTime = database.ref('FeedTime');
  FeedTime.on("value",function(data){
    lastfed = data.val();
  })
  
 
  //write code to display text lastFed time here
  fill(255,255,255);
  textSize(25);
  if(lastfed >=12){
    text("Last Feed::" + lastfed + "PM",300,30);
  }
  else if(lastfed == 0){
    text("Last Feed:: 12 AM", 300,30);
  }
  else {
    text("Last Feed::" + lastfed + "AM",250,30);
  }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

  

}

//function to add food in stock

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
