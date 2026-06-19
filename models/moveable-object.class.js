class MoveableObject {
    x = 120;
    y = 400;
    img;
    height = 150;
    width = 250;


    loadImage(path){
        this.img = new Image (); 
        this.img.src = path;
    }

     moveRight(){
        console.log('Moving right');
    }
    moveLeft(){

    }
}