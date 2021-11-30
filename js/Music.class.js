class Music{
    constructor(id, matricule, image, urlpreview, urlitune, singername, musicname){
        this.id = id;
        this.matricule = matricule;
        this.image = image;
        this.urlpreview = urlpreview;
        console.log(this.urlpreview)
        this.urlitune = urlitune;
        this.singername = singername;
        this.musicname = musicname;
    }

    getId(){return this.id}
    getMatricule(){return this.matricule}
    getImage(){return this.image}
    getUrlpreview(){return this.urlpreview}
    getUrlitune(){return this.getUrlitune}
    getSingername(){return this.singername}
    getMusicname(){return this.musicname}

    getSingerInfo(){
        //Get information from itune API about this music's singer and return it into html bloc
    }

    getMusic(){
        //search this song from another things(vidmate is an good edea, telegram's bot too) and download it
    }

}