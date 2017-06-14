        // Inform the background page that 
        // this tab should have a page-action
        chrome.runtime.sendMessage({
        from:    'content',
        subject: 'showPageAction'
        });

        // Listen for messages from the popup
        chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        // First, validate the message's structure
        // alert(msg.action );
        if(msg.action=='open_dialog_box')
        {

           
             var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Objects Retrieved!",
                        message: "Service now objects have been retrieved!!!!."
                };
                //chrome.notifications.create('limitNotif1', notifOptions);
               //  alert('aaa');
              //  alert(msg.selectedText);
				
				 var obj = new Object();
                obj.kb_knowledge_base = "a7e8a78bff0221009b20ffffffffff17";
                obj.text  = '<![CDATA[ <p>'+msg.selectedText+'</p> ';
                obj.short_description = 'KB From Plugin';
                var requestBody= JSON.stringify(obj);
                //var requestBody = '{"short_description":"Test","text":"62826bf03710200044e0bfc8bcbe5df1"}';
               //alert(requestBody);
                var client=new XMLHttpRequest();
                client.open("POST","https://dev28379.service-now.com/api/now/table/kb_knowledge",false);
                client.setRequestHeader('Accept','application/json');
                client.setRequestHeader('Content-Type','application/json');
                client.send(requestBody);
            
                var str='';
                //alert(client.responseText);
               
                var jsonObj=JSON.parse(client.responseText);
                 
                 
                var urls= "https://dev28379.service-now.com/nav_to.do?uri=kb_knowledge.do?sys_id="+jsonObj.result.sys_id;
                window.open(urls, '_blank');
                 //alert(jsonObj.result.sys_id);
				//alert('dddd'+str);
                response({incidentCreated: "true",incident:"dadfasdf"}); 

        }
        if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
            // Collect the necessary data 
            // (For your specific requirements `document.querySelectorAll(...)`
            //  should be equivalent to jquery's `$(...)`)
            
                
        
            var domInfo = {
          /*  total:   retrieveObjects('sc_task'),
            inputs:  retrieveObjects('change_request'),*/
            buttons: retrieveChangeObjects('u_change_sysapproval_approver?sysparm_query=cap_approver=46d96f57a9fe198101947a9620895886^ca_assigned_to=5137153cc611227c000bbd1bd8cd2007^ca_assignment_group!=8a5055c9c61122780043563ef53438e3^ORca_assignment_group=NULL'),
            incidents: retrieveObjects('incident?sysparm_query=priority=1')
            };
            
            // Directly respond to the sender (popup), 
            // through the specified callback */
            response(domInfo);
        }
    });
       
        function retrieveChangeObjects(tableName)
        {
            var client=new XMLHttpRequest(); 
            client.open("GET","/api/now/table/"+tableName,false); 
            client.setRequestHeader('Accept','application/json');
            client.send();
        // alert(client.responseText)
            var str='';
            var jsonObj=JSON.parse(client.responseText);
            var  jsonObjIncident = [];
            for(var i=0;i<jsonObj.result.length;i++)
             {
               // str+=jsonObj.result[i].number+'-';
                var item = {}
                item ["ca_number"] = jsonObj.result[i].ca_number;
                item ["ca_start_date"] = jsonObj.result[i].ca_start_date;
                item ["ca_short_description"] = jsonObj.result[i].ca_short_description;
                 item ["cap_sys_id"] = jsonObj.result[i].cap_sys_id;

                item["ca_end_date"]=jsonObj.result[i].ca_end_date;
                jsonObjIncident.push(item);
            }
            // alert(JSON.stringify(jsonObjIncident));
            return JSON.stringify(jsonObjIncident);

        }
        function retrieveObjects(tableName)
        {
            var client=new XMLHttpRequest(); 
            client.open("GET","/api/now/table/"+tableName,false); 
            client.setRequestHeader('Accept','application/json');
            client.send();
        // alert(client.responseText)
            var str='';
            var jsonObj=JSON.parse(client.responseText);
            var  jsonObjIncident = [];
            for(var i=0;i<jsonObj.result.length;i++)
             {
               // str+=jsonObj.result[i].number+'-';
                var item = {}
                item ["number"] = jsonObj.result[i].number;
                item ["sys_id"] = jsonObj.result[i].sys_id;
                item["short_description"]=jsonObj.result[i].short_description;
                jsonObjIncident.push(item);
            }
            // alert(JSON.stringify(jsonObjIncident));
            return JSON.stringify(jsonObjIncident);

        }