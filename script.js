let interviewList = [];
let rejectedList = [];
let currentFilter = 'all';


let availableJobCount = document.getElementById("availableJobCount");

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");


const allFilterBtn = document.getElementById("allFilterBtn");
const interviewFilterBtn = document.getElementById("interviewFilterBtn");
const rejectedFilterBtn = document.getElementById("rejectedFilterBtn");


const allCards = document.getElementById("allCards");
const noJobsSection = document.getElementById("noJobsSection");
const mainContent = document.querySelector("main");
const filterSection = document.getElementById("filterSection");




function calculateCounts() {
    totalCount.innerText =  allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}


function toggleStyle(id) {
    if (id === allFilterBtn) {
        noJobsSection.classList.add("hidden");
        allCards.classList.remove("hidden");
     }
    

     const selectedBtn = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].find(btn => btn === id);
     selectedBtn.classList.add("bg-blue-500", "text-white");
        [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {    
            if (btn !== selectedBtn) {
                btn.classList.remove("bg-blue-500", "text-white");
            }
        });




        if (id === interviewFilterBtn) {
            allCards.classList.add("hidden");
             noJobsSection.classList.add("hidden");
             filterSection.classList.remove("hidden");
             renderInterviewList();
             availableJobCount.innerText = interviewList.length;
                if (interviewList.length === 0) {   
                noJobsSection.classList.remove("hidden");
                }
        } else if (id === rejectedFilterBtn) {
            allCards.classList.add("hidden");
            noJobsSection.classList.add("hidden");
            filterSection.classList.remove("hidden");
            renderRejectedList();
            availableJobCount.innerText = rejectedList.length;
            if (rejectedList.length === 0) {
                noJobsSection.classList.remove("hidden");
            }
        } else if (id === allFilterBtn) {
            currentFilter = id;
            noJobsSection.classList.add("hidden");
            filterSection.classList.add("hidden");
            allCards.classList.remove("hidden");
            if (allCards.children.length === 0) {
                noJobsSection.classList.remove("hidden");
            }
            availableJobCount.innerText = allCards.children.length;


           
        }

        calculateCounts();


}
       

// Event delegation for interview and rejected buttons
mainContent.addEventListener("click", function(event) {
    if (event.target.id === "interviewBtn") {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector(".companyName").innerText;
        const position = parentNode.querySelector(".position").innerText;
        const location = parentNode.querySelector(".location").innerText;
        const type = parentNode.querySelector(".type").innerText;
        const salary = parentNode.querySelector(".salary").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const description = parentNode.querySelector(".description").innerText;

        parentNode.querySelector(".status").innerText = 'Interviewed';

        const cardInfo = ({
            companyName,
            position,
            location,
            type,
            salary,
            status: 'Interviewed',
            description
        });



         const jobExists = interviewList.find(job => job.companyName === cardInfo.companyName && job.position === cardInfo.position);
         if (!jobExists) {
             interviewList.push(cardInfo);
            
         }

        
        // // Update UI
        // event.target.innerText = "Interviewed";
        // event.target.classList.remove("text-green-400", "border-green-500");
        // event.target.classList.add("text-gray-500", "border-gray-500");

        // Remove from rejected list if it exists
        rejectedList = rejectedList.filter(job => !(job.companyName === companyName && job.position === position));

         if (currentFilter === rejectedFilterBtn) {
            renderRejectedList();
        }
        calculateCounts();


    } else if (event.target.id === "rejectedBtn") {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector(".companyName").innerText;
        const position = parentNode.querySelector(".position").innerText;
        const location = parentNode.querySelector(".location").innerText;
        const type = parentNode.querySelector(".type").innerText;
        const salary = parentNode.querySelector(".salary").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const description = parentNode.querySelector(".description").innerText;


        parentNode.querySelector(".status").innerText = 'Rejected';

        const cardInfo = ({
            companyName,
            position,
            location,
            type,
            salary,
            status: 'Rejected',
            description
        });

    
        const jobExists = rejectedList.find(job => job.companyName === cardInfo.companyName && job.position === cardInfo.position);
        if (!jobExists) {
            rejectedList.push(cardInfo);
        }
        
      
         // Update UI
        //  event.target.innerText = "Rejected";
        //  event.target.classList.remove("text-red-500", "border-red-500");
        //  event.target.classList.add("text-gray-500", "border-gray-500");


        // Remove from interview list if it exists
        interviewList = interviewList.filter(job => !(job.companyName === companyName && job.position === position));
    

        if ( currentFilter === interviewFilterBtn) {
            renderInterviewList();
        } 
        calculateCounts();
    }
}); 



//step 3:

function renderInterviewList() {
    filterSection.innerHTML = "";

    for (const job of interviewList) {
        let div = document.createElement("div");
        div.className = 'flex justify-between bg-[#FFFFFF] px-5 py-5 rounded my-5'

        div.innerHTML = `   <div>
              <p class="companyName text-xl font-bold">${job.companyName}</p>
            <div class="text-gray-400">
                <p class="position">${job.position}</p>
                 <br>
                 <div >
                    <ul class="flex list-disc list-inside gap-3">
                        <li class="location list-none">${job.location}</li>
                        <li class="type">${job.type}</li>
                        <li class="salary">${job.salary}</li>
                    </ul>
                 </div>
                
            </div>
           
            <p class="status bg-gray-300 px-3 py-1 rounded w-max my-3">${job.status}</p>
          
            <p class="description">${job.description}</p>
            <div class="flex gap-3 my-5">
                <button id="interviewBtn" class="text-green-500 border border-green-500 px-2 py-1 rounded">INTERVIEW</button>
                <button id="rejectedBtn" class="text-red-500 border border-red-500 px-2 py-1 rounded">REJECTED</button>
            </div>
          </div>
          <i class="deleteBtn cursor-pointer fa-regular fa-trash-can"></i>
                     
              
        `
        filterSection.appendChild(div);     
    }
}

function renderRejectedList() {
    filterSection.innerHTML = "";
    for (const job of rejectedList) {
        let div = document.createElement("div");
        div.className = 'flex justify-between bg-[#FFFFFF] px-5 py-5 rounded my-5'
        div.innerHTML = `    <div>
              <p class="companyName text-xl font-bold">${job.companyName}</p>
            <div class="text-gray-400">
                <p class="position">${job.position}</p>
                 <br>
                 <div >
                    <ul class="flex list-disc list-inside gap-3">
                        <li class="location list-none">${job.location}</li>
                        <li class="type">${job.type}</li>
                        <li class="salary">${job.salary}</li>
                    </ul>
                 </div>
                
            </div>
            
            <p class="status bg-gray-300 px-3 py-1 rounded w-max my-3">${job.status}</p>
            
            <p class="description">${job.description}</p>
            <div class="flex gap-3 my-5">
                <button id="interviewBtn" class="text-green-500 border border-green-500 px-2 py-1 rounded">INTERVIEW</button>
                <button id="rejectedBtn" class="text-red-500 border border-red-500 px-2 py-1 rounded">REJECTED</button>
            </div>
          </div>
          <i class="deleteBtn cursor-pointer fa-regular fa-trash-can"></i>
        `
        filterSection.appendChild(div);     
    }   
    
}

const deleteBtn = document.querySelector(".deleteBtn");

document.addEventListener("click", function(e) {
    const target = e.target;
    if (target.classList.contains("deleteBtn")) {
       const card = target.closest(".jobCard")
       card.remove();
    }

    calculateCounts();
});