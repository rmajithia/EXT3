// Update the relevant fields with the new data
function setDOMInfo(info) {
 
  
  //document.getElementById('total').textContent   = info.total;
  //document.getElementById('inputs').textContent  = info.inputs;
  //document.getElementById('buttons').textContent = info.buttons;
  
 //  document.getElementById('tab3').innerHTML = info.incidents;
    // alert(info.incidents);
     console.log(info.incidents);
         document.getElementById('table2').innerHTML = iterateChange(info.buttons);

    document.getElementById('tab3').innerHTML = iterateIncidents(info.incidents);
    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Objects Retrieved!",
                        message: "Service now objects have been retrieved!!!!."
                };
                chrome.notifications.create('limitNotif', notifOptions);
}

function iterateIncidents(incidentDetails)
{
 var str='';
  var jsonObj=JSON.parse(incidentDetails);
                for(var i=0;i<jsonObj.length;i++)
                {        
                   
                   str+=  printIncident(jsonObj[i].number,jsonObj[i].short_description,jsonObj[i].sys_id);
                }

  
       return str;
}
function iterateChange(changeDetails)
{
 var str='<table data-toggle="table" class="table table-responsive"><thead><tr><th>Number</th><th>Short Description</th><th>Planned Start Date</th><th>Planned End Date</th><th>Action</th></tr></thead><tbody>';
  var jsonObj=JSON.parse(changeDetails);
                for(var i=0;i<jsonObj.length;i++)
                {        
                    
                   str+=  printChange(jsonObj[i].ca_number,jsonObj[i].ca_short_description,jsonObj[i].cap_sys_id,jsonObj[i].ca_start_date,jsonObj[i].ca_end_date);
                }

  
       return str+'</tbody></table>';
}

function printChange(number,shortDescription,sys_id,plannedStartDate,plannedEndDate)
{

var  str=

    '<tr  class="tr-class-1">'+
                '<td>'+number+'</td>'+
                   '<td>'+shortDescription+'</td>'+
                     ' <td>'+plannedStartDate+'</td>'+
                   ' <td>'+plannedEndDate+'</td>'+
				   '<td> <a href="https://dev28379.service-now.com/nav_to.do?uri=sysapproval_approver.do?sys_id='+sys_id+'" class="w3-button w3-red">Approve/Reject</a> </td>">'+
                      '    </tr>';
                  

 return str;
}


function printIncident(number,shortDescription,sys_id)
{

var  str=

    '<div class="w3-container">'+
                '<div class="w3-card-4"  style="width:100%; background-color:#fff;">'+
                   '<div class="w3-container w3-center">'+
                     ' <p class="preppy">'+number+':'+shortDescription+'</p>'+
                   ' </div>'+
				   '<div class="w3-container w3-center">'+
                      '<img src="http://w3.unisa.edu.au/facilities/contractors/hazard-warning_icon_1024x1024.png" alt="Monitor" style="width:200px">'+
                   '</div>'+

				    '<div align="right">'+
					 '</br>'+
      '<p class="text-right"><a href="https://dev28379.service-now.com/nav_to.do?uri=incident.do?sys_id="'+sys_id+' class="w3-button w3-red">Open</a></p>'+
                  '</div>'+
               '</div>'+
				 
           ' </div></br>';

 return str;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
  
  
});

$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});