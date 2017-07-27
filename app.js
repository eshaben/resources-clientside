$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('select').material_select();
  $('.modal').modal();

})

var baseURL = 'http://localhost:8080/resource/'
var herokuURL = 'https://murmuring-temple-70443.herokuapp.com/resource/'

getResource(herokuURL)

$('.submit').click(processRequest)


function getResource(herokuURL){
  $.get(herokuURL)
   .then(displayResource)
}

function displayResource(data){
  for(var i=0; i <data.length; i++){
    $('.card').append(
        `
        <div class = "col s12 m4" id="${data[i].id}">
          <h2 class= "title">${data[i].title}</h2>
          <p class= "type">Type: ${data[i].type}</p>
          <p class = "description">${data[i].description}</p>
          <a class= "link" href="${data[i].link}">Go To Resource!</a>
          <button class= "delete" id= "${data[i].id}"><i id="${data[i].id}"class="material-icons">delete</i></button>
          <button class= "edit btn" id="${data[i].id}"><i id="${data[i].id}" class="material-icons">edit</i></button>
        </div>
        `
        )
  }
  addDeleteEvent();
  addEditEvent();
}

function processRequest(event){
  event.preventDefault()

  var resourceTitle = $('#resource-title').val()
  $('#resource-title').val('')
  var resourceType = $('.resource-type option:selected').val()
  $('.resource-type option:selected').val()
  var resourceLink = $('#resource-link').val()
  $('#resource-link').val('')
  var resourceDescription = $('#resource-description').val()
  $('#resource-description').val('')
  var resourceQuarter = $('.resource-quarter option:selected').val()

  var resourceDateCreated = new Date()
  var month = resourceDateCreated.getUTCMonth() + 1;
  var day = resourceDateCreated.getUTCDate();
  var year = resourceDateCreated.getUTCFullYear();

  resourceDateCreated = year + "-" + month + "-" + day;

  let resourceObject = {
      title: resourceTitle,
      type: resourceType,
      link: resourceLink,
      description: resourceDescription,
      dateCreated: resourceDateCreated,
      quarter: resourceQuarter
  }

  $.post(herokuURL, resourceObject)
    .then(function(data){
      if (data.message == "success"){
        $('#notes').empty()
      getResource(herokuURL)
    }
  })
}

function addDeleteEvent(){
  const deleteButtons = $('.delete')

      deleteButtons.on("click", function(event){
        var id = event.target.id;
        deleteResource(id)
  })
}

function deleteResource(id){
  $.ajax({
    url: herokuURL + id,
    type: 'DELETE',
    success: function(result){
      console.log("success!")
    }
  })
  .then(function(data){
    if(data.message === "success"){
      $('#notes').empty()
      getResource(herokuURL);
    }
  })
}

function addEditEvent(){
  const editButtons = $('.edit')

  editButtons.on("click", function(event) {
    console.log("you clicked me!");
    var id = event.target.id;
    console.log(id);

    createEditForm(id)
  })
}

function createEditForm(id){


}
