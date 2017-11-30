window.onload = function(){
    var userCount = ListOfUsers.length;
    var ansSheet1 = [];
    var ansSheet2 = [];
    var ansSheet3 = [];
    for(i = 0; i < ListOfUsers.length; i++){
        ansSheet1.push(ListOfUsers[i].answers[0]);
        ansSheet2.push(ListOfUsers[i].answers[1]);
        ansSheet3.push(ListOfUsers[i].answers[2]);
    }

    function tallyUp(choice, array){
        var t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0;
        var tallied = {};
        for(i = 0; i < array.length; i++){
            if(array[i] === "BSCS" || array[i] === "Eastern U.S." || array[i] === "2017"){
                t1 += 1;
                tallied[array[i]] = t1;
            }else{
                if(choice === 1) tallied["BSCS"] = t1;
                if(choice === 2) tallied["Eastern U.S."] = t1;
                if(choice === 3) tallied["2017"] = t1;
            }
            if(array[i] === "BSGD" || array[i] === "Western U.S." || array[i] === "2018"){
                t2 += 1;
                tallied[array[i]] = t2;
            }else{
                if(choice === 1) tallied["BSGD"] = t2;
                if(choice === 2) tallied["Western U.S."] = t2;
                if(choice === 3) tallied["2018"] = t2;
            }
            if(array[i] === "BSWD"  || array[i] === "Northern U.S." || array[i] === "2019"){
                t3 += 1;
                tallied[array[i]] = t3;
            }else{
                if(choice === 1) tallied["BSWD"] = t3;
                if(choice === 2) tallied["Northern U.S."] = t3;
                if(choice === 3) tallied["2019"] = t3;
            }
            if(array[i] === "BSIS" || array[i] === "Southern U.S." || array[i] === "2020 or greater"){
                t4 += 1;
                tallied[array[i]] = t4;
            }else{
                if(choice === 1) tallied["BSIS"] = t4;
                if(choice === 2) tallied["Southern U.S."] = t4;
                if(choice === 3) tallied["2020 or greater"] = t4;
            }
            if(array[i] === "BSTM" || array[i] === "Outside U.S." || array[i] === "Already graduated"){
                t5 += 1;
                tallied[array[i]] = t5;
            }else{
                if(choice === 1) tallied["BSTM"] = t5;
                if(choice === 2) tallied["Outside U.S."] = t5;
                if(choice === 3) tallied["Already graduated"] = t5;
            }
        }
        return tallied;
    }
    drawChart("chart0", "Which degree are you interested in?", tallyUp(1, ansSheet1), ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);
    drawChart("chart1", "Which region of the U.S. are you from?", tallyUp(2, ansSheet2), ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);
    drawChart("chart2", "What is your expected graduation year?", tallyUp(3, ansSheet3), ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);

    function drawChart(chart, name, scores, colors){
        var canvas = document.getElementById(chart);
        var ctx = canvas.getContext('2d');
        
        var width = 75;
        var curX = 50;
        var barIndex = 0;
        var minusHeight = 30;
        var tallies = [];
        var multiplier = 0;
        //tally count for each answer
        for(tally in scores){
            tallies.push(scores[tally]);
        }
        multiplier = 100/userCount;

        //check total percent !> 100
        var totalpercentage = 0;
        for(i = 0; i < tallies.length; i++){
            totalpercentage += tallies[i]*multiplier;
        }

        //draw bars
        for(i = 0; i < tallies.length; i++){
            var height = tallies[i]*multiplier;
            var percent = height.toFixed(1)+"%";
            ctx.fillStyle = colors[barIndex%colors.length];
            ctx.fillRect(curX, (canvas.height - height)-minusHeight, width, height);
            ctx.textBaseline="bottom";
            ctx.textAlign="left";
            ctx.font = "bold 24px Nunito";
            ctx.fillText(percent, curX, (canvas.height - height)-minusHeight);
            curX += width + 20;
            barIndex++;
        }
        
        //draw name
        ctx.save();
        ctx.textBaseline="bottom";
        ctx.textAlign="left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Nunito";
        ctx.fillText(name, 50, canvas.height);
        ctx.restore();

        //draw legend
        barIndex = 0;
        var legend = document.querySelector("legend[for='"+chart+"']");
        var ul = document.createElement("ul");
        legend.append(ul);
        for (categ in scores){
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+colors[barIndex%colors.length];
            li.style.padding = "5px";
            li.style.font = "bold 20px Nunito";
            li.style.color = "white";
            li.style.marginLeft = "5%";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
    }
}