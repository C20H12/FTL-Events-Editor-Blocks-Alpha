document.querySelector("#render").addEventListener("click", render);

function copy(){
  var copyText = document.getElementById("outputArea2").value;
   copyText.select();
   copyText.setSelectionRange(0, 99999);
  // navigator.clipboard.writeText(copyText).then(()=>console.log('a'))
   document.execCommand("copy");
}


function findTags(taglist, tagname) {
  //return Array.prototype.filter.call(taglist, tagName => tagName.nodeName === tagname);
  const arr = Array.from(taglist);
  const filteredArr = arr.filter( x => x.nodeName === tagname);
  return filteredArr;
}

function randint(min, max) {
  if (min<0 && max<0){
    let absMin = Math.abs(min);
    let absMax = Math.abs(max);
    return '-' + Math.round(Math.random() * (absMax-absMin)+absMin);
  }else{
    return Math.round(Math.random() * (max - min) + min);
  }
}

function render(){
  const rawXML = document.getElementById('eventEmuInput').value;
  const parser = new DOMParser();
  const eventRoot = parser.parseFromString(rawXML, "text/xml");
  const root = eventRoot.documentElement;
  let tagList = root.childNodes;

  let choiceTag;
  let textTag;
  let boardersTag;
  let autoRewardTag;
  let itemModifyTag;

  function eventIteration(){
    //base case return
    if(tagList.length==0) return document.querySelector(".main_event").innerHTML = '/// END OF EVENT ///';
    //find the tags
    choiceTag = findTags(tagList, "choice");
    textTag = findTags(tagList, "text");
    boardersTag = findTags(tagList, "boarders");
    autoRewardTag = findTags(tagList, "autoReward");
    itemModifyTag = findTags(tagList, "item_modify");
    
    //the event text is found first
    let output = `<span class="text">${textTag[0].textContent}<span><br/>`;
    let msgBox = '';
    let list = "";

    const scrapPlus = '<img src="./img/scrap_plus.png"/>';
    const fuelPlus = '<img src="./img/fuel_plus.png"/>';
    const missilesPlus = '<img src="./img/missile_plus.png"/>';
    const dronesPlus = '<img src="./img/drone_plus.png"/>';
    
    const scrapMinus = '<img src="./img/scrap_minus.png"/>';
    const fuelMinus = '<img src="./img/fuel_minus.png"/>';
    const missilesMinus = '<img src="./img/missile_minus.png"/>';
    const dronesMinus = '<img src="./img/drone_minus.png"/>';
    const rewardLevels = {
      high: {
        s: Math.round(randint(1300, 1550)/1000*21), //S1 scrap lvl
        f: randint(3,6), 
        m: randint(4,8), 
        d: randint(1,2),
      },
      med: {
        s: Math.round(randint(800, 1300)/1000*21),
        f: randint(2,4),
        m: randint(2,4),
        d: 1,
      },
      low: {
        s: Math.round(randint(500, 700)/1000*21),
        f: randint(1,2),
        m: randint(1,2),
        d: 1,
      },
      random: {
        s: Math.round(randint(500, 1550)/1000*21), 
        f: randint(1,6), 
        m: randint(1,8), 
        d: randint(1,2),
      }
    };

    //check various tags for their existence, if exist then add the msg box
    if (autoRewardTag.length > 0){
      showAutoRewards(autoRewardTag, rewardLevels);
    }

    
    
    function showAutoRewards(currentAutoRewardTag, lvl){
      let level = currentAutoRewardTag[0].getAttribute("level");
      let type = currentAutoRewardTag[0].textContent;
      
      msgBox += `<span class="autoreward">`;
      function lvlCheck() {
        if (level == "HIGH"){
          return lvl.high;
        }else if(level == "MED"){
          return lvl.med;
        }else if (level == "LOW"){
          return lvl.low;
        }else if (level == "RANDOM"){
          return lvl.random;
        }
      }
                    
      let bonus = '';
      
      function bonusItemRoll(chance) {
        if (chance){
          let itemroll = randint(1,3);
          if (itemroll==1){
            bonus = `<img src="./img/weapon_placehold.png"/> Weapon Mk. 1`; 
          }else if (itemroll==2){
            bonus = `<img src="./img/drone_placehold.png"/> Drone Mk. 1`;
          }else if (itemroll==3){
            bonus = `&nbsp <b>Augment:</b>&nbsp Default Name`
          }  
        };
      }
      
      function maxResourceHandle(lowScrap) {
        let maxResource = randint(1,3);
        let scrapAmount = lowScrap ? lvl.low.s : lvlCheck().s
        if (maxResource == 1){
          msgBox += `${scrapPlus + scrapAmount + fuelPlus + lvlCheck().f + missilesPlus + lvlCheck().m + bonus}</span>`;
        }else if (maxResource == 2){
          msgBox += `${scrapPlus + scrapAmount + fuelPlus + lvlCheck().f + dronesPlus + lvlCheck().d + bonus}</span>`;
        }else if (maxResource == 3){
          msgBox += `${scrapPlus + scrapAmount + missilesPlus + lvlCheck().m + dronesPlus + lvlCheck().d + bonus}</span>`;
        };
      }      
        switch (type){
          case "standard":
            bonusItemRoll(randint(1,3)==3);
            maxResourceHandle();
            break;
          case "stuff":
            let random60 = randint(1,5);
            bonusItemRoll(random60 == 3 || random60 == 4 || random60 == 5);
            maxResourceHandle(true);
            break;
          case "fuel":
            msgBox += `${scrapPlus + lvlCheck().s + fuelPlus + lvlCheck().f}</span>`;
            break;
          case "missiles":
            msgBox += `${scrapPlus + lvlCheck().s + missilesPlus + lvlCheck().m}</span>`;
            break;
          case "droneparts":
            msgBox += `${scrapPlus + lvlCheck().s + dronesPlus + lvlCheck().d}</span>`;  
            break;
          case "scrap_only":
            msgBox += `${scrapPlus + lvlCheck().s}</span>`;  
            break;
          case "fuel_only":
            msgBox += `${fuelPlus + lvlCheck().f}</span>`;  
            break;
          case "missiles_only":
            msgBox += `${missilesPlus + lvlCheck().m}</span>`;
            break;
          case "droneparts_only":
            msgBox += `${dronesPlus + lvlCheck().d}</span>`;
            break;
          case "item":
            bonusItemRoll(true);
            maxResourceHandle();
            break;
          case "weapon":
            msgBox += `${scrapPlus + lvlCheck().s}<img src="./img/weapon_placehold.png"/> Weapon Mk. 1</span>`;
            break;
          case "drone":
            msgBox += `${scrapPlus + lvlCheck().s}<img src="./img/drone_placehold.png"/> Drone Mk. 1</span>`;
            break;
          case "augment":
            msgBox += `${scrapPlus + lvlCheck().s}<b>&nbsp Augment:</b>&nbspDefault Name</span>`;
            break;
        }
    };

    function showItemMod(currItemModTag){
      const itemTags = findTags(currItemModTag[0].childNodes, "item");
      function itemCheck(ftype, fmin, fmax){
        if (fmin < 0 || fmax < 0){
          if (ftype == "scrap"){
            return scrapMinus;
          }else if (ftype == 'fuel'){
            return fuelMinus;
          }else if (ftype == 'missiles'){
            return missilesMinus;
          }else if (ftype == 'drones'){
            return dronesMinus;
          };
        }else{
          if (ftype == "scrap"){
            return scrapPlus;
          }else if (ftype == 'fuel'){
            return fuelPlus;
          }else if (ftype == 'missiles'){
            return missilesPlus;
          }else if (ftype == 'drones'){
            return dronesPlus;
          };         
        };
      };
      for (let i in itemTags){
        let currItem = itemTags[i];
        let type = currItem.getAttribute('type');
        let min = currItem.getAttribute('min');
        let max = currItem.getAttribute('max');
        msgBox += itemCheck(type, min, max) + randint(min, max);
      }
    }
    if (itemModifyTag.length > 0){
      showItemMod(itemModifyTag);
    }
    
    if (boardersTag.length > 0){
      let min = boardersTag[0].getAttribute("min")
      let max = boardersTag[0].getAttribute("max")
      msgBox += `<span class="board">Intruders on board (${randint(min, max)} of ${boardersTag[0].getAttribute("class")})</span>`
    }
    
    if(autoRewardTag.length>0||boardersTag.length>0||itemModifyTag.length>0){
        output += `<div class="message">${msgBox}</div><br/>`;
    }
    
    // if no choice then add continue
    if(choiceTag.length==0) list = '<li id="defaultChoice">Continue...</li>';
    
    //make the choice list
    let eclist = '';
    for (let i in choiceTag){
      let choiceText = findTags(choiceTag[i].childNodes, "text");
      let req = choiceTag[i].getAttribute("req");
      let lvl = choiceTag[i].getAttribute("lvl");
      let maxLvl = choiceTag[i].getAttribute("max_lvl");
      
      if (req){
        eclist += `<span>${req}</span><input type="number" id="${req}" min="0" value="0"/><br>`
      }
      if (!maxLvl) maxLvl = lvl;
      try{
        let ipValue = document.querySelector(`#${req}`).value;
        if (ipValue >= lvl && ipValue <= maxLvl){
          list += `<li id="ch${i}">${choiceText[0].textContent}</li>`;
        }else{
          list += `<li id="ch${i}" class="hidd">${choiceText[0].textContent}</li>`;
        }
      }catch(e){
        if (req && lvl > 0){
          list += `<li id="ch${i}" class="hidd">${choiceText[0].textContent}</li>`;
        }else{
          list += `<li id="ch${i}">${choiceText[0].textContent}</li>`;
        }
      }

      let hidden = choiceTag[i].getAttribute("hidden");

      if (hidden == 'false' || hidden==null){
        let choiceAutoRewardTag = findTags(findTags(choiceTag[i].childNodes, "event")[0].childNodes,"autoReward");
        let choiceItemModTag = findTags(findTags(choiceTag[i].childNodes,"event")[0],"item_modify")

        if (choiceAutoRewardTag.length > 0) showAutoRewards(choiceAutoRewardTag, rewardLevels);
        if (choiceItemModTag.length > 0) showItemMod(choiceItemModTag);
        list += `<div class="choiceMessage">resources not hidden</div><br/>`;
      }
    }    
    output += `<ol>${list}</ol>`;
    document.querySelector(".eclist").innerHTML = eclist;
    
    //render the output
    document.querySelector(".main_event").innerHTML = output;

    //if no choice (only the continue) then end, if not add a listener to each
    if (choiceTag.length==0){
      document.querySelector('#defaultChoice').addEventListener('click', ()=>{
        document.querySelector(".main_event").innerHTML = '/// END OF EVENT ///';
      });
    }else{
      for (let i in choiceTag){
        let hiddenChoice = document.querySelectorAll(".hidd")
        if(hiddenChoice) Array.from(hiddenChoice).forEach(x => x.style.visibility = "hidden");
        document.querySelector(`#ch${i}`).addEventListener('click', ()=> {
          tagList = findTags(choiceTag[i].childNodes, "event")[0].childNodes;
          eventIteration();
        })
      }
    }
  }
  
  eventIteration();

}
