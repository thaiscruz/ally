const createCalendar = async (data) => {
    let calendarEl = document.getElementById('calendar');
    let testes =   JSON.parse(data)
    
    let events =[]
    testes.forEach(teste => {
        events.push({title:teste.nome,start:teste.dataMarcada})
    });
    let calendar = new FullCalendar.Calendar(calendarEl, {
        height: 550,
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        timeZone: 'local',
        headerToolbar:{
            left:'prev,next today',
            centet:'title',
            right:'dayGridMonth, timeGridWeek,timeGridDay',
        },
        events,
     
    });

    calendar.render();
    
  }

const fetchData = ()=>{
    return new Promise ((resolve,reject)=>{
        fetch('http://localhost:5000/calendario/data', {
            method: 'GET', 
        })
        .then(response => response.text()).then(data=> createCalendar(data)).catch(function(err) { console.error(err); });
    })
 
}

fetchData()


