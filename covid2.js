$(document).ready(function(){
  var url="https://api.covid19india.org/data.json"


  $.getJSON(url,function(data){
    console.log(data);
    var total_active,total_recovered,total_deceased,total_confirmed;
    var state=[]
    var confirmed=[]
    var active=[]
    var deceased=[]
    var recovered=[]

    $.each(data.statewise,function(id,obj){
      state.push(obj.state)
      confirmed.push(obj.confirmed)
      active.push(obj.active)
      deceased.push(obj.deaths)
      recovered.push(obj.recovered)

    })
    console.log(state);

    total_active = data.statewise[0].active;
    total_confirmed = data.statewise[0].confirmed;
    total_deceased = data.statewise[0].deaths;
    total_recovered = data.statewise[0].recovered;

    $("#active").text(total_active)
    $("#deceased").text(total_deceased)
    $("#confirmed").text(total_confirmed)
    $("#recovered").text(total_recovered)


    var stateTable =[]
    $.ajax({
      method:'GET',
      url:'https://api.covid19india.org/data.json',
      success:function(response){
        stateTable=response.statewise
        buildTable(stateTable)
      console.log(stateTable);
      }

    })

    function buildTable(data){
      var table=document.getElementById('state_table')

      for (var i = 1; i < state.length; i++) {
        var a=$(data[i].active);
        var r=$(data[i].recovered);
        var d=$(data[i].deaths);
       var row= `<tr id=${i} class="hover_tr">
                    <td id="s${i}">${data[i].state}</td>
                    <td id="c${i}">${data[i].confirmed}</td>
                    <td id="a${i}">${data[i].active}</td>
                    <td id="r${i}">${data[i].recovered}</td>
                    <td id="d${i}">${data[i].deaths}</td>
                </tr>`

              //console.log(row);

        table.innerHTML+=row
      }

      $('.hover_tr').hover(
        function(){
        var a =this.id;
        state_confirmed=document.querySelector('#c'+a).innerHTML;
        state_active=document.getElementById('a'+a).innerHTML;
        state_recovered=document.getElementById('r'+a).innerHTML;
        state_deceased=document.getElementById('d'+a).innerHTML;

        $("#active").text(state_active)
        $("#deceased").text(state_deceased)
        $("#confirmed").text(state_confirmed)
        $("#recovered").text(state_recovered)

        BuildChart(state_active,state_deceased,state_recovered)
        BuildLine(state_active,state_deceased,state_recovered)
},
function(){
  BuildChart(total_active,total_deceased,total_recovered)
  BuildLine(total_active,total_deceased,total_recovered)
  $("#active").text(total_active)
  $("#deceased").text(total_deceased)
  $("#confirmed").text(total_confirmed)
  $("#recovered").text(total_recovered)
}
);
}

    function BuildChart( value_active,value_deceased,value_recovered) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
           // Our labels
            datasets: [{
               // Name the series
                data: [value_active,value_deceased,value_recovered], // Our values
                backgroundColor: ['blue','grey','green'], // Specify custom colors
            }],
            labels: [
                'Active',
                'Deceased',
                'Recovered'
            ]
        },
        options: {
          cutoutPercentage:85,
          legend:{
            display:true,
            position:'right',
            labels:{
            boxWidth:10,
          },
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        }
    }});
    return myChart;
}

BuildChart(total_active,total_deceased,total_recovered);

  function BuildLine(value_active,value_deceased,value_recovered){
    var ctx2 = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
        datasets: [
          {
        labels:'Recovered',
        data:value_active,
        borderColor:'green'
          },
          {
        labels:'Deceased',
        data:value_deceased,
        borderColor:'grey'
          },
          {
        labels:'Active',
        data:value_recovered,
        borderColor:'blue'
          }
        ],
        labels: [
            'Active',
            'Deceased',
            'Recovered'
        ]
        },
        options:{
          legend:{
            display:false,

          }
        }
    });
 return chart;
  }
  BuildLine(total_active,total_deceased,total_recovered);

  })
})
