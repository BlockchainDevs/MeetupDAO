
function newProposalInEther(){

      var beneficiary=document.getElementById("beneficiary").value;
      var etherAmount=document.getElementById("etherAmount").value;
      var jobDescription=document.getElementById("jobDescription").value;
      var transactionBytecode=document.getElementById("transactionBytecode").value;

      var myTokenContract = web3.eth.contract(abi).at(address);
      return myTokenContract.newProposalInEther(beneficiary, etherAmount, jobDescription, transactionBytecode, function (error, result) {})

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
      var supportsProposal = 1;
    else if(no==true)
      var supportsProposal = -1;
    
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

		var a1 = '<div class="proposalCard";><font face="Arial"><p>';
		var recipient = result[0];
		var a2 = '</p><button style="float: right;" onclick="executeProposal(';

		var a21 = ')">EXECUTE</button><h3>';
		var message = result[2];
		
		var voteButton1 = '</h3><form><div><font size="5"><b>Vote</b></font><br> Support Proposal &emsp;&emsp;&emsp; Justification Text<br><input type="radio" name="supportsProposal" id="supportsProposal_';

		var voteButton2 = '_yes">Yes<input type="radio" name="supportsProposal" id="supportsProposal_';

		var voteButton3 = '_no">No&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<input type="text" name="justificationText" id="justificationText_';

		var voteButton4 = '" placeholder="MyString">&emsp;&emsp;&emsp;&emsp;<button onclick="vote(';

		var voteButton5 = ')">VOTE</button></div></form>';

		var a3 = '<br><p><b>Proposal No.:</b> ';
		
		var a4 = '</p><p align="right"><b>Votes</b>&nbsp&nbsp: Total Votes: ';
		var totalVotes = result[6].c[0];
		var a5 = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCurrent Status: ';
		var currentStatus = result[7].c[0];
		var a6 = '</p></font></div><BR>';

		var input = a1+recipient+a2+proposalNumber+a21+message+voteButton1+proposalNumber+voteButton2+proposalNumber+voteButton3+proposalNumber+voteButton4+proposalNumber+voteButton5+a3+proposalNumber+a4+totalVotes+a5+currentStatus+a6;
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