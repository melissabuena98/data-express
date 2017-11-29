window.onload = function(){
    drawChart("chart0", "Which degree are you interested in?", {
        "BSCS":1,
        "BSGD":1,
        "BSWD":2,
        "BSIS":1,
        "BSTM":1,
    }, ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);
    drawChart("chart1", "Which region of the United States do you come from?", {
        "Eastern U.S.":10,
        "Western U.S.":30,
        "Northern U.S.":50,
        "Southern U.S.":200,
        "Country outside of the U.S.":90,
    }, ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);
    drawChart("chart2", "What is your expected graduation year?", {
        "2018":10,
        "2019":30,
        "2020":50,
        "2021":70,
        "Already graduated":90,
    }, ["#ffff00","#ff0000", "#00ff00","#00ffff", "#aa1aab"]);

    function drawChart(chart, name, scores, colors){
        var canvas = document.getElementById(chart);
        var ctx = canvas.getContext('2d');
        
        var width = 50;
        var curX = 50;
        var barIndex = 0;
        var minusHeight = 30;
        var ans1, ans2, ans3, ans4, ans5;
        var tallies = [];
        var userCount = 0;
        var multiplier = 0;
        //tally count for each answer
        for(tally in scores){
            tallies.push(scores[tally]);
            userCount += scores[tally];
        }
        multiplier = 100/userCount;
        console.log("Users: "+userCount);
        console.log("Multiplier: "+multiplier);
        console.log("Tallies: "+tallies.length);

        //check total percent !> 100
        var totalpercentage = 0;
        for(i = 0; i < tallies.length; i++){
            totalpercentage += tallies[i]*multiplier;
        }
        console.log(totalpercentage);

        //draw bars
        for(i = 0; i < tallies.length; i++){
            var height = Math.round((tallies[i]*multiplier));
            var percent = height.toFixed(0)+"%";
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
        ctx.fillStyle = "#000000";
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
            li.style.font = "bold 14px Nunito";
            li.style.marginLeft = "5%";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
    }
}