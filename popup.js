// Update the relevant fields with the new data
function setDOMInfo(info) {


    //document.getElementById('total').textContent   = info.total;
    //document.getElementById('inputs').textContent  = info.inputs;
    // alert(info.buttons);
    // document.getElementById('buttons').textContent = info.buttons;

    //  document.getElementById('tab3').innerHTML = info.incidents;
    // alert('yyyy'+info.incidents);

    document.getElementById('tab3').innerHTML = iterateChange(info.buttons);

    document.getElementById('tab1').innerHTML = iterateIncidents(info.incidents);
    var notifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Objects Retrieved!",
        message: "Service now objects have been retrieved!!!!."
    };
    chrome.notifications.create('limitNotif', notifOptions);
}

function iterateIncidents(incidentDetails) {
    var str = ' <h2>My Priority Incidents111</h2>';
    var jsonObj = JSON.parse(incidentDetails);
    for (var i = 0; i < jsonObj.length; i++) {

        str += printIncident(jsonObj[i].number, jsonObj[i].short_description, jsonObj[i].sys_id);
    }


    return str;
}

function iterateChange(changeDetails) {
    var str = '<table data-toggle="table" class="table table-responsive"><thead><tr><th>Number</th><th>Short Description</th><th>Planned Start Date</th><th>Planned End Date</th><th>Action</th></tr></thead><tbody>';
    var jsonObj = JSON.parse(changeDetails);
    for (var i = 0; i < jsonObj.length; i++) {

        str += printChange(jsonObj[i].ca_number, jsonObj[i].ca_short_description, jsonObj[i].cap_sys_id, jsonObj[i].ca_start_date, jsonObj[i].ca_end_date);
    }

    alert(str);
    return str + '</tbody></table>';
}

function printChange(number, shortDescription, sys_id, plannedStartDate, plannedEndDate) {

    var str =

        '<tr  class="tr-class-1">' +
        '<td>' + number + '</td>' +
        '<td>' + shortDescription + '</td>' +
        ' <td>' + plannedStartDate + '</td>' +
        ' <td>' + plannedEndDate + '</td>' +
        '<td> <a href="https://dev28379.service-now.com/nav_to.do?uri=sysapproval_approver.do?sys_id=' + sys_id + '" class="w3-button w3-red">Approve/Reject</a> </td>">' +
        '    </tr>';


    return str;
}


function printIncident(number, shortDescription, sys_id) {

    var str =


        '<div class="row">' +

        '<div class="info-card">' +
        '<div class="front">' +

        '<div class="col-sm-12 thumbnail text-center">' +
        ' <img alt="" class="img-responsive" src="http://pcwrangler.com.au/wp-content/uploads/2013/10/Priority-300x232.jpg">' +
        '<div class="caption">' +
        ' <h1>' + number + '</h1>' +
        '  <h2>' + shortDescription + '</h2>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="back">' +
        '<h1>' + number + ':' + shortDescription + '</h1>' +
        '<p>' +
        shortDescription +
        '</p>' +
        '<div class="social">' +
        '<a href="#" class="social-icon facebook  animate"><span class="fa fa-facebook"></span></a>' +
        '<a href="https://twitter.com/MichaelCanlas7" target="_blank" class=" social-icon twitter  animate"><span class="fa fa-twitter"></span></a>' +
        '<a href="https://github.com/ironprice91" target="_blank" class=" social-icon github  animate"><span class="fa fa-github-alt"></span></a>' +
        '</div>  </div>  </div> </div>';



    //    alert(str);




    return str;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id, {
                from: 'popup',
                subject: 'DOMInfo'
            },
            // ...also specifying a callback to be called 
            //    from the receiving end (content script)
            setDOMInfo);
    });


});