
	function previewHash(hash){
        var dialog = document.getElementById('window');
        dialog.show();
        document.getElementById('exit').onclick = function() {  
         dialog.close();  
        };



        var preview = document.querySelector('img');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
                preview.src = xhttp.responseText;
            }
        };
        xhttp.open("GET", "http://swarm-gateways.net/bzz:/" + hash, true);
        xhttp.send();

    }

    function uploadToSwarm() {
      var fileHash;
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      if(file==undefined){
        fileHash = "";
            console.log(fileHash);
            newProposalInEther(fileHash);
      }
      else{
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
          //preview.src = reader.result;
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://swarm-gateways.net/bzz:/", true);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(reader.result);
          xhr.onload = function() {
            hash = this.responseText;
            console.log(hash);
            fileHash = String(hash);
            newProposalInEther(fileHash);
          }
        
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    }


function newProposalInEther(newFileHash){

      var beneficiary=document.getElementById("beneficiary").value;
      var etherAmount=document.getElementById("etherAmount").value;
      var jobDescription=document.getElementById("jobDescription").value;
      var transactionBytecode=document.getElementById("transactionBytecode").value;

      var myTokenContract = web3.eth.contract(abi).at(address);
      return myTokenContract.newProposalInEther(beneficiary, etherAmount, jobDescription, newFileHash, transactionBytecode, function (error, result) {})

    }


function executeProposal(proposalNumberValue){
	
	//	console.log("function successfully loladed");
   // var proposalNumber=document.getElementById("proposalNumber").value;
    var proposalNumber = proposalNumberValue;
    var transactionBytecode=document.getElementById("transactionBytecode").value;

    var myTokenContract = web3.eth.contract(abi).at(address);
    return myTokenContract.executeProposal(proposalNumber, transactionBytecode, function (error, result) {}) 

  }


  function vote(proposalNumberValue){

    var proposalNumber = proposalNumberValue;
    var idYes = "supportsProposal_" + proposalNumber + "_yes";
    var idNo  = "supportsProposal_" + proposalNumber + "_no";
    var idJustificationText = "justificationText_" + proposalNumber;
    var yes=document.getElementById(idYes).checked;
    var no= document.getElementById(idNo).checked;
    if(yes==true)
      var supportsProposal = true;
    else if(no==true)
      var supportsProposal = false;
    
    var justificationText=document.getElementById(idJustificationText).value;

    var myTokenContract = web3.eth.contract(abi).at(address);
    return myTokenContract.vote(proposalNumber, supportsProposal, justificationText, function (error, result) {})    
  }


function getProposals(){
	var myTokenContract = web3.eth.contract(abi).at(address);

	myTokenContract.totalProposals(function(error,result){
	var totalProposals = result.c[0];
	for(var i = 0; i < totalProposals; i++){
		const proposalNumber = i;
	 	myTokenContract.proposals(i, function(error,result){
		//console.log(result);

		var a1 = '<div class="proposalCard";><font face="Arial"><b><u>Benificiary Address</u> : </b>';
		var recipient = result[0];
    //##############################################################################
    //execute proposal button
		// var a2 = '</p><button style="float: right;" onclick="executeProposal(';
		// var a21 = ')">EXECUTE</button><h3>';
		//##############################################################################
    //##############################################################################
    var a2 = '</p>';
    var a21 = '<h3>';
    //###########################################################################
    var message = result[2];
    // var imageFromHash = '<img src="" width="200">';
    
		
		var voteButton1 = '</h3><form><div><font size="5"><b>Vote</b></font><br> Support Proposal &emsp;&emsp;&emsp; Justification for Your Response<br><input type="radio" name="supportsProposal" id="supportsProposal_';

		var voteButton2 = '_yes">Yes<input type="radio" name="supportsProposal" id="supportsProposal_';

		var voteButton3 = '_no">No&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<input type="text" name="justificationText" id="justificationText_';

		var voteButton4 = '" placeholder="MyString">&emsp;&emsp;&emsp;&emsp;<button onclick="vote(';

		var voteButton5 = ')">VOTE</button></div></form>';

		var a3 = '<p><b>Proposal No.:</b> ';
		
		var a4 = '<span style="float:right;"><b>Votes</b>&nbsp&nbsp: Total Votes: ';
		var totalVotes = result[7].c[0];
		var a5 = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCurrent Status: ';
    //var currentStatus = result[8].c[0] * result[8].s;
    var hash = result[3];
    var preview_but = ''
    if (result[3]){;
      preview_but = '<button id="myBtn" style="float: right;" onclick=previewHash("'+hash+'")>View uploaded file</button>';
    }

    var currentStatus = result[8].c[0];
		var a6 = '</span></p></font></div><BR>';

    if (result[8].s < 0) {
        currentStatus = (-1 * currentStatus);
    }

    //execute button
    //var input = a1+recipient+a2+proposalNumber+a21+message+preview_but+voteButton1+proposalNumber+voteButton2+proposalNumber+voteButton3+proposalNumber+voteButton4+proposalNumber+voteButton5+a3+proposalNumber+a4+totalVotes+a5+currentStatus+a6;
    
    var input = a1+recipient+a2+preview_but+a21+message+voteButton1+proposalNumber+voteButton2+proposalNumber+voteButton3+proposalNumber+voteButton4+proposalNumber+voteButton5+a3+proposalNumber+a4+totalVotes+a5+currentStatus+a6;
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

getProposals();
