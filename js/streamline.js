window.onload = function(){
	var boxes = document.getElementsByName('tick');
				for(var i = 0; i < boxes.length; i++){
					if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
						boxes[i].checked = false;
					}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
						boxes[i].checked = true;
					}
				}
}

function status2(id){
	 params = 'state=' + id;
	 request = new ajaxRequest();
	request.open("POST", "streamlinetestAJAXfunction.php", true)
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	
	request.onreadystatechange = function()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            if (this.responseText != null)
            {
				$('#mobile').animate({width: 'toggle'});
				$('.header').animate({right: '0px'});
				$('#content').animate({right: '0px'});
              document.getElementById('tables').innerHTML = this.responseText
			  var boxes = document.getElementsByName('tick');
				for(var i = 0; i < boxes.length; i++){
					if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
						boxes[i].checked = false;
					}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
						boxes[i].checked = true;
					}
				}
            }
            else alert("Ajax error: No data received")
          }
          else alert( "Ajax error: " + this.statusText)
        }
      }
      
      request.send(params)
}
function status(id){
	 params = 'state=' + id;
	 request = new ajaxRequest();
	request.open("POST", "streamlinetestAJAXfunction.php", true)
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	
	request.onreadystatechange = function()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            if (this.responseText != null)
            {
              document.getElementById('tables').innerHTML = this.responseText
			  var boxes = document.getElementsByName('tick');
				for(var i = 0; i < boxes.length; i++){
					if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
						boxes[i].checked = false;
					}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
						boxes[i].checked = true;
					}
				}
            }
            else alert("Ajax error: No data received")
          }
          else alert( "Ajax error: " + this.statusText)
        }
      }
      
      request.send(params)
 }
 
 function ajaxRequest(){
        try
        {
          var request = new XMLHttpRequest()
        }
        catch(e1)
        {
          try
          {
            request = new ActiveXObject("Msxml2.XMLHTTP")
          }
          catch(e2)
          {
            try
            {
              request = new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch(e3)
            {
              request = false
            }
          }
        }
        return request
      }

function checkButton(checkbox){
//fetch and set all variables to be used.
var allOutput = document.getElementsByClassName('update');
var taskid = checkbox.id;
var parentid = checkbox.getAttribute('parent');
var parentOutput = document.getElementsByClassName('status' + parentid)[0];
var currentOutput = document.getElementsByClassName('status' + checkbox.id)[0];
var taskname = checkbox.value;
var checkBoxes = document.getElementsByName('tick');
var TotalCheckBoxes = document.getElementsByName('tick').length;
var checkedBoxes = 0;
var checkBox = checkbox.checked;
var debug = document.getElementById('word');
var status = 0;
var task = {};
var hasKid;
var numberOfKids = 0;
var kidsDoneCount = 0;
var kidsCompleteCount = 0;
var kidsDone;
var kidsCompleted;
var hasParent;
var hasSibling;
var numberOfSiblings = 0;
var siblingsCompleteCount = 0;
var siblingsDoneCount = 0;
var siblingsCompleted;
var siblingsDone;
var allcomplete = 0;	
var parenttaskid;
var parentstatus;
var hasOtherParent;

	//calculating amount of checkBoxes checked and incrementing checkedBoxes accordingly
	for(var i = 0; i < TotalCheckBoxes; i++){
		if(checkBoxes[i].checked == true){
			checkedBoxes++;
		} else {
			checkedBoxes;
		}
	}
	//if current checkbox is checked
	if(checkBox == true){
			status = 1;
			currentOutput.removeAttribute('status');
			currentOutput.setAttribute('status', status); 
	} else if(checkBox == false){//if current checkbox is unchecked 
			status = 0;
			currentOutput.removeAttribute('status');
			currentOutput.setAttribute('status', status); 
	}
	
	// pull all tasks from the streamlinetest.php table display
	for(var i = 0; i < allOutput.length; i++){
	task[i] = {
	'id' : checkBoxes[i].id,
	'parent' : checkBoxes[i].getAttribute('parent'),
	'name' : checkBoxes[i].value,
	'status' : allOutput[i].getAttribute('status')
	}
	//console.log(task[i]);
	}

	//set the length of all tasks pulled
	var keys = Object.keys(task).length;
	//change status from text to number;
	for(var i = 0; i < keys; i++){
		if(task[i]){
			if(task[i]['status'] == 'IN PROGRESS'){
					task[i]['status'] = 0;
			} else if(task[i]['status'] == 'DONE'){ 
					task[i]['status'] = 1;
			} else if(task[i]['status'] == 'COMPLETED'){
					task[i]['status'] = 2;
			}		
		}
	}
	
	//Check for parent and save their status and parent true or false
	for(var i = 0; i < keys; i++){
		if(task[i]){
			if(parentid == task[i]['id']){
				hasParent = true;
				parenttaskid = task[i]['id'];
				parentstatus = task[i]['status'];
				break;
			} else { 
				hasParent = false;
				}
		}
	}
	
	//check for siblings and add up status == 1;
	for(var i = 0; i < keys; i++){
		if(task[i]){
			if(parentid == task[i]['parent'] && taskid !== task[i]['id']){
				numberOfSiblings++;
				if(task[i]['status'] == 2){
					siblingsCompleteCount++;
				} else if(task[i]['status'] == 1){
					siblingsDoneCount++;
				}
			} else { numberOfSiblings; } 
		}
	}															

	//if siblings = to 1 or greater then sibling exist
	if(numberOfSiblings >= 1){
		hasSibling = true;
		if(siblingsCompleteCount == numberOfSiblings){
			siblingsCompleted = true;
		} else if(siblingsDoneCount == numberOfSiblings){
			siblingsDone = true;
		} else {
			siblingsDone = false;
			siblingsCompleted = false;
		}
	} else {
		hasSibling = false;
	}
		
	//Check if kids exist and set values
	for(var i = 0; i < keys; i++){
		if(task[i]){
			if(taskid == task[i]['parent'] && taskid !== task[i]['id']){
				numberOfKids++;
				if(task[i]['status'] == 2){
					kidsCompleteCount++;
				} else if(task[i]['status'] == 1){
					kidsDoneCount++;
				}
			} else { numberOfKids; } 
		}
	}
	
	//if kids = to 1 or greater then kid exists
	if(numberOfKids >= 1){
		hasKid = true;
		if(kidsCompleteCount == numberOfKids){
			kidsCompleted = true;
		} else if(kidsDoneCount == numberOfKids){
			kidsDone = true;
		} else{
			kidsDone = false;
			kidsCompleted = false;
		}
	} else { 
		hasKid = false;
		}

	//debug	
	//console.log('Parent: ' + hasParent);
	//console.log('Kid: ' + hasKid);
	//console.log('KidsCompleted: ' + kidsCompleted);
	//console.log('KidsDone: ' + kidsDone);
	//console.log('hasSibling: ' + hasSibling);
	//console.log('siblingsCompleted: ' + siblingsCompleted);
	//console.log('siblingsDone: ' + siblingsDone);
	//console.log('parentstatus: ' + parentstatus);
	//console.log('checkbox: ' + status);
	//php script was here                                   
	//Main PROGRAM 		
	if(hasParent == true){ 																	
		if(hasKid == true){																	 
			if(kidsCompleted == true){														
				if(hasSibling == true){														
					if(siblingsCompleted == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted = true/updateto status= 2&&set currentOutput Completed/siblingsCompleted = true/current parentstatus= 2');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status); 
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
								currentOutput.innerHTML = "IN PROGRESS"; 
								document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
								parentstatus = 1;
								parentOutput.removeAttribute('status');
								parentOutput.setAttribute('status', parentstatus); 
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/siblingsCompleted = true/current parentstatus= 1 change to parentstatus=2 and parentINNERHTML COMPLETED');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status); 
								document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "COMPLETED";
								parentstatus = 2;
								parentOutput.removeAttribute('status');
								parentOutput.setAttribute('status', parentstatus); 
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status); 
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					}else if(siblingsDone == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted = true/updateto status= 2&&set currentOutput Completed/siblingsDone = true/current parentstatus= 2');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingDone = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
								currentOutput.innerHTML = "IN PROGRESS";
								document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
								parentstatus = 1;
								parentOutput.removeAttribute('status');
								parentOutput.setAttribute('status', parentstatus); 
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/siblingsDone = true/current parentstatus= 1');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/updateto status= 2&&Set currentOutput COMPLETED/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					}else if(siblingsCompleted == false && siblingsDone == false){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted = true/updateto status= 2&&set currentOutput Completed/siblingsComp&done == false/current parentstatus= 2'); //shouldntseethis
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted = true/updateto status= 2&&Set currentOutput COMPLETED/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "COMPLETED";
								status = 2;
								currentOutput.removeAttribute('status');
								currentOutput.setAttribute('status', status);
							}else if(status == 0){
								console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					}
				}else if(hasSibling == false){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/kidsCompleted = true/updateto status= 2&&set currentOutput Completed/nosibs/current parentstatus= 2'); //shouldseethis
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/nosibs/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
							currentOutput.innerHTML = "IN PROGRESS";
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
							parentstatus = 1;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus); 
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/nosibs /current parentstatus= 1 change to parentstatus=2 and parentINNERHTML COMPLETED');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "COMPLETED";
							parentstatus = 2;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus); 
						}else if(status == 0){
							console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/nosibs/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/kidsCompleted = true/update status= 2&&Set currentOutput COMPLETED/nosibs/current parentstatus= 0');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/kidsCompleted = true/Set currentOutput INPROGRESS/no sibs/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}
				}
			}else if(kidsDone == true){
				if(hasSibling == true){														
					if(siblingsCompleted == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsDone = true/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 2');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
								currentOutput.innerHTML = "IN PROGRESS";
								document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
								parentstatus = 1;
								parentOutput.removeAttribute('status');
								parentOutput.setAttribute('status', parentstatus);
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsDone = true/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsDone = true/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					} else if(siblingsDone == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsDone = true/set currentOutput DONE/siblingsDone = true/current parentstatus= 2'); //shouldseethis
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingDone = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsDone = true/Set currentOutput DONE/siblingsDone = true /current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsDone = true/Set currentOutput DONE/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					} else if(siblingsCompleted == false && siblingsDone == false){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsDone = true/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 2'); //shouldntseethis
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsDone = true/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsDone = true/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					}
				}else if(hasSibling == false){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/kidsDone = true/set currentOutput DONE/nosibs/current parentstatus= 2'); //shouldnt see this.
						}else if(status == 0){
							console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/nosibs/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
							currentOutput.innerHTML = "IN PROGRESS";
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
							parentstatus = 1;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus);
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/kidsDone = true/set currentOutput DONE/nosibs /current parentstatus= 1');
							currentOutput.innerHTML = "DONE";
						}else if(status == 0){
							console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/nosibs/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/kidsDone = true/Set currentOutput DONE/nosibs/current parentstatus= 0');
							currentOutput.innerHTML = "DONE";
						}else if(status == 0){
							console.log('now status=0/kidsDone = true/Set currentOutput INPROGRESS/no sibs/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}
				}
			}else if(kidsCompleted == false && kidsDone == false){
				if(hasSibling == true){														
					if(siblingsCompleted == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted&&Done==false/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 2');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
								currentOutput.innerHTML = "IN PROGRESS";
								document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
								parentstatus = 1;
								parentOutput.removeAttribute('status');
								parentOutput.setAttribute('status', parentstatus);
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/Set currentOutput DONE/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					} else if(siblingsDone == true){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted&&Done==false/set currentOutput DONE/siblingsDone = true/current parentstatus= 2');//shouldnt see this
								//currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingDone = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this	
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/Set currentOutput DONE/siblingsDone = true /current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/Set currentOutput DONE/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					} else if(siblingsCompleted == false && siblingsDone == false){
						if(parentstatus == 2){
							if(status == 1){
								console.log('now status= 1/kidsCompleted&&Done==false/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 2'); //shouldntseethis
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
							}
						}else if(parentstatus == 1){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 1');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						}else if(parentstatus == 0){
							if(status == 1){
								console.log('now status=1/kidsCompleted&&Done==false/set currentOutput DONE/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "DONE";
							}else if(status == 0){
								console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 0');
								currentOutput.innerHTML = "IN PROGRESS";
							}
						} 
					}
				}else if(hasSibling == false){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/kidsCompleted&&Done==false/set currentOutput DONE/nosibs/current parentstatus= 2'); //shouldnt see this.
						}else if(status == 0){
							console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/nosibs/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
							currentOutput.innerHTML = "IN PROGRESS";
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
							parentstatus = 1;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus);
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/kidsCompleted&&Done==false/set currentOutput DONE/nosibs /current parentstatus= 1');
							currentOutput.innerHTML = "DONE";
						}else if(status == 0){
							console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/nosibs/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/kidsCompleted&&Done==false/Set currentOutput DONE/nosibs/current parentstatus= 0');
							currentOutput.innerHTML = "DONE";
						}else if(status == 0){
							console.log('now status=0/kidsCompleted&&Done==false/Set currentOutput INPROGRESS/no sibs/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}
				}
			}
		}else if(hasKid == false){                
			if(hasSibling == true){														
				if(siblingsCompleted == true){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/hasKid=false/updateto status= 2&&set currentOutput Completed/siblingsCompleted = true/current parentstatus= 2'); //shouldntseethis
						}else if(status == 0){	
							console.log('now status=0/hasKid=false = true/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
							currentOutput.innerHTML = "IN PROGRESS";
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
							parentstatus = 1;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus);
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/siblingsCompleted = true/current parentstatus= 1 change to parentstatus=2 and parentINNERHTML COMPLETED');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
							document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "COMPLETED";
							parentstatus = 2;
							parentOutput.removeAttribute('status');
							parentOutput.setAttribute('status', parentstatus);
							
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/siblingsCompleted = true/current parentstatus= 0');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsCompleted = true/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					} 
				}else if(siblingsDone == true){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/hasKid=false/updateto status= 2&&set currentOutput Completed/siblingsDone = true/current parentstatus= 2'); //shouldnt see this
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingDone = true/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');  //shouldnt see this
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/siblingsDone = true/current parentstatus= 1');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/hasKid=false/updateto status= 2&&Set currentOutput COMPLETED/siblingsDone = true/current parentstatus= 0');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsDone = true/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					} 
				}else if(siblingsCompleted == false && siblingsDone == false){
					if(parentstatus == 2){
						if(status == 1){
							console.log('now status= 1/hasKid=false/updateto status= 2&&set currentOutput Completed/siblingsComp&done == false/current parentstatus= 2'); //shouldntseethis
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE'); //shouldnt see this
						}
					}else if(parentstatus == 1){
						if(status == 1){
							console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/siblingsComp&done == false/current parentstatus= 1');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 1');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					}else if(parentstatus == 0){
						if(status == 1){
							console.log('now status=1/hasKid=false/updateto status= 2&&Set currentOutput COMPLETED/siblingsComp&done == false/current parentstatus= 0');
							currentOutput.innerHTML = "COMPLETED";
							status = 2;
							currentOutput.removeAttribute('status');
							currentOutput.setAttribute('status', status);
						}else if(status == 0){
							console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/siblingsComp&done == false/current parentstatus= 0');
							currentOutput.innerHTML = "IN PROGRESS";
						}
					} 
				}
			}else if(hasSibling == false){
				if(parentstatus == 2){
					if(status == 1){
						console.log('now status= 1/hasKid=false/updateto status= 2&&set currentOutput Completed/nosibs/current parentstatus= 2'); //shouldseethis
					}else if(status == 0){
						console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/nosibs/current parentstatus= 2 change to parentstatus= 1 and parentinnerHTML to DONE');
						currentOutput.innerHTML = "IN PROGRESS";
						document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "DONE";
						parentstatus = 1;
						parentOutput.removeAttribute('status');
						parentOutput.setAttribute('status', parentstatus);
					}
				}else if(parentstatus == 1){
					if(status == 1){
						console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/nosibs /current parentstatus= 1 change to parentstatus=2 and parentINNERHTML COMPLETED');
						currentOutput.innerHTML = "COMPLETED";
						status = 2;
						currentOutput.removeAttribute('status');
						currentOutput.setAttribute('status', status);
						document.getElementsByClassName('status' + parenttaskid)[0].innerHTML = "COMPLETED";
						parentstatus = 2;
						parentOutput.removeAttribute('status');
						parentOutput.setAttribute('status', parentstatus);
					}else if(status == 0){
						console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/nosibs/current parentstatus= 1');
						currentOutput.innerHTML = "IN PROGRESS";
					}
				}else if(parentstatus == 0){
					if(status == 1){
						console.log('now status=1/hasKid=false/update status= 2&&Set currentOutput COMPLETED/nosibs/current parentstatus= 0');
						currentOutput.innerHTML = "COMPLETED";
						status = 2;
						currentOutput.removeAttribute('status');
						currentOutput.setAttribute('status', status);
					}else if(status == 0){
						console.log('now status=0/hasKid=false/Set currentOutput INPROGRESS/no sibs/current parentstatus= 0');
						currentOutput.innerHTML = "IN PROGRESS";
					}
				}
			}
		}
	}else if(hasParent == false){
		if(hasKid == true){																	 
			if(kidsCompleted == true){																										
				if(status == 1){
					console.log('now status= 1/kidsCompleted = true/updateto status= 2&&set currentOutput Completed');
					currentOutput.innerHTML = "COMPLETED";
					status = 2;
					currentOutput.removeAttribute('status');
					currentOutput.setAttribute('status', status);
				}else if(status == 0){
					console.log('now status= 0/kidsCompleted = true/Set currentOutput INPROGRESS');	
					currentOutput.innerHTML = "IN PROGRESS";
				}
			}else if(kidsDone == true){
				if(status == 1){
					console.log('now status= 1/kidsDone = true/set currentOutput DONE');
					currentOutput.innerHTML = "DONE";
				}else if(status == 0){
					console.log('now status= 0/kidsDone = true/Set currentOutput INPROGRESS');
					currentOutput.innerHTML = "IN PROGRESS";					
				}
			}else if(kidsCompleted == false && kidsDone == false){
				if(status == 1){
						console.log('now status= 1/kidsCompleted&&kidsDone==false/Set currentOutput DONE');	
						currentOutput.innerHTML = "DONE";
				}else if(status == 0){
						console.log('now status= 0/kidsCompleted&&kidsDone==false/Set currentOutput INPROGRESS');	
						currentOutput.innerHTML = "IN PROGRESS";							
				}
			}
		}else if(hasKid == false){
			if(status == 1){
				console.log('now status= 1/nokids/updateto status= 2&&set currentOutput Completed');
				currentOutput.innerHTML = "COMPLETED";
				status = 2;
				currentOutput.removeAttribute('status');
				currentOutput.setAttribute('status', status);
			}else if(status == 0){
				console.log('now status= 1/nokids/set currentOutput INPROGRESS');		
				currentOutput.innerHTML = "IN PROGRESS";				
			}
		}
	}
		
	//sending data to php script
	params = 'status=' + status + '&taskid=' + taskid + '&parentid=' + parentid + '&parentstatus=' + parentstatus + '&keys=' + keys;

	request = new ajaxRequest()
	request.open("POST","streamlinetestAJAXfunction.php",true)
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	
	request.onreadystatechange = function()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            if (this.responseText != null)
            {
					document.getElementById('dependenciess').innerHTML = this.responseText
				/*	var boxes = document.getElementsByName('tick');
					
					for(var i = 0; i < boxes.length; i++){
						if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
							boxes[i].checked = false;
						}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
							boxes[i].checked = true;
						}
					} */
            }
            else alert("Ajax error: No data received")
          }
          else alert( "Ajax error: " + this.statusText)
        }
      }
	  request.send(params);
	  
	  
	  
	  params = 'check=1';
	  
	  request = new ajaxRequest()
	request.open("POST","streamlinetestAJAXfunction.php",true)
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	
	request.onreadystatechange = function()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            if (this.responseText != null)
            {
					document.getElementById('taskparents').innerHTML = this.responseText
				/*	var boxes = document.getElementsByName('tick');
					
					for(var i = 0; i < boxes.length; i++){
						if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
							boxes[i].checked = false;
						}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
							boxes[i].checked = true;
						}
					} */
            }
            else alert("Ajax error: No data received")
          }
          else alert( "Ajax error: " + this.statusText)
        }
      }
	  request.send(params);
	  
	  
	    params = 'maintable=1';
	  
	  request = new ajaxRequest()
	request.open("POST","streamlinetestAJAXfunction.php",true)
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	
	request.onreadystatechange = function()
      {
        if (this.readyState == 4)
        {
          if (this.status == 200)
          {
            if (this.responseText != null)
            {
					document.getElementById('table').innerHTML = this.responseText
				var boxes = document.getElementsByName('tick');
					
					for(var i = 0; i < boxes.length; i++){
						if(boxes[i].getAttribute('status') == 'IN PROGRESS'){
							boxes[i].checked = false;
						}else if(boxes[i].getAttribute('status') == 'COMPLETED' || boxes[i].getAttribute('status') == 'DONE'){
							boxes[i].checked = true;
						}
					} 
            }
            else alert("Ajax error: No data received")
          }
          else alert( "Ajax error: " + this.statusText)
        }
      }
	  request.send(params);
}

function addTask(){
	$('.upload').slideDown();
}

function closeMe(){
	$('.upload').slideUp();
}

function EditTask(){
	if($('.pen').css('display') == 'none'){
		$('.pen').css('display','inline-block');
	} else if($('.pen').css('display') == 'inline-block'){
		$('.pen').css('display','none');
	}
}

function copycloseMe(){
	$('.copyupload').css('display','none');
}

function closeTitle(){
	$('.edittitle').css('display','none');
}

function editTitle(){
	$('.edittitle').css('display','block');
}

function closeTitle(){
	$('.edittitle').css('display','none');
}
function editParent(){
	$('.copyupload').css('display','block');
}

function showList(){
		if($('#tables').is(':visible')){
			$('#tables').slideUp();
			$('#show').html('&plus;');
		}else {
		$('#tables').slideDown();
		$('#show').html('&minus;');
		}
}

function highlightme(id){
	console.log(id);
	var o = document.getElementById('highlight' + id);
	o.style.backgroundColor = 'red';
	
}

function mobilemenu(){
	$('#mobile').animate({width: 'toggle'});
	if($('.header').css('right') == '150px'){
		$('.header').animate({right: '0px'});
		$('#content').animate({right: '0px'});
	}else{
	$('.header').animate({right: '150px'});
	$('#content').animate({right: '150px'});
	}
	window.onresize = function(){
		if(document.body.clientWidth > 1138){
		$('#mobile').css('display','none');
		$('.header').animate({right: '0px'});
		$('#content').animate({right: '0px'})
		}
	}
}






















