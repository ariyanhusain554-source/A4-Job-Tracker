let interviewList = [];
let rejectedList = [];




let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");


const allBtn = document.getElementById("allBtn");
const interviewBtn = document.getElementById("interviewBtn");
const rejectedBtn = document.getElementById("rejectedBtn");


const allCards = document.getElementById("allCards");
const noJobsSection = document.getElementById("noJobsSection");



function calculateCounts() {
    totalCount.innerText =  allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}


function toggleStyle(id) {
    if (id === allBtn) {
        noJobsSection.classList.add("hidden");
        allCards.classList.remove("hidden");
     }
     calculateCounts();

     const selectedBtn = [allBtn, interviewBtn, rejectedBtn].find(btn => btn === id);
     selectedBtn.classList.add("bg-blue-500", "text-white");
        [allBtn, interviewBtn, rejectedBtn].forEach(btn => {    
            if (btn !== selectedBtn) {
                btn.classList.remove("bg-blue-500", "text-white");
            }
        });

    }
