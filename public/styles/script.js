window.onload = function(){
    drawChart("chart0", "Which degree are you interested in?", {
        "BSCS":10,
        "BSGD":30,
        "BSWD":50,
        "BSIS":70,
        "BSTM":90,
    }, ["#ffff00","#ffeb00", "#ffcf00","#ffbf00", "#ffa500"]);
    drawChart("chart1", "Which region of the United States do you come from?", {
        "Eastern U.S.":10,
        "Western U.S.":30,
        "Northern U.S.":50,
        "Southern U.S.":200,
        "Country outside of the U.S.":90,
    }, ["#ffff00","#ffeb00", "#ffcf00","#ffbf00", "#ffa500"]);
    drawChart("chart2", "What is your expected graduation year?", {
        "2018":10,
        "2019":30,
        "2020":50,
        "2021":70,
        "Already graduated":90,
    }, ["#ffff00","#ffeb00", "#ffcf00","#ffbf00", "#ffa500"]);

    function drawChart(chart, name, scores, colors){
        var canvas = document.getElementById(chart);
        var ctx = canvas.getContext('2d');
        
        var width = 50;
        var curX = 50;
        var i = 0;
        var barIndex = 0;
        //draw bars
        for(categ in scores){
            var height = scores[categ];
            ctx.fillStyle = colors[barIndex%colors.length];
            ctx.fillRect(curX, canvas.height - height, width, height);
            curX += width + 20;
            i++; barIndex++;
        }
        
        //draw name
        ctx.save();
        ctx.textBaseline="bottom";
        ctx.textAlign="left";
        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px Arial";
        ctx.fillText(name, 50, canvas.height/2);
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
            li.style.marginLeft = "5%";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
    }
}