$(document).ready(function(){
  $(".button-collapse").sideNav();
})

var baseURL = 'https://murmuring-temple-70443.herokuapp.com/resource'


  $.get(baseURL)
  .then(function(data){
    console.log(data);
    for(var i=0; i <data.length; i++)
      $('#notes').append(
        `<div class = "col s12 m4 id-${data[i].id}">
          <h2 class= "title">${data[i].title}</h2>
          <p class= "type">Type: ${data[i].type}</p>
          <p class = "description">${data[i].description}</p>
          <a class= "link" href="${data[i].link}">Go To Resource!</a>
        </div>
        `
      )
  });
