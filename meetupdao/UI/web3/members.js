
function getName(){
	var myTokenContract = web3.eth.contract(abi).at(address);

	var input;
	var total_members;
	myTokenContract.totalMembers(function(error,result){
	total_members = result.c[0];
	
	for(var i = 1; i < total_members; i++){ 
		myTokenContract.members(i, function(error,result){
		
			//CONVERTING UNIX Time To Indian Standard Time 				
	 		var unixtimestamp = result[2]['c']; // Unixtimestamp
	 		var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];// Months array
	 		var date = new Date(unixtimestamp*1000);// Convert timestamp to milliseconds
	 		var year = date.getFullYear(); // Year
	 		var month = months_arr[date.getMonth()];// Month
	 		var day = date.getDate();// Day
	 		var hours = date.getHours(); // Hours
	 		var minutes = "0" + date.getMinutes();// Minutes
	 		//var seconds = "0" + date.getSeconds();// Seconds
	
	 		if(hours>11){
	 			var maredian = "pm";
	 		}
	 		else{
	 			var maredian = "am";
	 		}
	
			if(hours>12){
				hours -= 12;
			}
	
			var timeToDisplay = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + maredian;
			var a1 = '<div class="card"><font face="Arial"><h2>';
			var name = result[1];
			var a3 = '</h2><p><b>Member Since:</b> ';
			var a4 = '</p></font></div>';
					
			input = a1+name+a3+timeToDisplay+a4;
							
			var mydiv = document.getElementById("parent");
	    	var newDiv = document.createElement('div');
	    	newDiv.innerHTML = input;
	        
    	    while (newDiv.firstChild) {
        		mydiv.appendChild(newDiv.firstChild);
        	}
		})
	}
	})
	
}

getName();