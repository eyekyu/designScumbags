function textBox(){
    if (game.time.now > t && index < content.length){
        box.visible = true;
        if (line.length < content[index].length){
            line = content[index].substr(0, line.length + 1);
            s.setText(line);
            t = game.time.now + 40;
        }else{
            t = game.time.now + 1000;
            if (index < content.length){
                next=false;
                index++;
                line = '';
            }
        }
    }else if(index==content.length){
        s.setText('');
        next=false;
        box.visible = false;
        bg.inputEnabled = true;
    }
}