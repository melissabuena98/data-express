window.onload = function(){
    var canvas = document.getElementById('demo');
    var ctx = canvas.getContext('2d');
    
    var scores = [100, 90, 80, 60, 40, 20];
    var width = 50;
    var curX = 50;
    var base = 200;
    
    for(i = 0; i < scores.length; i++){
        var height = scores[i];
        ctx.fillStyle = "rgb(20,"+(i*120)+",240)";
        ctx.fillRect(curX, canvas.height - height, width, height);
        curX += width + 10;
        
    }

}